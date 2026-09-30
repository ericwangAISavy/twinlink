import { parseHiringStage } from "@/lib/hiring-stages";
import { toAppRole, toDbRole } from "@/lib/roles";
import type { ApplicationStatus, EducationItem, ExperienceItem, JobStatus } from "@/lib/types";

export { toAppRole, toDbRole };

export function toAppJobStatus(value: string | null | undefined): JobStatus {
  if (value === "published") return "PUBLISHED";
  if (value === "paused") return "PAUSED";
  if (value === "closed") return "CLOSED";
  if (value === "archived") return "ARCHIVED";
  return "DRAFT";
}

export function toDbJobStatus(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "published") return "published";
  if (normalized === "paused") return "paused";
  if (normalized === "closed") return "closed";
  if (normalized === "archived") return "archived";
  return "draft";
}

export function toAppApplicationStatus(value: string | null | undefined): ApplicationStatus {
  return parseHiringStage(value);
}

export function toDbApplicationStatus(value: string) {
  return parseHiringStage(value);
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
        location: typeof row.location === "string" ? row.location : null,
        startDate: typeof row.startDate === "string" ? row.startDate : String(row.start_date ?? ""),
        endDate: typeof row.endDate === "string" ? row.endDate : row.end_date ? String(row.end_date) : null,
        current: Boolean(row.current),
        description: typeof row.description === "string" ? row.description : null,
      };
    })
    .filter((item): item is ExperienceItem => item !== null);
}

export function parseEducation(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (typeof row.id !== "string" || typeof row.degree !== "string" || typeof row.school !== "string") return null;
      return {
        id: row.id,
        degree: row.degree,
        school: row.school,
        startDate: typeof row.startDate === "string" ? row.startDate : "",
        endDate: typeof row.endDate === "string" ? row.endDate : null,
        location: typeof row.location === "string" ? row.location : null,
      };
    })
    .filter((item): item is EducationItem => item !== null);
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
