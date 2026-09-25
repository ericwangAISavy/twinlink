"use server";

import { AuthError } from "next-auth";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/lib/auth";
import { fail, ok, type ActionResult, type ActionState } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") || "/dashboard");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}

export async function createAccount(formData: FormData): Promise<ActionResult> {
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
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return fail("An account with that email already exists.");
  }

  let role: "CANDIDATE" | "EMPLOYEE" = "CANDIDATE";
  let inviteId: string | null = null;

  if (parsed.data.invite) {
    const invite = await prisma.employeeInvite.findUnique({
      where: { token: parsed.data.invite },
    });
    if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
      return fail("This employee invite is invalid or expired.");
    }
    if (invite.email.toLowerCase() !== email) {
      return fail("This invite was issued for a different email address.");
    }
    role = "EMPLOYEE";
    inviteId = invite.id;
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        name: parsed.data.name,
        passwordHash,
        role,
      },
    });

    if (role === "EMPLOYEE") {
      await tx.employeeProfile.create({ data: { userId: user.id } });
      if (inviteId) {
        await tx.employeeInvite.update({
          where: { id: inviteId },
          data: { usedAt: new Date() },
        });
      }
    } else {
      await tx.candidateProfile.create({ data: { userId: user.id } });
    }
  });

  return ok("Account created.");
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  return createAccount(formData);
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function changePasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { changePassword } = await import("@/server/actions/settings");
  if (!formData.get("newPassword") && formData.get("password")) {
    formData.set("newPassword", String(formData.get("password")));
  }
  const result = await changePassword(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}
