import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { filenameFromPath, firstRecord, toAppJobStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { JobStatus } from "@/lib/types";

export type MappedJob = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  department: string | null;
  employmentType: string | null;
  description: string;
  requirements: string | null;
  status: JobStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  postedById: string;
  postedBy: { name: string | null; email?: string | null };
  _count: { applications: number };
};

function mapJob(row: Record<string, unknown>, applicationCount = 0): MappedJob {
  const creator = firstRecord(row.profiles);
  const status = toAppJobStatus(String(row.status ?? "draft"));
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    location: (row.location as string | null) ?? null,
    department: (row.department as string | null) ?? null,
    employmentType: (row.employment_type as string | null) ?? null,
    description: String(row.description ?? ""),
    requirements: (row.requirements as string | null) ?? null,
    status,
    publishedAt: status === "PUBLISHED" ? String(row.updated_at ?? row.created_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    postedById: String(row.created_by),
    postedBy: {
      name: (creator?.full_name as string | null) ?? null,
      email: (creator?.email as string | null) ?? null,
    },
    _count: { applications: applicationCount },
  };
}

export async function getPublishedJobs() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => mapJob(row));
}

export async function getJobBySlugOrId(slugOrId: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const bySlug = await supabase
    .from("jobs")
    .select("*, profiles:created_by(full_name, email)")
    .eq("slug", slugOrId)
    .maybeSingle();
  const row = bySlug.data
    ? bySlug.data
    : (
        await supabase
          .from("jobs")
          .select("*, profiles:created_by(full_name, email)")
          .eq("id", slugOrId)
          .maybeSingle()
      ).data;
  if (!row) return null;
  return mapJob(row);
}

export async function getEmployeeJobs() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("jobs")
    .select("*, applications(count)")
    .order("updated_at", { ascending: false });
  return (data ?? []).map((row) => {
    const countRow = Array.isArray(row.applications) ? row.applications[0] : row.applications;
    const count = (countRow as { count?: number } | null)?.count ?? 0;
    return mapJob(row, count);
  });
}

export async function getJobForEmployee(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("jobs")
    .select("*, profiles:created_by(full_name, email), applications(count)")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  const countRow = Array.isArray(data.applications) ? data.applications[0] : data.applications;
  const count = (countRow as { count?: number } | null)?.count ?? 0;
  return mapJob(data, count);
}

export const getEmployeeJob = getJobForEmployee;

export async function getPublishedJobById(id: string) {
  const job = await getJobBySlugOrId(id);
  return job?.status === "PUBLISHED" ? job : null;
}

export async function getPublishedJobBySlug(slug: string) {
  const job = await getJobBySlugOrId(slug);
  return job?.status === "PUBLISHED" ? job : null;
}

export async function getSavedJobIds(userId: string) {
  if (!isSupabaseConfigured()) return new Set<string>();
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("saved_jobs").select("job_id").eq("candidate_id", userId);
  return new Set((data ?? []).map((row) => String(row.job_id)));
}

export async function getSavedJobs(userId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("saved_jobs")
    .select("job_id, created_at, jobs(*)")
    .eq("candidate_id", userId)
    .order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    id: `${userId}:${row.job_id}`,
    jobId: String(row.job_id),
    job: firstRecord(row.jobs) ? mapJob(firstRecord(row.jobs)!) : null,
  }));
}

export function resumeDisplay(path: string | null) {
  if (!path) return null;
  return { url: path, filename: filenameFromPath(path) };
}
