import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { filenameFromPath, firstRecord, parseExperiences, toAppApplicationStatus, toAppJobStatus, toAppRole } from "@/lib/supabase/mappers";
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
    status: toAppApplicationStatus(String(data.current_stage ?? data.status)),
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

  const ids = rows.map((row) => String(row.id));
  const [{ data: history }, { data: messages }] = await Promise.all([
    supabase
      .from("application_stage_history")
      .select("id, application_id, from_stage, to_stage, candidate_visible_label, candidate_visible_message, changed_at")
      .in("application_id", ids)
      .order("changed_at", { ascending: true }),
    supabase
      .from("messages")
      .select("id, application_id, body, created_at, sender_id")
      .in("application_id", ids)
      .order("created_at", { ascending: true }),
  ]);

  const senderIds = [...new Set((messages ?? []).map((item) => String(item.sender_id)))];
  const { data: senders } = senderIds.length
    ? await supabase.from("profiles").select("id, full_name").in("id", senderIds)
    : { data: [] };
  const senderMap = new Map((senders ?? []).map((item) => [item.id, item.full_name as string | null]));

  const interviewPairs = await Promise.all(
    ids.map(async (id) => {
      const { data: interviews } = await supabase.rpc("list_my_interviews", { target_application_id: id });
      return [id, (interviews ?? []) as Array<Record<string, unknown>>] as const;
    }),
  );
  const interviewMap = new Map(interviewPairs);

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
      const id = String(row.id);
      const job = firstRecord(row.jobs);
      return {
        id,
        status: toAppApplicationStatus(String(row.current_stage ?? row.status)),
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
        history: (history ?? [])
          .filter((item) => String(item.application_id) === id)
          .map((item) => ({
            id: String(item.id),
            fromStage: (item.from_stage as string | null) ?? null,
            toStage: String(item.to_stage),
            label: String(item.candidate_visible_label),
            message: (item.candidate_visible_message as string | null) ?? null,
            changedAt: String(item.changed_at),
          })),
        interviews: (interviewMap.get(id) ?? []).map((item) => ({
          id: String(item.id),
          interviewType: String(item.interview_type ?? "video"),
          scheduledAt: String(item.scheduled_at),
          scheduledEnd: (item.scheduled_end as string | null) ?? null,
          timezone: (item.timezone as string | null) ?? null,
          meetingLocation: (item.meeting_location as string | null) ?? null,
          meetingUrl: (item.meeting_url as string | null) ?? null,
          instructions: (item.candidate_instructions as string | null) ?? null,
          status: String(item.status ?? "scheduled"),
        })),
        messages: (messages ?? [])
          .filter((item) => String(item.application_id) === id)
          .map((item) => ({
            id: String(item.id),
            body: String(item.body),
            createdAt: String(item.created_at),
            senderName: senderMap.get(String(item.sender_id)) ?? null,
          })),
      };
    }),
  );
}

export async function getCandidateApplications(candidateUserId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("applications")
    .select("*, jobs(id, slug, title, location, department, employment_type, workplace_type, status), messages(count)")
    .eq("candidate_id", candidateUserId)
    .order("updated_at", { ascending: false });

  return (data ?? []).map((row) => {
    const job = firstRecord(row.jobs);
    const countRow = Array.isArray(row.messages) ? row.messages[0] : row.messages;
    return {
      id: String(row.id),
      status: toAppApplicationStatus(String(row.current_stage ?? row.status)),
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
  const { data: history } = await supabase
    .from("application_stage_history")
    .select("id, from_stage, to_stage, candidate_visible_label, candidate_visible_message, changed_at")
    .eq("application_id", applicationId)
    .order("changed_at", { ascending: true });
  const interviewSelect =
    "id, interview_type, scheduled_at, scheduled_end, timezone, meeting_location, meeting_url, candidate_instructions, status";
  const interviewQuery =
    role === "CANDIDATE"
      ? await supabase.rpc("list_my_interviews", { target_application_id: applicationId })
      : await supabase
          .from("interviews")
          .select(interviewSelect)
          .eq("application_id", applicationId)
          .order("scheduled_at", { ascending: true });
  const fallbackInterviews =
    interviewQuery.error && role !== "CANDIDATE"
      ? await supabase
          .from("interviews")
          .select("id, interview_type, scheduled_at, meeting_url, status")
          .eq("application_id", applicationId)
          .order("scheduled_at", { ascending: true })
      : null;
  const interviewRows = ((fallbackInterviews?.data ?? interviewQuery.data ?? []) as Array<Record<string, unknown>>);

  return {
    id: String(data.id),
    status: toAppApplicationStatus(String(data.current_stage ?? data.status)),
    coverLetter: (data.cover_letter as string | null) ?? null,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at),
    resumeUrl: resumeFile,
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
    history: (history ?? []).map((item) => ({
      id: String(item.id),
      fromStage: (item.from_stage as string | null) ?? null,
      toStage: String(item.to_stage),
      label: String(item.candidate_visible_label),
      message: (item.candidate_visible_message as string | null) ?? null,
      changedAt: String(item.changed_at),
    })),
    interviews: interviewRows.map((row) => ({
      id: String(row.id),
      interviewType: String(row.interview_type ?? "video"),
      scheduledAt: String(row.scheduled_at),
      scheduledEnd: (row.scheduled_end as string | null) ?? null,
      timezone: (row.timezone as string | null) ?? null,
      meetingLocation: (row.meeting_location as string | null) ?? null,
      meetingUrl: (row.meeting_url as string | null) ?? null,
      instructions: (row.candidate_instructions as string | null) ?? null,
      status: String(row.status ?? "scheduled"),
    })),
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
      status: toAppApplicationStatus(String(row.current_stage ?? row.status)),
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
