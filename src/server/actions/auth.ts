"use server";

import { randomBytes } from "crypto";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { registerSchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";

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
    return fail(error.message);
  }

  if (parsed.data.invite && data.session) {
    await supabase.rpc("accept_employee_invite", { invite_token: parsed.data.invite });
  }

  return ok(data.session ? "Account created." : "Account created. Check your email to confirm, then sign in.");
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  return createAccount(formData);
}

export async function signOutAction() {
  if (!isSupabaseConfigured()) return;
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
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

export async function createEmployeeInviteLink(email: string, createdBy: string) {
  const token = randomBytes(24).toString("hex");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("employee_invites").insert({
    email: email.toLowerCase(),
    token,
    created_by: createdBy,
    expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  });
  if (error) throw error;
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}/register?invite=${token}`;
}

export async function requireEmployeeForInvite() {
  return requireRole("EMPLOYEE");
}
