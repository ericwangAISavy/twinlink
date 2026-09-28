import type { Role } from "@/lib/roles";

export type { Role, UserRole } from "@/lib/roles";
export { homePath } from "@/lib/roles";
export type JobStatus = "DRAFT" | "PUBLISHED" | "PAUSED" | "CLOSED" | "ARCHIVED";
export type ApplicationStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "OFFER"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN";

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
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string | null;
};

