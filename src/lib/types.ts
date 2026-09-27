export type Role = "CANDIDATE" | "EMPLOYEE";
export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED";
export type ApplicationStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFER"
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
