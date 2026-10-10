import type { ApplicationStatus } from "@/lib/types";

export type CandidateBoardApplication = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  coverLetter: string | null;
  resume: { url: string; filename: string } | null;
  job: {
    id: string;
    slug: string;
    title: string;
    location: string | null;
    department: string | null;
    employmentType: string | null;
    workplaceType: string | null;
  };
};
