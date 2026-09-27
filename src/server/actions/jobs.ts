"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { toDbJobStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { uniqueSlug } from "@/lib/utils";
import { jobSchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";

function emptyToNull(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function upsertJob(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("EMPLOYEE");
  const id = String(formData.get("id") ?? "");
  const parsed = jobSchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location") ?? "",
    employmentType: formData.get("employmentType") ?? "",
    description: formData.get("description"),
    requirements: formData.get("requirements") ?? "",
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid job");
  }

  const supabase = await createServerSupabaseClient();
  const payload = {
    title: parsed.data.title,
    location: emptyToNull(parsed.data.location),
    employment_type: emptyToNull(parsed.data.employmentType),
    description: parsed.data.description,
    requirements: emptyToNull(parsed.data.requirements),
    status: toDbJobStatus(parsed.data.status),
  };

  if (id) {
    const { error } = await supabase.from("jobs").update(payload).eq("id", id);
    if (error) return fail(error.message);
    revalidatePath("/careers");
    revalidatePath("/dashboard/employee/jobs");
    redirect(`/dashboard/employee/jobs/${id}`);
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      ...payload,
      slug: uniqueSlug(parsed.data.title),
      created_by: user.id,
    })
    .select("id")
    .single();
  if (error || !data) return fail(error?.message ?? "Unable to create job.");

  revalidatePath("/careers");
  revalidatePath("/dashboard/employee/jobs");
  redirect(`/dashboard/employee/jobs/${data.id}`);
}

export async function deleteJob(jobId: string): Promise<ActionResult> {
  await requireRole("EMPLOYEE");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);
  if (error) return fail(error.message);
  revalidatePath("/careers");
  revalidatePath("/dashboard/employee/jobs");
  return ok("Job deleted.");
}

export async function upsertJobAction(
  jobId: string | null,
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  if (jobId) formData.set("id", jobId);
  const result = await upsertJob(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function deleteJobAction(jobId: string) {
  const result = await deleteJob(jobId);
  if (!result.ok) return result;
  redirect("/dashboard/employee/jobs");
}

export const toggleSaveJobAction = toggleSavedJob;

export async function toggleSavedJob(jobId: string): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const supabase = await createServerSupabaseClient();
  const { data: existing } = await supabase
    .from("saved_jobs")
    .select("job_id")
    .eq("candidate_id", user.id)
    .eq("job_id", jobId)
    .maybeSingle();
  if (existing) {
    await supabase.from("saved_jobs").delete().eq("candidate_id", user.id).eq("job_id", jobId);
    revalidatePath("/dashboard/candidate/saved");
    revalidatePath("/careers");
    return ok("Removed from saved jobs.");
  }
  const { error } = await supabase.from("saved_jobs").insert({ candidate_id: user.id, job_id: jobId });
  if (error) return fail(error.message);
  revalidatePath("/dashboard/candidate/saved");
  revalidatePath("/careers");
  return ok("Job saved.");
}
