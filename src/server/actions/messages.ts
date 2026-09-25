"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { messageSchema } from "@/lib/validations";
import { requireUser } from "@/server/authorization";

export async function sendMessageAction(
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  const result = await sendApplicationMessage(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function sendApplicationMessage(formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = messageSchema.safeParse({
    applicationId: formData.get("applicationId"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Message is required");
  }

  const application = await prisma.application.findUnique({
    where: { id: parsed.data.applicationId },
    include: { job: true },
  });
  if (!application) return fail("Thread not found.");

  const isCandidate = user.role === "CANDIDATE" && application.candidateUserId === user.id;
  const isEmployee = user.role === "EMPLOYEE";
  if (!isCandidate && !isEmployee) {
    return fail("You cannot message this application.");
  }

  await prisma.message.create({
    data: {
      applicationId: application.id,
      senderId: user.id,
      body: parsed.data.body,
    },
  });

  const recipientId = isCandidate ? application.job.postedById : application.candidateUserId;
  await prisma.notification.create({
    data: {
      userId: recipientId,
      title: "New message",
      body: `${user.name ?? "Someone"} sent a message about ${application.job.title}.`,
      href:
        user.role === "EMPLOYEE"
          ? `/dashboard/candidate/messages/${application.id}`
          : `/dashboard/employee/messages/${application.id}`,
    },
  });

  revalidatePath(`/dashboard/employee/messages/${application.id}`);
  revalidatePath(`/dashboard/candidate/messages/${application.id}`);
  revalidatePath(`/dashboard/employee/applicants/${application.id}`);
  revalidatePath(`/dashboard/candidate/applications/${application.id}`);
  return ok("Message sent.");
}

export async function markNotificationsRead(): Promise<ActionResult> {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { userId: user.id, read: false },
    data: { read: true },
  });
  revalidatePath("/dashboard");
  return ok();
}
