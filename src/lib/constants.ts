import { ALL_HIRING_STAGES, HIRING_STAGE_LABELS } from "@/lib/hiring-stages";
import type { ApplicationStatus, JobStatus, Role } from "@/lib/types";

export const APP_NAME = "TwinLink";

export const ROLES = {
  CANDIDATE: "CANDIDATE",
  EMPLOYEE: "EMPLOYEE",
  ADMIN: "ADMIN",
} as const satisfies Record<Role, Role>;

export const JOB_STATUSES = [
  "DRAFT",
  "PUBLISHED",
  "PAUSED",
  "CLOSED",
  "ARCHIVED",
] as const satisfies readonly JobStatus[];

export const APPLICATION_STATUSES = ALL_HIRING_STAGES satisfies readonly ApplicationStatus[];

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Contract",
  "Part-time",
  "Internship",
] as const;

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  PAUSED: "Paused",
  CLOSED: "Closed",
  ARCHIVED: "Archived",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = HIRING_STAGE_LABELS;

export const DEFAULT_COMPANY = {
  id: "singleton",
  name: "TwinLink",
  tagline: "Technology consulting that connects strategy to delivery.",
  intro:
    "TwinLink partners with ambitious organizations to design, build, and scale software that stands up in production. We bring senior practitioners—not slide decks—into the work of architecture, product engineering, and operating model design.",
  mission:
    "Help teams ship reliable software faster by pairing executive-level judgment with hands-on engineering.",
  vision:
    "A world where strategy and implementation move as one—where every digital investment is owned, measured, and built to last.",
  values: [
    {
      title: "Integrity",
      body: "We tell the truth about scope, risk, and trade-offs—even when it is inconvenient.",
    },
    {
      title: "Craft",
      body: "Code, architecture, and communication are treated as professional work, not commodities.",
    },
    {
      title: "Partnership",
      body: "We embed with your people. Success is measured by what your team can run after we leave.",
    },
    {
      title: "Clarity",
      body: "Decisions are documented. Priorities are visible. Status is never a surprise.",
    },
    {
      title: "Outcomes",
      body: "We optimize for production results—latency, reliability, adoption—not theater.",
    },
  ],
  capabilities: [
    {
      title: "Cloud & platform architecture",
      body: "Secure, observable platforms on modern cloud primitives, designed for the teams who operate them.",
    },
    {
      title: "Product engineering",
      body: "Full-stack delivery of customer-facing and internal products, from discovery through launch.",
    },
    {
      title: "Data platforms",
      body: "Reliable pipelines, warehouses, and analytics foundations that leadership can actually trust.",
    },
    {
      title: "AI enablement",
      body: "Practical applied AI: retrieval, workflow automation, and evaluation—not science projects.",
    },
    {
      title: "Delivery transformation",
      body: "Ways of working, quality systems, and DevEx that make the next release cheaper than the last.",
    },
    {
      title: "Due diligence & advisory",
      body: "Technical assessments for boards, buyers, and operators who need a clear read of risk.",
    },
  ],
  partnership:
    "TwinLink is built for engineering organizations that want a consulting partner who can sit in architecture reviews and also open a pull request. We staff small, senior pods that work inside your repos, your standups, and your incident channels. Knowledge transfer is not an afterthought—it is the engagement model.",
  benefits: [
    {
      title: "Senior-only delivery",
      body: "No bait-and-switch staffing. The people in the room are the people who do the work.",
    },
    {
      title: "Remote-first, timezone-aware",
      body: "Distributed collaboration with overlap that respects how modern teams actually ship.",
    },
    {
      title: "Learning as a practice",
      body: "Conference budget, certification support, and dedicated time to stay current.",
    },
    {
      title: "Meaningful equity of voice",
      body: "Consultants influence how we sell, staff, and quality-gate engagements.",
    },
  ],
  about:
    "TwinLink is a professional technology consulting firm. We work with product companies, operators, and public-interest organizations that need software they can trust—architected carefully, delivered in the open, and handed over cleanly.",
  website: "https://twinlink.example",
  email: "hello@twinlink.example",
  phone: "+1 (555) 010-2000",
  address: "Remote-first · United States",
} as const;

export type CompanyContent = {
  id: string;
  name: string;
  tagline: string | null;
  intro: string | null;
  mission: string | null;
  vision: string | null;
  values: { title: string; body: string }[];
  capabilities: { title: string; body: string }[];
  partnership: string | null;
  benefits: { title: string; body: string }[];
  about: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
};
