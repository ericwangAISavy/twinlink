import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { filenameFromPath, firstRecord, parseExperiences, toAppApplicationStatus, toAppJobStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CandidateBoardApplication } from "@/lib/candidate-applications";
import type { ApplicationStatus } from "@/lib/types";
import { getSavedJobIds as getSavedFromJobs, getSavedJobs as getSavedJobsFromJobs } from "@/server/queries/jobs";

export const getSavedJobIds = getSavedFromJobs;
export const getSavedJobs = getSavedJobsFromJobs;

async function signResume(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http")) return { url: path, filename: filenameFromPath(path) };
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 60);
  if (!data?.signedUrl) return { url: path, filename: filenameFromPath(path) };
  return { url: data.signedUrl, filename: filenameFromPath(path) };
}

export async function getCandidateApplication(jobId: string, candidateUserId: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId)
    .eq("candidate_id", candidateUserId)
    .maybeSingle();
  if (!data) return null;
  return {
    id: data.id as string,
    jobId: data.job_id as string,
    candidateUserId: data.candidate_id as string,
    status: toAppApplicationStatus(String(data.status)),
    coverLetter: data.cover_letter as string | null,
    createdAt: data.created_at as string,
  };
}

export type { CandidateBoardApplication } from "@/lib/candidate-applications";

export async function getCandidateApplicationBoard(candidateUserId: string): Promise<CandidateBoardApplication[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("applications")
    .select("*, jobs(id, slug, title, location, department, employment_type, workplace_type)")
    .eq("candidate_id", candidateUserId)
    .order("created_at", { ascending: false });
  const rows = data ?? [];
  if (rows.length === 0) return [];

  const resumeCache = new Map<string, { url: string; filename: string } | null>();
  async function resumeFor(path: string | null) {
    const key = path ?? "";
    if (resumeCache.has(key)) return resumeCache.get(key) ?? null;
    const signed = await signResume(path);
    resumeCache.set(key, signed);
    return signed;
  }

  return Promise.all(
    rows.map(async (row) => {
      const job = firstRecord(row.jobs);
      return {
        id: String(row.id),
        status: toAppApplicationStatus(String(row.status)),
        createdAt: String(row.created_at),
        updatedAt: String(row.updated_at),
        coverLetter: (row.cover_letter as string | null) ?? null,
        resume: await resumeFor((row.resume_url as string | null) ?? null),
        job: {
          id: String(job?.id ?? ""),
          slug: String(job?.slug ?? ""),
          title: String(job?.title ?? "Role"),
          location: (job?.location as string | null) ?? null,
          department: (job?.department as string | null) ?? null,
          employmentType: (job?.employment_type as string | null) ?? null,
          workplaceType: (job?.workplace_type as string | null) ?? null,
        },
      };
    }),
  );
}

export async function getCandidateApplications(candidateUserId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("applications")
    .select("*, jobs(id, slug, title, location, department, employment_type, workplace_type, status)")
    .eq("candidate_id", candidateUserId)
    .order("updated_at", { ascending: false });

  return (data ?? []).map((row) => {
    const job = firstRecord(row.jobs);
    return {
      id: String(row.id),
      status: toAppApplicationStatus(String(row.status)),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      job: {
        id: String(job?.id ?? ""),
        slug: String(job?.slug ?? ""),
        title: String(job?.title ?? ""),
        location: (job?.location as string | null) ?? null,
        department: (job?.department as string | null) ?? null,
        employmentType: (job?.employment_type as string | null) ?? null,
        workplaceType: (job?.workplace_type as string | null) ?? null,
        status: toAppJobStatus(String(job?.status ?? "draft")),
      },
    };
  });
}

