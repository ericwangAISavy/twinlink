"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { getCandidateVisibleStage, isTerminalStage, parseHiringStage, transitionNeedsConfirmation } from "@/lib/hiring-stages";
import { toDbApplicationStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationStatusSchema, applySchema } from "@/lib/validations";
import { requireAdmin, requireRole } from "@/server/authorization";

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
      status: "applied",
      current_stage: "applied",
    })
    .select("id")
    .single();

  if (error || !application) {
    return fail("You have already applied to this role.");
  }

  await supabase.from("notifications").insert([
    {
      user_id: user.id,
      title: "Application received",
      body: getCandidateVisibleStage("applied").message,
      href: `/dashboard/candidate/applications/${application.id}`,
    },
    {
      user_id: job.created_by,
      title: "New application",
      body: `${user.name ?? user.email} applied to ${job.title}.`,
      href: `/admin/applications/${application.id}`,
    },
  ]);

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
  await requireAdmin();
  const parsed = applicationStatusSchema.safeParse({
    applicationId: formData.get("applicationId"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid status");
  }

  const supabase = await createServerSupabaseClient();
  const nextStage = toDbApplicationStatus(parsed.data.status);
  const { data: current } = await supabase
    .from("applications")
    .select("current_stage, status")
    .eq("id", parsed.data.applicationId)
    .maybeSingle();
  if (!current) return fail("Application not found.");
  const fromStage = parseHiringStage(String(current.current_stage ?? current.status));
  if (transitionNeedsConfirmation(fromStage, parseHiringStage(nextStage)) && formData.get("confirm") !== "yes") {
    return fail("Confirm this stage change before it is saved.");
  }

  const message = String(formData.get("candidateMessage") ?? "").trim();
  const { error } = await supabase.rpc("set_application_stage", {
    target_application_id: parsed.data.applicationId,
    next_stage: nextStage,
    candidate_message: message || getCandidateVisibleStage(parseHiringStage(nextStage)).message,
    notify_candidate: formData.get("notifyCandidate") !== "no",
  });
  if (error) return fail(error.message);

  revalidatePath("/dashboard/employee/applicants");
  revalidatePath(`/dashboard/employee/applicants/${parsed.data.applicationId}`);
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  revalidatePath("/dashboard/candidate");
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath(`/dashboard/candidate/applications/${parsed.data.applicationId}`);
  return ok("Hiring stage updated.");
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
  if (isTerminalStage(parseHiringStage(String(application.current_stage ?? application.status)))) {
    return fail("This application is already closed.");
  }
  const { error } = await supabase
    .from("applications")
    .update({ status: "withdrawn", current_stage: "withdrawn" })
    .eq("id", applicationId)
    .eq("candidate_id", user.id);
  if (error) return fail(error.message);

  const { data: job } = await supabase.from("jobs").select("created_by, title").eq("id", application.job_id).maybeSingle();
  if (job?.created_by) {
    await supabase.from("notifications").insert({
      user_id: job.created_by,
      title: "Application withdrawn",
      body: `${user.name ?? user.email} withdrew from ${job.title ?? "a role"}.`,
      href: `/admin/applications/${applicationId}`,
    });
  }
  const { logActivity } = await import("@/server/queries/admin");
  await logActivity({
    actorId: user.id,
    action: "application_withdrawn",
    entityType: "application",
    entityId: applicationId,
  });

  revalidatePath("/dashboard/candidate");
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath(`/dashboard/candidate/applications/${applicationId}`);
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
  return ok("Application withdrawn.");
}
