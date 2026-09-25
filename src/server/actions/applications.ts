"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { applicationStatusSchema, applySchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";

export async function applyToJob(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const parsed = applySchema.safeParse({
    jobId: formData.get("jobId"),
    coverLetter: formData.get("coverLetter") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Unable to apply");
  }

  const job = await prisma.jobPosting.findUnique({ where: { id: parsed.data.jobId } });
  if (!job || job.status !== "PUBLISHED") {
    return fail("This role is not open for applications.");
  }

  try {
    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        candidateUserId: user.id,
        coverLetter: parsed.data.coverLetter || null,
      },
    });

    await prisma.notification.create({
      data: {
        userId: job.postedById,
        title: "New application",
        body: `${user.name ?? user.email} applied to ${job.title}.`,
        href: `/dashboard/employee/applicants/${application.id}`,
      },
    });
  } catch {
    return fail("You have already applied to this role.");
  }

  revalidatePath(`/careers/${job.slug}`);
  revalidatePath("/dashboard/candidate/applications");
  return ok("Application submitted.");
}

export async function updateApplicationStatus(formData: FormData): Promise<ActionResult> {
  await requireRole("EMPLOYEE");
  const parsed = applicationStatusSchema.safeParse({
    applicationId: formData.get("applicationId"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid status");
  }

  const application = await prisma.application.update({
    where: { id: parsed.data.applicationId },
    data: { status: parsed.data.status },
    include: { job: { select: { title: true, slug: true } } },
  });

  await prisma.notification.create({
    data: {
      userId: application.candidateUserId,
      title: "Application update",
      body: `Your application for ${application.job.title} is now ${parsed.data.status.toLowerCase()}.`,
      href: `/dashboard/candidate/applications/${application.id}`,
    },
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
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });
  if (!application || application.candidateUserId !== user.id) {
    return fail("Application not found.");
  }
  await prisma.application.update({
    where: { id: applicationId },
    data: { status: "WITHDRAWN" },
  });
  revalidatePath("/dashboard/candidate/applications");
  return ok("Application withdrawn.");
}
