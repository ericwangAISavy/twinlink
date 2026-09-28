"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { firstRecord } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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

  const supabase = await createServerSupabaseClient();
  const { data: application } = await supabase
    .from("applications")
    .select("id, candidate_id, jobs(title, created_by)")
    .eq("id", parsed.data.applicationId)
    .maybeSingle();
  if (!application) return fail("Thread not found.");

  const isCandidate = user.role === "CANDIDATE" && application.candidate_id === user.id;
  const isStaff = user.role === "EMPLOYEE" || user.role === "ADMIN";
  if (!isCandidate && !isStaff) {
    return fail("You cannot message this application.");
  }

  const { error } = await supabase.from("messages").insert({
    application_id: application.id,
    sender_id: user.id,
    body: parsed.data.body,
  });
  if (error) return fail(error.message);

  const job = firstRecord(application.jobs);
  const recipientId = isCandidate ? (job?.created_by as string | undefined) : application.candidate_id;
  if (recipientId) {
    await supabase.from("notifications").insert({
      user_id: recipientId,
      title: "New message",
      body: `${user.name ?? "Someone"} sent a message about ${String(job?.title ?? "an application")}.`,
      href:
        isStaff
          ? `/dashboard/candidate/messages/${application.id}`
          : `/dashboard/employee/messages/${application.id}`,
    });
  }

  revalidatePath(`/dashboard/employee/messages/${application.id}`);
  revalidatePath(`/dashboard/candidate/messages/${application.id}`);
  revalidatePath(`/dashboard/employee/applicants/${application.id}`);
  revalidatePath(`/dashboard/candidate/applications/${application.id}`);
  return ok("Message sent.");
}

export async function markNotificationsRead(): Promise<ActionResult> {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/dashboard");
  return ok();
}
