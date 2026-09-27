import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { filenameFromPath, firstRecord, parseExperiences, toAppApplicationStatus } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function signResume(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http")) return { url: path, filename: filenameFromPath(path) };
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 60);
  return data?.signedUrl ? { url: data.signedUrl, filename: filenameFromPath(path) } : { url: path, filename: filenameFromPath(path) };
}

export async function getEmployeeProfile(userId: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (!profile) return null;
  const { data: employeeProfile } = await supabase
    .from("employee_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    id: profile.id as string,
    name: (profile.full_name as string | null) ?? null,
    email: profile.email as string,
    employeeProfile: employeeProfile
      ? {
          title: (employeeProfile.job_title as string | null) ?? null,
          bio: (employeeProfile.bio as string | null) ?? null,
          phone: (employeeProfile.phone as string | null) ?? null,
          linkedIn: (employeeProfile.linkedin_url as string | null) ?? null,
          department: (employeeProfile.department as string | null) ?? null,
        }
      : null,
  };
}

export async function getCandidateProfile(userId: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (!profile) return null;
  const { data: candidateProfile } = await supabase
    .from("candidate_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  const resumeFile = await signResume(candidateProfile?.resume_url as string | null);
  return {
    id: profile.id as string,
    name: (profile.full_name as string | null) ?? null,
    email: profile.email as string,
    candidateProfile: candidateProfile
      ? {
          headline: (candidateProfile.title as string | null) ?? null,
          bio: (candidateProfile.bio as string | null) ?? null,
          location: (candidateProfile.location as string | null) ?? null,
          phone: (candidateProfile.phone as string | null) ?? null,
          linkedIn: (candidateProfile.linkedin_url as string | null) ?? null,
          website: (candidateProfile.website as string | null) ?? null,
          portfolioUrl: (candidateProfile.portfolio_url as string | null) ?? null,
          skills: (candidateProfile.skills as string[] | null) ?? [],
          experiences: parseExperiences(candidateProfile.experience),
          resumeFile,
        }
      : null,
  };
}

export async function getCandidateForReview(userId: string) {
  const record = await getCandidateProfile(userId);
  if (!record) return null;
  const supabase = await createServerSupabaseClient();
  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, created_at, jobs(id, title, slug)")
    .eq("candidate_id", userId)
    .order("created_at", { ascending: false });
  return {
    ...record,
    applications: (applications ?? []).map((row) => {
      const job = firstRecord(row.jobs);
      return {
        id: String(row.id),
        status: toAppApplicationStatus(String(row.status)),
        createdAt: String(row.created_at),
        job: { id: String(job?.id ?? ""), title: String(job?.title ?? ""), slug: String(job?.slug ?? "") },
      };
    }),
  };
}
