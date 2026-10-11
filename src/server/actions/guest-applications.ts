"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { fail, ok } from "@/lib/action-result";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/server/authorization";
import { APPLICATION_STATUSES } from "@/lib/constants";

const schema = z.object({
  jobId: z.uuid(),
  name: z.string().trim().min(2, "Enter your full name.").max(150),
  email: z.email().trim().toLowerCase().max(254),
  phone: z.string().trim().max(80),
  resume: z
    .string()
    .trim()
    .max(2048)
    .refine((value) => {
      if (!value) return true;
      try {
        const url = new URL(value);
        return url.protocol === "https:" && !url.username && !url.password;
      } catch {
        return false;
      }
    }, "Use an HTTPS link for your resume or portfolio.")
    .transform((value) => (value ? new URL(value).toString() : "")),
  cover: z.string().trim().max(10000),
});

export async function submitGuestApplication(data: FormData) {
  if (data.get("website")) return ok("Application received.");
  const parsed = schema.safeParse({
    jobId: data.get("jobId"),
    name: data.get("name"),
    email: String(data.get("email") || "").trim(),
    phone: data.get("phone") || "",
    resume: data.get("resume") || "",
    cover: data.get("cover") || "",
  });
  if (!parsed.success)
    return fail(
      parsed.error.issues[0]?.message || "Check your application details.",
    );
  try {
    const client = createPublicSupabaseClient();
    const input = parsed.data;
    const { error } = await client.rpc("submit_guest_application", {
      p_job_id: input.jobId,
      p_name: input.name,
      p_email: input.email,
      p_phone: input.phone,
      p_resume_url: input.resume,
      p_cover_letter: input.cover,
    });
    if (error) {
      if (error.message.includes("not open"))
        return fail("This role is no longer accepting applications.");
      if (error.message.includes("Please wait"))
        return fail("Please wait before submitting more applications.");
      return fail(
        "Applications are temporarily unavailable. Please try again later.",
      );
    }
    revalidatePath("/admin/guest-applications");
    return ok(
      "Your application has been received. Our team will review the details you provided.",
    );
  } catch {
    return fail(
      "Applications are temporarily unavailable. Please try again later.",
    );
  }
}

export async function reviewGuestApplication(data: FormData) {
  await requireAdmin();
  const parsed = z
    .object({
      id: z.uuid(),
      status: z.enum(APPLICATION_STATUSES),
      notes: z.string().trim().max(10000),
      updatedAt: z.iso.datetime({ offset: true }),
    })
    .safeParse({
      id: data.get("id"),
      status: data.get("status"),
      notes: data.get("notes") || "",
      updatedAt: data.get("updatedAt"),
    });
  if (!parsed.success) return fail("Check the review details.");
  const client = await createServerSupabaseClient();
  const { data: row, error } = await client
    .from("guest_applications")
    .update({
      status: parsed.data.status,
      review_notes: parsed.data.notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id)
    .eq("updated_at", parsed.data.updatedAt)
    .select("id")
    .maybeSingle();
  if (error) return fail("The application could not be updated.");
  if (!row)
    return fail(
      "Another administrator changed this application. Reload the latest review before saving your changes.",
    );
  revalidatePath("/admin/guest-applications");
  revalidatePath(`/admin/guest-applications/${row.id}`);
  return ok("Application review saved.");
}
