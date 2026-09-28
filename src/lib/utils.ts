import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function uniqueSlug(value: string) {
  const base = slugify(value) || "role";
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: Date | string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function plural(count: number, unit: string) {
  return `${count} ${unit}${count === 1 ? "" : "s"} ago`;
}

export function formatRelativeTime(value: Date | string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return "just now";
  if (seconds < 90) return "1 minute ago";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return plural(minutes, "minute");

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return plural(hours, "hour");

  const days = Math.floor(hours / 24);
  if (days < 7) return plural(days, "day");

  const weeks = Math.floor(days / 7);
  if (weeks < 5 && days < 30) return plural(weeks, "week");

  const months = Math.floor(days / 30);
  if (months < 12) return plural(Math.max(1, months), "month");

  return plural(Math.max(1, Math.floor(days / 365)), "year");
}

export function formatMonthYear(value: Date | string | null | undefined) {
  if (!value) return "Present";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function initials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }
  return email?.[0]?.toUpperCase() ?? "T";
}

export function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(/[_\s-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
