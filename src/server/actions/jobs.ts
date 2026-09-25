"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
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

  const publishedAt = parsed.data.status === "PUBLISHED" ? new Date() : null;

  if (id) {
    const existing = await prisma.jobPosting.findUnique({ where: { id } });
    if (!existing) return fail("Job not found.");
    await prisma.jobPosting.update({
      where: { id },
      data: {
        title: parsed.data.title,
        location: emptyToNull(parsed.data.location),
        employmentType: emptyToNull(parsed.data.employmentType),
        description: parsed.data.description,
        requirements: emptyToNull(parsed.data.requirements),
        status: parsed.data.status,
        publishedAt:
          parsed.data.status === "PUBLISHED"
            ? existing.publishedAt ?? publishedAt
            : existing.publishedAt,
      },
    });
    revalidatePath("/careers");
    revalidatePath("/dashboard/employee/jobs");
    redirect(`/dashboard/employee/jobs/${id}`);
  }

  const created = await prisma.jobPosting.create({
    data: {
      slug: uniqueSlug(parsed.data.title),
      title: parsed.data.title,
      location: emptyToNull(parsed.data.location),
      employmentType: emptyToNull(parsed.data.employmentType),
      description: parsed.data.description,
      requirements: emptyToNull(parsed.data.requirements),
      status: parsed.data.status,
      publishedAt,
      postedById: user.id,
    },
  });

  revalidatePath("/careers");
  revalidatePath("/dashboard/employee/jobs");
  redirect(`/dashboard/employee/jobs/${created.id}`);
}

export async function deleteJob(jobId: string): Promise<ActionResult> {
  await requireRole("EMPLOYEE");
  await prisma.jobPosting.delete({ where: { id: jobId } });
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
  await requireRole("EMPLOYEE");
  await prisma.jobPosting.delete({ where: { id: jobId } });
  revalidatePath("/dashboard/employee/jobs");
  revalidatePath("/careers");
  redirect("/dashboard/employee/jobs");
}

export const toggleSaveJobAction = toggleSavedJob;

export async function toggleSavedJob(jobId: string): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId: user.id, jobId } },
  });
  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    revalidatePath("/dashboard/candidate/saved");
    revalidatePath("/careers");
    return ok("Removed from saved jobs.");
  }
  await prisma.savedJob.create({ data: { userId: user.id, jobId } });
  revalidatePath("/dashboard/candidate/saved");
  revalidatePath("/careers");
  return ok("Job saved.");
}
