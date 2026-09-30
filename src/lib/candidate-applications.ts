import type { HiringStage } from "@/lib/hiring-stages";

export type CandidateBoardApplication = {
  id: string;
  status: HiringStage;
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
  history: {
    id: string;
    fromStage: string | null;
    toStage: string;
    label: string;
    message: string | null;
    changedAt: string;
  }[];
  interviews: {
    id: string;
    interviewType: string;
    scheduledAt: string;
    scheduledEnd: string | null;
    timezone: string | null;
    meetingLocation: string | null;
    meetingUrl: string | null;
    instructions: string | null;
    status: string;
  }[];
  messages: {
    id: string;
    body: string;
    createdAt: string;
    senderName: string | null;
  }[];
};
