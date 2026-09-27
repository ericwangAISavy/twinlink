import type { ApplicationStatus, ExperienceItem, JobStatus, Role } from "@/lib/types";

export function toAppRole(value: string | null | undefined): Role {
  return value === "employee" ? "EMPLOYEE" : "CANDIDATE";
}

export function toDbRole(value: Role) {
  return value === "EMPLOYEE" ? "employee" : "candidate";
}

export function toAppJobStatus(value: string | null | undefined): JobStatus {
  if (value === "published") return "PUBLISHED";
  if (value === "closed") return "CLOSED";
  return "DRAFT";
}

export function toDbJobStatus(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "published") return "published";
  if (normalized === "closed") return "closed";
  return "draft";
}

const APPLICATION_STATUS_FROM_DB: Record<string, ApplicationStatus> = {
  submitted: "SUBMITTED",
  under_review: "REVIEWING",
  interview: "INTERVIEW",
  accepted: "OFFER",
  rejected: "REJECTED",
  withdrawn: "WITHDRAWN",
};

const APPLICATION_STATUS_TO_DB: Record<ApplicationStatus, string> = {
  SUBMITTED: "submitted",
  REVIEWING: "under_review",
  INTERVIEW: "interview",
  OFFER: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
};

export function toAppApplicationStatus(value: string | null | undefined): ApplicationStatus {
  return APPLICATION_STATUS_FROM_DB[value ?? ""] ?? "SUBMITTED";
}

export function toDbApplicationStatus(value: string) {
  if (value in APPLICATION_STATUS_TO_DB) {
    return APPLICATION_STATUS_TO_DB[value as ApplicationStatus];
  }
  return APPLICATION_STATUS_FROM_DB[value] ? value : "submitted";
}

export function parseExperiences(value: unknown): ExperienceItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (typeof row.id !== "string" || typeof row.title !== "string" || typeof row.company !== "string") {
        return null;
      }
      return {
        id: row.id,
        title: row.title,
        company: row.company,
        startDate: typeof row.startDate === "string" ? row.startDate : String(row.start_date ?? ""),
        endDate: typeof row.endDate === "string" ? row.endDate : row.end_date ? String(row.end_date) : null,
        current: Boolean(row.current),
        description: typeof row.description === "string" ? row.description : null,
      };
    })
    .filter((item): item is ExperienceItem => item !== null);
}

export function filenameFromPath(path: string | null | undefined) {
  if (!path) return "resume";
  return path.split("/").pop() || "resume";
}

export function firstRecord(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    const first = value[0];
    return first && typeof first === "object" ? (first as Record<string, unknown>) : null;
  }
  if (value && typeof value === "object") {
    return value as Record<string, unknown>;
  }
  return null;
}
