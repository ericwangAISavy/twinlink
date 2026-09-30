import type { HiringStage } from "@/lib/hiring-stages";
import type { Role } from "@/lib/roles";

export type { Role, UserRole } from "@/lib/roles";
export { homePath } from "@/lib/roles";

export type JobStatus = "DRAFT" | "PUBLISHED" | "PAUSED" | "CLOSED" | "ARCHIVED";
export type ApplicationStatus = HiringStage;

export type AppUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  image?: string | null;
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string | null;
};

export type EducationItem = {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
};

export type ProfileVisibility = "recruiters" | "private";

export type CandidateProfileForm = {
  name: string;
  headline: string;
  location: string;
  phone: string;
  bio: string;
  skills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  linkedIn: string;
  github: string;
  portfolioUrl: string;
  visibility: ProfileVisibility;
};

