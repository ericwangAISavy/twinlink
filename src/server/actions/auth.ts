"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { ACCOUNT_SETUP_ERROR, authErrorMessage, destinationAfterLogin, toAppRole } from "@/lib/roles";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { registerSchema } from "@/lib/validations";
import { requireStaff } from "@/server/authorization";

export async function createAccount(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return fail("Authentication is not configured.");
  }

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    invite: formData.get("invite") || formData.get("inviteToken") || undefined,
  });

  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid registration details");
  }

  const email = parsed.data.email.toLowerCase();
  const supabase = await createServerSupabaseClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signUp({
    email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.name,
        ...(parsed.data.invite ? { invite_token: parsed.data.invite } : {}),
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return fail(authErrorMessage(error));
  }

  if (data.user && !data.session && (data.user.identities?.length ?? 0) > 0) {
    try {
      const admin = createAdminSupabaseClient();
      await admin.auth.admin.updateUserById(data.user.id, { email_confirm: true });
    } catch {
      return ok("Account created. Check your email to confirm, then sign in.");
    }
  }

  if (parsed.data.invite && data.user) {
    const invited = await createServerSupabaseClient();
    if (data.session) {
      await invited.rpc("accept_employee_invite", { invite_token: parsed.data.invite });
    }
  }

  return ok("Account created.");
}

async function findAuthUserByEmail(email: string) {
  const admin = createAdminSupabaseClient();
  const normalized = email.toLowerCase();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((user) => user.email?.toLowerCase() === normalized);
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

export async function confirmEmailAfterValidPassword(email: string, password: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return fail("Authentication is not configured.");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (!error) {
    return ok();
  }

  const unconfirmed =
    error.code === "email_not_confirmed" || /email not confirmed/i.test(error.message);
  if (!unconfirmed) {
    return fail(authErrorMessage(error));
  }

  try {
    const user = await findAuthUserByEmail(email);
    if (!user) {
      return fail("Unable to sign in.");
    }
    const admin = createAdminSupabaseClient();
    const { error: confirmError } = await admin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });
    if (confirmError) {
      return fail(confirmError.message);
    }
    return ok();
  } catch {
    return fail("Confirm your email before signing in. Check your inbox for the Twinlink link.");
  }
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  return createAccount(formData);
}

export async function signOutAction() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // Ignore missing-session errors so sign-out always completes.
    }
  }
  redirect("/login");
}

export async function changePasswordAction(
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  const { changePassword } = await import("@/server/actions/settings");
  if (!formData.get("newPassword") && formData.get("password")) {
    formData.set("newPassword", String(formData.get("password")));
  }
  const result = await changePassword(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function createEmployeeInviteLink(
  email: string,
  createdBy: string,
  extras?: { name?: string; jobTitle?: string; department?: string; role?: "employee" | "admin" },
) {
  const token = randomBytes(24).toString("hex");
  const supabase = await createServerSupabaseClient();
  const payload: Record<string, unknown> = {
    email: email.toLowerCase(),
    token,
    created_by: createdBy,
    expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };
  if (extras?.name) payload.full_name = extras.name;
  if (extras?.jobTitle) payload.job_title = extras.jobTitle;
  if (extras?.department) payload.department = extras.department;
  if (extras?.role) payload.role = extras.role === "admin" ? "admin" : "employee";

  const { error } = await supabase.from("employee_invites").insert(payload);
  if (error) {
    const fallback = await supabase.from("employee_invites").insert({
      email: email.toLowerCase(),
      token,
      created_by: createdBy,
      expires_at: payload.expires_at,
    });
    if (fallback.error) throw fallback.error;
  }
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}/register?invite=${token}`;
}

export async function resolveLoginDestination(callbackUrl?: string | null) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return fail("You are not signed in.");
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return fail(
        error.message.includes("schema cache") || error.code === "PGRST205"
          ? "The Twinlink database is not set up yet. Run the SQL migrations in Supabase."
          : error.message,
      );
    }

    const role = toAppRole(profile?.role);
    if (!role) {
      return fail(ACCOUNT_SETUP_ERROR);
    }

    return ok(destinationAfterLogin(role, callbackUrl));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign in.";
    return fail(message);
  }
}

export async function requireEmployeeForInvite() {
  return requireStaff();
}
