"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { firstRecord, toDbApplicationStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationStatusSchema, applySchema } from "@/lib/validations";
import { requireRole, requireStaff } from "@/server/authorization";

export async function applyToJob(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const parsed = applySchema.safeParse({
    jobId: formData.get("jobId"),
    coverLetter: formData.get("coverLetter") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Unable to apply");
  }

  const supabase = await createServerSupabaseClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("id", parsed.data.jobId).maybeSingle();
  if (!job || job.status !== "published") {
    return fail("This role is not open for applications.");
  }

  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select("resume_url")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: application, error } = await supabase
    .from("applications")
    .insert({
      job_id: job.id,
      candidate_id: user.id,
      cover_letter: parsed.data.coverLetter || null,
      resume_url: candidateProfile?.resume_url ?? null,
      status: "submitted",
    })
    .select("id")
    .single();

  if (error || !application) {
    return fail("You have already applied to this role.");
  }

  await supabase.from("notifications").insert({
    user_id: job.created_by,
    title: "New application",
    body: `${user.name ?? user.email} applied to ${job.title}.`,
    href: `/dashboard/employee/applicants/${application.id}`,
  });

  const { logActivity } = await import("@/server/queries/admin");
  await logActivity({
    actorId: user.id,
    action: "Candidate applied",
    entityType: "application",
    entityId: application.id,
  });

  revalidatePath(`/careers/${job.slug}`);
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath("/admin/applications");
  return ok("Application submitted.");
}

export async function updateApplicationStatus(formData: FormData): Promise<ActionResult> {
  await requireStaff();
  const parsed = applicationStatusSchema.safeParse({
    applicationId: formData.get("applicationId"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid status");
  }

  const supabase = await createServerSupabaseClient();
  const { data: application, error } = await supabase
    .from("applications")
    .update({ status: toDbApplicationStatus(parsed.data.status) })
    .eq("id", parsed.data.applicationId)
    .select("id, candidate_id, jobs(title)")
    .single();
  if (error || !application) return fail(error?.message ?? "Unable to update status.");

  const job = firstRecord(application.jobs);
  await supabase.from("notifications").insert({
    user_id: application.candidate_id,
    title: "Application update",
    body: `Your application for ${String(job?.title ?? "a role")} was updated.`,
    href: `/dashboard/candidate/applications/${application.id}`,
  });

  revalidatePath("/dashboard/employee/applicants");
  revalidatePath(`/dashboard/employee/applicants/${application.id}`);
  revalidatePath("/dashboard/candidate/applications");
  return ok("Status updated.");
}

export async function applyToJobAction(
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  const result = await applyToJob(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function updateApplicationStatusAction(
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  const result = await updateApplicationStatus(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function withdrawApplicationAction(applicationId: string) {
  return withdrawApplication(applicationId);
}

export async function withdrawApplication(applicationId: string): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const supabase = await createServerSupabaseClient();
  const { data: application } = await supabase.from("applications").select("*").eq("id", applicationId).maybeSingle();
  if (!application || application.candidate_id !== user.id) {
    return fail("Application not found.");
  }
  const { error } = await supabase.from("applications").update({ status: "withdrawn" }).eq("id", applicationId);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/candidate/applications");
  return ok("Application withdrawn.");
}
