import type { ExperienceItem } from "@/lib/types";

export type ProfileCompletionItem = {
  id: string;
  label: string;
  done: boolean;
  href: string;
};

export type CandidateProfileFields = {
  name: string | null;
  headline: string | null;
  skills: string[];
  experiences: ExperienceItem[];
  resumeUploaded: boolean;
  hasLinks: boolean;
};

export function getProfileCompletion(fields: CandidateProfileFields) {
  const items: ProfileCompletionItem[] = [
    {
      id: "basic",
      label: "Add your name and headline",
      done: Boolean(fields.name?.trim() && fields.headline?.trim()),
      href: "/dashboard/candidate/profile",
    },
    {
      id: "resume",
      label: "Upload a resume",
      done: fields.resumeUploaded,
      href: "/dashboard/candidate/resume",
    },
    {
      id: "skills",
      label: "Add skills",
      done: fields.skills.length > 0,
      href: "/dashboard/candidate/profile",
    },
    {
      id: "experience",
      label: "Add experience",
      done: fields.experiences.length > 0,
      href: "/dashboard/candidate/profile",
    },
    {
      id: "links",
      label: "Add LinkedIn, website, or portfolio",
      done: fields.hasLinks,
      href: "/dashboard/candidate/profile",
    },
  ];
  const complete = items.filter((item) => item.done).length;
  const percent = Math.round((complete / items.length) * 100);
  return { items, complete, total: items.length, percent };
}
