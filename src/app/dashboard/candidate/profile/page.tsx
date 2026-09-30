import { CandidateProfileEditor } from "@/components/dashboard/candidate/candidate-profile-editor";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { CandidateProfileForm } from "@/lib/types";
import { requireRole } from "@/server/authorization";
import { getCandidateProfile } from "@/server/queries/profiles";

export default async function CandidateProfilePage() {
  const user = await requireRole("CANDIDATE");
  const record = await getCandidateProfile(user.id);
  const profile = record?.candidateProfile;
  const initial: CandidateProfileForm = {
    name: record?.name ?? "",
    headline: profile?.headline ?? "",
    location: profile?.location ?? "",
    phone: profile?.phone ?? "",
    bio: profile?.bio ?? "",
    skills: profile?.skills ?? [],
    experiences: profile?.experiences ?? [],
    education: profile?.education ?? [],
    linkedIn: profile?.linkedIn ?? "",
    github: profile?.github ?? "",
    portfolioUrl: profile?.portfolioUrl ?? "",
    visibility: profile?.visibility ?? "recruiters",
  };

  return (
    <CandidateProfileEditor
      email={record?.email ?? user.email}
      initial={initial}
      draft={profile?.draft ?? null}
      resume={profile?.resumeFile ?? null}
      storageReady={isSupabaseConfigured()}
    />
  );
}
