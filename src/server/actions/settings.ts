"use server";

import { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { inviteSchema, passwordSchema } from "@/lib/validations";
import { requireRole, requireUser } from "@/server/authorization";

export async function changePassword(formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid password");
  }

  const record = await prisma.user.findUnique({ where: { id: user.id } });
  if (!record?.passwordHash) return fail("Password login is not available for this account.");

  const valid = await compare(parsed.data.currentPassword, record.passwordHash);
  if (!valid) return fail("Current password is incorrect.");

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hash(parsed.data.newPassword, 12) },
  });

  return ok("Password updated.");
}

export async function createEmployeeInvite(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("EMPLOYEE");
  const parsed = inviteSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Enter a valid email");
  }

  const token = randomBytes(24).toString("hex");
  const invite = await prisma.employeeInvite.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      token,
      createdById: user.id,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  revalidatePath("/dashboard/employee/settings");
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return ok(`${base}/register?invite=${invite.token}`);
}
