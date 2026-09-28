"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { toDbApplicationStatus, toDbJobStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { uniqueSlug } from "@/lib/utils";
import { adminJobSchema, applicationStatusSchema, inviteSchema, messageSchema } from "@/lib/validations";
import { createEmployeeInvite } from "@/server/actions/settings";
import { requireAdmin } from "@/server/authorization";
import { logActivity } from "@/server/queries/admin";

function emptyToNull(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function numOrNull(value: string | undefined) {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function adminUpsertJob(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = adminJobSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") ?? "",
    department: formData.get("department") ?? "",
    location: formData.get("location") ?? "",
    workplaceType: formData.get("workplaceType") ?? "",
    employmentType: formData.get("employmentType") ?? "",
    description: formData.get("description"),
    responsibilities: formData.get("responsibilities") ?? "",
    requirements: formData.get("requirements") ?? "",
    preferredQualifications: formData.get("preferredQualifications") ?? "",
    salaryMin: formData.get("salaryMin") ?? "",
    salaryMax: formData.get("salaryMax") ?? "",
    currency: formData.get("currency") ?? "USD",
    applicationDeadline: formData.get("applicationDeadline") ?? "",
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid job");
  }

  const supabase = await createServerSupabaseClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug || uniqueSlug(parsed.data.title),
    department: emptyToNull(parsed.data.department),
    location: emptyToNull(parsed.data.location),
    workplace_type: emptyToNull(parsed.data.workplaceType),
    employment_type: emptyToNull(parsed.data.employmentType),
    description: parsed.data.description,
    responsibilities: emptyToNull(parsed.data.responsibilities),
    requirements: emptyToNull(parsed.data.requirements),
    preferred_qualifications: emptyToNull(parsed.data.preferredQualifications),
    salary_min: numOrNull(parsed.data.salaryMin),
    salary_max: numOrNull(parsed.data.salaryMax),
    currency: emptyToNull(parsed.data.currency) ?? "USD",
    application_deadline: emptyToNull(parsed.data.applicationDeadline),
    status: toDbJobStatus(parsed.data.status),
  };

  if (id) {
    const { error } = await supabase.from("jobs").update(payload).eq("id", id);
    if (error) return fail(error.message);
    await logActivity({ actorId: user.id, action: "Updated job", entityType: "job", entityId: id });
    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    redirect(`/admin/jobs/${id}`);
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({ ...payload, created_by: user.id })
    .select("id")
    .single();
  if (error || !data) return fail(error?.message ?? "Unable to create job.");
  await logActivity({
    actorId: user.id,
    action: parsed.data.status === "PUBLISHED" ? "Published a job" : "Created a job",
    entityType: "job",
    entityId: data.id,
  });
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
  redirect(`/admin/jobs/${data.id}`);
}

export async function adminSetJobStatus(jobId: string, status: string): Promise<ActionResult> {
  const user = await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("jobs").update({ status: toDbJobStatus(status) }).eq("id", jobId);
  if (error) return fail(error.message);
  await logActivity({ actorId: user.id, action: `Set job status to ${status.toLowerCase()}`, entityType: "job", entityId: jobId });
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return ok("Job updated.");
}

export async function adminUpdateApplicationStatus(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const parsed = applicationStatusSchema.safeParse({
    applicationId: formData.get("applicationId"),
    status: formData.get("status"),
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid status");
  const supabase = await createServerSupabaseClient();
  const { data: current } = await supabase
    .from("applications")
    .select("id, status, candidate_id")
    .eq("id", parsed.data.applicationId)
    .maybeSingle();
  if (!current) return fail("Application not found.");
  const { error } = await supabase
    .from("applications")
    .update({ status: toDbApplicationStatus(parsed.data.status) })
    .eq("id", parsed.data.applicationId);
  if (error) return fail(error.message);
  await supabase.from("application_events").insert({
    application_id: parsed.data.applicationId,
    actor_id: user.id,
    from_status: current.status,
    to_status: toDbApplicationStatus(parsed.data.status),
  });
  await supabase.from("notifications").insert({
    user_id: current.candidate_id,
    title: "Application update",
    body: "Your application status was updated.",
    href: `/dashboard/candidate/applications/${parsed.data.applicationId}`,
  });
  await logActivity({
    actorId: user.id,
    action: "Changed application status",
    entityType: "application",
    entityId: parsed.data.applicationId,
  });
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  return ok("Status updated.");
}

export async function adminAssignApplication(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const applicationId = String(formData.get("applicationId") ?? "");
  const assignedTo = String(formData.get("assignedTo") ?? "").trim();
  if (!applicationId) return fail("Application is required.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("applications")
    .update({ assigned_to: assignedTo || null })
    .eq("id", applicationId);
  if (error) return fail(error.message);
  await logActivity({
    actorId: user.id,
    action: assignedTo ? "Assigned application" : "Unassigned application",
    entityType: "application",
    entityId: applicationId,
  });
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
  return ok("Assignment updated.");
}

export async function adminAddNote(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const applicationId = String(formData.get("applicationId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!applicationId || !body) return fail("Note cannot be empty.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("application_notes").insert({
    application_id: applicationId,
    author_id: user.id,
    body,
  });
  if (error) return fail(error.message);
  revalidatePath(`/admin/applications/${applicationId}`);
  revalidatePath(`/admin/candidates/${String(formData.get("candidateId") ?? "")}`);
  return ok("Note added.");
}

export async function adminSendMessage(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const parsed = messageSchema.safeParse({
    applicationId: formData.get("applicationId"),
    body: formData.get("body"),
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Message required");
  const { sendApplicationMessage } = await import("@/server/actions/messages");
  return sendApplicationMessage(formData);
}

export async function adminScheduleInterview(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const applicationId = String(formData.get("applicationId") ?? "");
  const scheduledAt = String(formData.get("scheduledAt") ?? "");
  const interviewType = String(formData.get("interviewType") ?? "video");
  const meetingUrl = String(formData.get("meetingUrl") ?? "");
  if (!applicationId || !scheduledAt) return fail("Application and time are required.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("interviews").insert({
    application_id: applicationId,
    interviewer_id: user.id,
    scheduled_at: new Date(scheduledAt).toISOString(),
    interview_type: interviewType,
    meeting_url: meetingUrl || null,
    status: "scheduled",
  });
  if (error) return fail(error.message);
  const { data: application } = await supabase
    .from("applications")
    .select("candidate_id")
    .eq("id", applicationId)
    .maybeSingle();
  if (application?.candidate_id) {
    await supabase.from("notifications").insert({
      user_id: application.candidate_id,
      title: "Interview scheduled",
      body: "Twinlink scheduled an interview for your application.",
      href: `/dashboard/candidate/applications/${applicationId}`,
    });
  }
  await logActivity({ actorId: user.id, action: "Scheduled interview", entityType: "interview", entityId: applicationId });
  revalidatePath("/admin/interviews");
  revalidatePath(`/admin/applications/${applicationId}`);
  return ok("Interview scheduled.");
}

export async function adminSetInterviewStatus(interviewId: string, status: string): Promise<ActionResult> {
  const user = await requireAdmin();
  if (!["scheduled", "completed", "cancelled"].includes(status)) return fail("Invalid interview status.");
  const supabase = await createServerSupabaseClient();
  const { data: interview } = await supabase.from("interviews").select("id, application_id").eq("id", interviewId).maybeSingle();
  if (!interview) return fail("Interview not found.");
  const { error } = await supabase.from("interviews").update({ status }).eq("id", interviewId);
  if (error) return fail(error.message);
  await logActivity({
    actorId: user.id,
    action: `Set interview status to ${status}`,
    entityType: "interview",
    entityId: String(interview.id),
  });
  revalidatePath("/admin/interviews");
  revalidatePath(`/admin/applications/${String(interview.application_id)}`);
  return ok("Interview updated.");
}

export async function adminInvitePerson(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") ?? "",
    jobTitle: formData.get("jobTitle") ?? "",
    department: formData.get("department") ?? "",
    role: formData.get("role") || "employee",
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid invite");
  const inviteData = new FormData();
  inviteData.set("email", parsed.data.email);
  inviteData.set("name", parsed.data.name ?? "");
  inviteData.set("jobTitle", parsed.data.jobTitle ?? "");
  inviteData.set("department", parsed.data.department ?? "");
  inviteData.set("role", parsed.data.role === "admin" && user.role === "ADMIN" ? "admin" : "employee");
  return createEmployeeInvite(inviteData);
}

export async function adminSetUserRole(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const targetId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!targetId || !["candidate", "employee", "admin"].includes(role)) return fail("Invalid role change.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.rpc("admin_set_role", { target_id: targetId, new_role: role });
  if (error) return fail(error.message);
  await logActivity({ actorId: user.id, action: `Set user role to ${role}`, entityType: "user", entityId: targetId });
  revalidatePath("/admin/users");
  return ok("Role updated.");
}

export async function adminSetEmployeeStatus(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const status = String(formData.get("status") ?? "");
  const jobTitle = String(formData.get("jobTitle") ?? "");
  const department = String(formData.get("department") ?? "");
  if (!userId || !["invited", "active", "inactive"].includes(status)) return fail("Invalid status.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("employee_profiles").upsert(
    {
      user_id: userId,
      status,
      job_title: jobTitle || null,
      department: department || null,
    },
    { onConflict: "user_id" },
  );
  if (error) return fail(error.message);
  revalidatePath("/admin/employees");
  revalidatePath(`/admin/employees/${userId}`);
  return ok("Employee updated.");
}

export async function adminSaveContent(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const body = String(formData.get("body") ?? "");
  if (!id) return fail("Missing content.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("company_content").update({ title, body }).eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/admin/content");
  return ok("Content saved.");
}

export async function adminCreateResource(formData: FormData): Promise<ActionResult> {
  const user = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const kind = String(formData.get("kind") ?? "public");
  const description = String(formData.get("description") ?? "");
  if (!title) return fail("Title is required.");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("resources").insert({
    title,
    url: url || null,
    kind,
    description: description || null,
    created_by: user.id,
  });
  if (error) return fail(error.message);
  revalidatePath("/admin/resources");
  return ok("Resource added.");
}

export async function adminSaveCompanySettings(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const { updateCompanyProfile } = await import("@/server/actions/company");
  return updateCompanyProfile(formData);
}