export async function getApplicationForUser(
  applicationId: string,
  userId: string,
  role: "CANDIDATE" | "EMPLOYEE",
) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const query = supabase
    .from("applications")
    .select("*, jobs(*)")
    .eq("id", applicationId);
  const { data } = role === "CANDIDATE" ? await query.eq("candidate_id", userId).maybeSingle() : await query.maybeSingle();
  if (!data) return null;

  const job = firstRecord(data.jobs);
  const [{ data: profile }, { data: candidateProfile }] = await Promise.all([
    supabase.from("profiles").select("id, email, full_name, role").eq("id", data.candidate_id).maybeSingle(),
    supabase.from("candidate_profiles").select("*").eq("user_id", data.candidate_id).maybeSingle(),
  ]);
  const resumeFile = await signResume((candidateProfile?.resume_url as string | null) ?? (data.resume_url as string | null));

  return {
    id: String(data.id),
    status: toAppApplicationStatus(String(data.status)),
    coverLetter: (data.cover_letter as string | null) ?? null,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at),
    resumeUrl: resumeFile,
    contactEmail: String(data.contact_email ?? ""),
    contactPhone: String(data.contact_phone ?? ""),
    contactAddress: String(data.contact_address ?? ""),
    socialUrl: String(data.social_url ?? ""),
    assignedToId: (data.assigned_to as string | null) ?? null,
    candidateUserId: String(data.candidate_id),
    job: job
      ? {
          id: String(job.id),
          slug: String(job.slug),
          title: String(job.title),
          location: (job.location as string | null) ?? null,
          department: (job.department as string | null) ?? null,
          employmentType: (job.employment_type as string | null) ?? null,
          workplaceType: (job.workplace_type as string | null) ?? null,
          description: String(job.description ?? ""),
          postedById: String(job.created_by),
        }
      : {
          id: "",
          slug: "",
          title: "",
          location: null,
          department: null,
          employmentType: null,
          workplaceType: null,
          description: "",
          postedById: "",
        },
    candidate: {
      id: String(data.candidate_id),
      name: profile?.full_name ?? null,
      email: profile?.email ?? null,
      candidateProfile: candidateProfile
        ? {
            headline: (candidateProfile.title as string | null) ?? null,
            location: (candidateProfile.location as string | null) ?? null,
            skills: (candidateProfile.skills as string[] | null) ?? [],
            resumeFile,
            experiences: parseExperiences(candidateProfile.experience),
          }
        : null,
    },
  };
}

export async function listApplications(filters?: { status?: ApplicationStatus; jobId?: string }) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("applications").select("*, jobs(id, title, slug)").order("updated_at", { ascending: false });
  if (filters?.jobId) query = query.eq("job_id", filters.jobId);
  if (filters?.status) {
    const { toDbApplicationStatus } = await import("@/lib/supabase/mappers");
    query = query.eq("status", toDbApplicationStatus(filters.status));
  }
  const { data } = await query;
  const rows = data ?? [];
  const candidateIds = [...new Set(rows.map((row) => String(row.candidate_id)))];
  const [{ data: profiles }, { data: candidateProfiles }] = await Promise.all([
    candidateIds.length ? supabase.from("profiles").select("id, full_name, email").in("id", candidateIds) : Promise.resolve({ data: [] }),
    candidateIds.length
      ? supabase.from("candidate_profiles").select("user_id, title, location").in("user_id", candidateIds)
      : Promise.resolve({ data: [] }),
  ]);
  const profileMap = new Map((profiles ?? []).map((item) => [item.id, item]));
  const cpMap = new Map((candidateProfiles ?? []).map((item) => [item.user_id, item]));

  return rows.map((row) => {
    const job = firstRecord(row.jobs);
    const profile = profileMap.get(String(row.candidate_id));
    const cp = cpMap.get(String(row.candidate_id));
    return {
      id: String(row.id),
      status: toAppApplicationStatus(String(row.status)),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      job: {
        id: String(job?.id ?? ""),
        title: String(job?.title ?? ""),
        slug: String(job?.slug ?? ""),
      },
      candidate: {
        id: String(row.candidate_id),
        name: profile?.full_name ?? null,
        email: profile?.email ?? null,
        candidateProfile: cp
          ? { headline: (cp.title as string | null) ?? null, location: (cp.location as string | null) ?? null }
          : null,
      },
      assignedToId: (row.assigned_to as string | null) ?? null,
    };
  });
}

export const getExistingApplication = getCandidateApplication;
export const getAllApplications = listApplications;

export async function getApplicationForCandidate(applicationId: string, userId: string) {
  return getApplicationForUser(applicationId, userId, "CANDIDATE");
}

export async function getApplicationForEmployee(applicationId: string) {
  return getApplicationForUser(applicationId, "", "EMPLOYEE");
}

export async function getJobApplications(jobId: string) {
  return listApplications({ jobId });
}
