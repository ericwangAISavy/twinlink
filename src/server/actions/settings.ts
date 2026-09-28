"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { createEmployeeInviteLink } from "@/server/actions/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { inviteSchema, passwordSchema } from "@/lib/validations";
import { requireStaff, requireUser } from "@/server/authorization";

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

  const supabase = await createServerSupabaseClient();
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  });
  if (verifyError) return fail("Current password is incorrect.");

  const { error } = await supabase.auth.updateUser({ password: parsed.data.newPassword });
  if (error) return fail(error.message);
  return ok("Password updated.");
}

export async function createEmployeeInvite(formData: FormData): Promise<ActionResult> {
  const user = await requireStaff();
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") ?? "",
    jobTitle: formData.get("jobTitle") ?? "",
    department: formData.get("department") ?? "",
    role: formData.get("role") || "employee",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Enter a valid email");
  }

  try {
    const url = await createEmployeeInviteLink(parsed.data.email, user.id, {
      name: parsed.data.name,
      jobTitle: parsed.data.jobTitle,
      department: parsed.data.department,
      role: user.role === "ADMIN" && parsed.data.role === "admin" ? "admin" : "employee",
    });
    revalidatePath("/dashboard/employee/settings");
    revalidatePath("/admin/invitations");
    return ok(url);
  } catch {
    return fail("Unable to create invite.");
  }
}
