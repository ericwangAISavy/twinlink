"use server";

import { applicationContactSchema } from "@/lib/application-contact";
import { applicationDeadlinePassed } from "@/lib/application-deadline";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { candidateApplicationHref } from "@/lib/candidate-inbox";
import {
  APPLICATION_STATUS_MESSAGES,
  isTerminalApplicationStatus,
  parseApplicationStatus,
} from "@/lib/constants";
import { toDbApplicationStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationStatusSchema, applySchema } from "@/lib/validations";
import { requireAdmin, requireRole } from "@/server/authorization";

function staffHref(role: string | null | undefined, applicationId: string) {
  return role === "admin"
    ? `/admin/applications/${applicationId}`
    : `/dashboard/employee/applicants/${applicationId}`;
}

export async function applyToJob(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const parsed = applySchema.extend(applicationContactSchema.shape).safeParse({
    jobId: formData.get("jobId"),
    coverLetter: formData.get("coverLetter") ?? "",
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    social: formData.get("social") || "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Unable to apply");
  }

  const supabase = await createServerSupabaseClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", parsed.data.jobId)
    .maybeSingle();
  if (!job || String(job.status) !== "published") {
    return fail("This role is not open for applications.");
  }
  if (
    applicationDeadlinePassed(
      job.application_deadline ? String(job.application_deadline) : null,
    )
  ) {
    return fail("The application deadline for this role has passed.");
  }

  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", job.id)
    .eq("candidate_id", user.id)
    .maybeSingle();
  if (existing) {
    return fail("You have already applied to this role.");
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
      contact_email: parsed.data.email,
      contact_phone: parsed.data.phone,
      contact_address: parsed.data.address,
      social_url: parsed.data.social,
      resume_url: candidateProfile?.resume_url ?? null,
      status: "submitted",
    })
    .select("id")
    .single();

  if (error || !application) {
    if (error && /duplicate|unique/i.test(error.message)) {
      return fail("You have already applied to this role.");
    }
    return fail(error?.message ?? "Unable to submit this application.");
  }

  const { data: staff } = await supabase
    .from("profiles")
    .select("id, role")
    .in("role", ["admin", "employee"]);
  const recipients = new Map<string, string>();
  for (const row of staff ?? []) {
    if (row.role === "admin" || row.id === job.created_by) {
      recipients.set(String(row.id), String(row.role));
    }
  }
  if (job.created_by && !recipients.has(String(job.created_by))) {
    recipients.set(String(job.created_by), "employee");
  }

  await supabase.from("notifications").insert([
    {
      user_id: user.id,
      title: "Application received",
      body: APPLICATION_STATUS_MESSAGES.submitted,
      href: candidateApplicationHref(String(application.id)),
    },
    ...[...recipients.entries()].map(([userId, role]) => ({
      user_id: userId,
      title: "New application",
      body: `${user.name ?? user.email} applied to ${job.title}.`,
      href: staffHref(role, String(application.id)),
    })),
  ]);

  const { logActivity } = await import("@/server/queries/admin");
  await logActivity({
    actorId: user.id,
    action: "Candidate applied",
    entityType: "application",
    entityId: application.id,
  });

  revalidatePath(`/careers/${job.slug}`);
  revalidatePath("/dashboard/candidate");
  revalidatePath("/dashboard/candidate/jobs");
  revalidatePath(`/dashboard/candidate/jobs/${job.id}`);
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath("/admin/candidates");
  redirect(`/dashboard/candidate/applications?id=${application.id}`);
}

export async function updateApplicationStatus(
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireAdmin();
  const parsed = applicationStatusSchema.safeParse({
    applicationId: formData.get("applicationId"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid status");
  }

  const supabase = await createServerSupabaseClient();
  const nextStatus = toDbApplicationStatus(parsed.data.status);
  const { data: current } = await supabase
    .from("applications")
    .select("status, candidate_id, job_id")
    .eq("id", parsed.data.applicationId)
    .maybeSingle();
  if (!current) return fail("Application not found.");
  const fromStatus = parseApplicationStatus(String(current.status));
  if (fromStatus === nextStatus)
    return ok("This application already has that status.");

  const { error } = await supabase
    .from("applications")
    .update({ status: nextStatus })
    .eq("id", parsed.data.applicationId);
  if (error) return fail(error.message);

  await supabase.from("application_events").insert({
    application_id: parsed.data.applicationId,
    actor_id: user.id,
    from_status: fromStatus,
    to_status: nextStatus,
  });

  const message =
    String(formData.get("candidateMessage") ?? "").trim() ||
    APPLICATION_STATUS_MESSAGES[nextStatus];
  const notify = formData.get("notifyCandidate") !== "no";
  if (notify && current.candidate_id) {
    await supabase.from("notifications").insert({
      user_id: current.candidate_id,
      title: "Application update",
      body: message,
      href: candidateApplicationHref(parsed.data.applicationId),
    });
  }

  revalidatePath("/dashboard/employee/applicants");
  revalidatePath(`/dashboard/employee/applicants/${parsed.data.applicationId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  revalidatePath("/dashboard/candidate");
  revalidatePath("/dashboard/candidate/applications");
  revalidatePath(
    `/dashboard/candidate/applications/${parsed.data.applicationId}`,
  );
  return ok("Application status updated.");
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

export async function withdrawApplication(
  applicationId: string,
): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const supabase = await createServerSupabaseClient();
  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .maybeSingle();
  if (!application || application.candidate_id !== user.id) {
    return fail("Application not found.");
  }
  const status = parseApplicationStatus(String(application.status));
  if (!status || isTerminalApplicationStatus(status)) {
    return fail("This application is already closed.");
  }
  const { error } = await supabase
    .from("applications")
    .update({ status: "withdrawn" })
    .eq("id", applicationId)
    .eq("candidate_id", user.id);
  if (error) return fail(error.message);

  const { data: job } = await supabase
    .from("jobs")
    .select("created_by, title")
    .eq("id", application.job_id)
    .maybeSingle();
  const { data: creator } = job?.created_by
    ? await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", job.created_by)
        .maybeSingle()
    : { data: null };
  if (job?.created_by) {
    await supabase.from("notifications").insert({
      user_id: job.created_by,
      title: "Application withdrawn",
      body: `${user.name ?? user.email} withdrew from ${job.title ?? "a role"}.`,
      href: staffHref(creator?.role, applicationId),
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
