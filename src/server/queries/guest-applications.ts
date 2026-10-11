import "server-only";
import { requireAdmin } from "@/server/authorization";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { firstRecord } from "@/lib/supabase/mappers";
import type { ApplicationStatus } from "@/lib/types";

export type GuestApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  cover: string;
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
export async function getGuestApplications() {
  await requireAdmin();
  const client = await createServerSupabaseClient();
  const { data, error } = await client
    .from("guest_applications")
    .select("*, jobs(title)")
    .order("created_at", { ascending: false });
  if (error)
    return {
      entries: [] as GuestApplication[],
      error: ["PGRST205", "42P01"].includes(error.code)
        ? "Run supabase/migrations/0014_guest_applications.sql in the Supabase SQL editor to enable applications without an account."
        : "Guest applications could not be loaded.",
    };
  return {
    entries: (data || []).map(mapGuestApplication),
    error: null,
  };
}

function mapGuestApplication(row: Record<string, unknown>): GuestApplication {
  return {
    id: String(row.id),
    jobId: String(row.job_id),
    jobTitle: String(firstRecord(row.jobs)?.title || "Role"),
    name: String(row.full_name),
    email: String(row.email),
    phone: String(row.phone),
    resume: String(row.resume_url),
    cover: String(row.cover_letter),
    status: row.status as ApplicationStatus,
    notes: String(row.review_notes),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function getGuestApplication(id: string) {
  await requireAdmin();
  const client = await createServerSupabaseClient();
  const { data, error } = await client
    .from("guest_applications")
    .select("*, jobs(title)")
    .eq("id", id)
    .maybeSingle();
  if (error)
    throw new Error(
      "This guest application could not be loaded. Please try again.",
    );
  return data ? mapGuestApplication(data) : null;
}
