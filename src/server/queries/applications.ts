import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { filenameFromPath, firstRecord, parseExperiences, toAppApplicationStatus, toAppJobStatus, toAppRole } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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
    status: toAppApplicationStatus(data.status as string),
    coverLetter: data.cover_letter as string | null,
    createdAt: data.created_at as string,
  };
}

export async function getCandidateApplications(candidateUserId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("applications")
    .select("*, jobs(id, slug, title, location, employment_type, status), messages(count)")
    .eq("candidate_id", candidateUserId)
    .order("updated_at", { ascending: false });

  return (data ?? []).map((row) => {
    const job = firstRecord(row.jobs);
    const countRow = Array.isArray(row.messages) ? row.messages[0] : row.messages;
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
        employmentType: (job?.employment_type as string | null) ?? null,
        status: toAppJobStatus(String(job?.status ?? "draft")),
      },
      _count: { messages: (countRow as { count?: number } | null)?.count ?? 0 },
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
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", data.candidate_id)
    .maybeSingle();
  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select("*")
    .eq("user_id", data.candidate_id)
    .maybeSingle();
  const { data: messages } = await supabase
    .from("messages")
    .select("id, body, created_at, sender_id")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: true });

  const senderIds = [...new Set((messages ?? []).map((item) => String(item.sender_id)))];
  const { data: senders } = senderIds.length
    ? await supabase.from("profiles").select("id, full_name, role").in("id", senderIds)
    : { data: [] };
  const senderMap = new Map((senders ?? []).map((item) => [item.id, item]));
  const resumeFile = await signResume((candidateProfile?.resume_url as string | null) ?? (data.resume_url as string | null));

  return {
    id: String(data.id),
    status: toAppApplicationStatus(String(data.status)),
    coverLetter: (data.cover_letter as string | null) ?? null,
    createdAt: String(data.created_at),
    assignedToId: (data.assigned_to as string | null) ?? null,
    candidateUserId: String(data.candidate_id),
    job: job
      ? {
          id: String(job.id),
          slug: String(job.slug),
          title: String(job.title),
          location: (job.location as string | null) ?? null,
          employmentType: (job.employment_type as string | null) ?? null,
          description: String(job.description ?? ""),
          postedById: String(job.created_by),
        }
      : { id: "", slug: "", title: "", location: null, employmentType: null, description: "", postedById: "" },
    candidate: {
      id: String(data.candidate_id),
      name: profile?.full_name ?? null,
      email: profile?.email ?? null,
      candidateProfile: candidateProfile
        ? {
            headline: (candidateProfile.title as string | null) ?? null,
            location: (candidateProfile.location as string | null) ?? null,
            resumeFile,
            experiences: parseExperiences(candidateProfile.experience),
          }
        : null,
    },
    messages: (messages ?? []).map((message) => {
      const sender = senderMap.get(String(message.sender_id));
      return {
        id: String(message.id),
        body: String(message.body),
        createdAt: String(message.created_at),
        sender: {
          id: String(message.sender_id),
          name: sender?.full_name ?? null,
          role: toAppRole(sender?.role) ?? "CANDIDATE",
        },
      };
    }),
  };
}

export async function listApplications(filters?: { status?: ApplicationStatus; jobId?: string }) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("applications")
    .select("*, jobs(id, title, slug), messages(count)")
    .order("updated_at", { ascending: false });
  if (filters?.jobId) query = query.eq("job_id", filters.jobId);
  if (filters?.status) {
    const { toDbApplicationStatus } = await import("@/lib/supabase/mappers");
    query = query.eq("status", toDbApplicationStatus(filters.status));
  }
  const { data } = await query;
  const rows = data ?? [];
  const candidateIds = [...new Set(rows.map((row) => String(row.candidate_id)))];
  const { data: profiles } = candidateIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", candidateIds)
    : { data: [] };
  const { data: candidateProfiles } = candidateIds.length
    ? await supabase.from("candidate_profiles").select("user_id, title, location").in("user_id", candidateIds)
    : { data: [] };
  const profileMap = new Map((profiles ?? []).map((item) => [item.id, item]));
  const cpMap = new Map((candidateProfiles ?? []).map((item) => [item.user_id, item]));

  return rows.map((row) => {
    const job = firstRecord(row.jobs);
    const profile = profileMap.get(String(row.candidate_id));
    const cp = cpMap.get(String(row.candidate_id));
    const countRow = Array.isArray(row.messages) ? row.messages[0] : row.messages;
    return {
      id: String(row.id),
      status: toAppApplicationStatus(String(row.status)),
      createdAt: String(row.created_at),
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
      _count: { messages: (countRow as { count?: number } | null)?.count ?? 0 },
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

export async function getMessageThreadsForUser(userId: string, role: string) {
  const { getMessageThreads } = await import("@/server/queries/messages");
  return getMessageThreads(userId, role === "EMPLOYEE" ? "EMPLOYEE" : "CANDIDATE");
}
