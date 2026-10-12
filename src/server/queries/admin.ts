import "server-only";
import { siteOrigin } from "@/lib/site-url";

import { cache } from "react";
import { APPLICATION_STATUSES } from "@/lib/constants";
import { toAppApplicationStatus, toAppJobStatus } from "@/lib/supabase/mappers";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/lib/types";
import { listApplications } from "@/server/queries/applications";

export const getAdminOverview = cache(async () => {
  if (!isSupabaseConfigured()) {
    return emptyOverview();
  }
  const supabase = await createServerSupabaseClient();
  const now = new Date();
  const start30 = new Date(now);
  start30.setDate(now.getDate() - 29);
  start30.setHours(0, 0, 0, 0);

  const [
    { count: openJobs },
    { count: activeCandidates },
    { count: applications },
    { data: appRows },
    { data: activity },
    { data: recentJobRows },
    { data: latestAppRows },
  ] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("candidate_profiles").select("user_id", { count: "exact", head: true }),
    supabase.from("applications").select("id", { count: "exact", head: true }),
    supabase.from("applications").select("status, created_at, jobs(title, location)"),
    supabase
      .from("activity_logs")
      .select("id, action, entity_type, created_at, actor_id")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("jobs")
      .select("id, title, department, location, status, updated_at, applications(count)")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("applications")
      .select("id, status, created_at, candidate_id, jobs(title)")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const pipeline = emptyPipeline();
  for (const row of appRows ?? []) {
    const status = toAppApplicationStatus(String(row.status));
    if (status in pipeline) pipeline[status] += 1;
  }

  const days = Array.from({ length: 30 }, (_, index) => {
    const day = new Date(start30);
    day.setDate(start30.getDate() + index);
    const key = day.toISOString().slice(0, 10);
    return { key, label: `${day.getMonth() + 1}/${day.getDate()}`, count: 0 };
  });
  const dayMap = new Map(days.map((item) => [item.key, item]));
  for (const row of appRows ?? []) {
    const key = String(row.created_at).slice(0, 10);
    const bucket = dayMap.get(key);
    if (bucket) bucket.count += 1;
  }

  const actorIds = [...new Set((activity ?? []).map((item) => item.actor_id).filter(Boolean))] as string[];
  const latestCandidateIds = [...new Set((latestAppRows ?? []).map((item) => String(item.candidate_id)))];
  const profileIds = [...new Set([...actorIds, ...latestCandidateIds])];
  const { data: actors } = profileIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", profileIds)
    : { data: [] };
  const actorMap = new Map((actors ?? []).map((item) => [item.id, item]));
  const locationCounts = new Map<string, number>();
  const jobCounts = new Map<string, number>();
  for (const row of appRows ?? []) {
    const job = Array.isArray(row.jobs) ? row.jobs[0] : row.jobs;
    const location = ((job as { location?: string | null } | null)?.location ?? "").trim() || "Unspecified";
    locationCounts.set(location, (locationCounts.get(location) ?? 0) + 1);
    const title = (job as { title?: string } | null)?.title ?? "Unknown";
    jobCounts.set(title, (jobCounts.get(title) ?? 0) + 1);
  }

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return {
      key,
      label: date.toLocaleString("en-US", { month: "short" }),
      count: 0,
    };
  });
  const monthMap = new Map(months.map((item) => [item.key, item]));
  for (const row of appRows ?? []) {
    const key = String(row.created_at).slice(0, 7);
    const bucket = monthMap.get(key);
    if (bucket) bucket.count += 1;
  }

  return {
    openJobs: openJobs ?? 0,
    activeCandidates: activeCandidates ?? 0,
    applications: applications ?? 0,
    pipeline,
    trend: days,
    monthlyTrend: months,
    recentJobs: (recentJobRows ?? []).map((row) => {
      const countRow = Array.isArray(row.applications) ? row.applications[0] : row.applications;
      return {
        id: String(row.id),
        title: String(row.title),
        department: (row.department as string | null) ?? "—",
        location: (row.location as string | null) ?? "—",
        status: toAppJobStatus(String(row.status)),
        updatedAt: String(row.updated_at),
        applications: (countRow as { count?: number } | null)?.count ?? 0,
      };
    }),
    latestApplications: (latestAppRows ?? []).map((row) => {
      const job = Array.isArray(row.jobs) ? row.jobs[0] : row.jobs;
      const person = actorMap.get(String(row.candidate_id));
      return {
        id: String(row.id),
        status: toAppApplicationStatus(String(row.status)),
        createdAt: String(row.created_at),
        candidateName: person?.full_name ?? person?.email ?? "Candidate",
        jobTitle: (job as { title?: string } | null)?.title ?? "Unknown role",
      };
    }),
    locations: [...locationCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    byJob: [...jobCounts.entries()]
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count),
    activity: (activity ?? []).map((item) => ({
      id: String(item.id),
      action: String(item.action),
      entityType: (item.entity_type as string | null) ?? null,
      createdAt: String(item.created_at),
      actor: actorMap.get(String(item.actor_id))?.full_name ?? actorMap.get(String(item.actor_id))?.email ?? "System",
    })),
  };
});

function emptyOverview() {
  return {
    openJobs: 0,
    activeCandidates: 0,
    applications: 0,
    pipeline: emptyPipeline(),
    trend: [] as { key: string; label: string; count: number }[],
    monthlyTrend: [] as { key: string; label: string; count: number }[],
    recentJobs: [] as {
      id: string;
      title: string;
      department: string;
      location: string;
      status: ReturnType<typeof toAppJobStatus>;
      updatedAt: string;
      applications: number;
    }[],
    latestApplications: [] as {
      id: string;
      status: ApplicationStatus;
      createdAt: string;
      candidateName: string;
      jobTitle: string;
    }[],
    locations: [] as { label: string; count: number }[],
    byJob: [] as { title: string; count: number }[],
    activity: [] as AdminActivity[],
  };
}

function emptyPipeline(): Record<ApplicationStatus, number> {
  return Object.fromEntries(APPLICATION_STATUSES.map((status) => [status, 0])) as Record<ApplicationStatus, number>;
}

export type AdminActivity = {
  id: string;
  action: string;
  entityType: string | null;
  createdAt: string;
  actor: string;
};

export async function logActivity(input: {
  actorId: string;
  action: string;
  entityType?: string;
  entityId?: string;
}) {
  if (!isSupabaseConfigured()) return;
  const supabase = await createServerSupabaseClient();
  await supabase.from("activity_logs").insert({
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType ?? null,
    entity_id: input.entityId ?? null,
  });
}

export { toAppJobStatus };

export async function getAdminJobs() {
  const { getEmployeeJobs } = await import("@/server/queries/jobs");
  return getEmployeeJobs();
}

export async function getAdminJob(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("jobs").select("*").eq("id", id).maybeSingle();
  if (!data) return null;
  return {
    id: String(data.id),
    title: String(data.title),
    slug: String(data.slug),
    department: (data.department as string | null) ?? "",
    location: (data.location as string | null) ?? "",
    workplaceType: (data.workplace_type as string | null) ?? "",
    employmentType: (data.employment_type as string | null) ?? "",
    description: String(data.description ?? ""),
    responsibilities: (data.responsibilities as string | null) ?? "",
    requirements: (data.requirements as string | null) ?? "",
    preferredQualifications: (data.preferred_qualifications as string | null) ?? "",
    salaryMin: data.salary_min != null ? String(data.salary_min) : "",
    salaryMax: data.salary_max != null ? String(data.salary_max) : "",
    currency: (data.currency as string | null) ?? "USD",
    applicationDeadline: (data.application_deadline as string | null) ?? "",
    status: toAppJobStatus(String(data.status)),
    updatedAt: String(data.updated_at),
  };
}

export async function getAdminCandidates(query?: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data: profiles } = await supabase
    .from("candidate_profiles")
    .select("user_id, title, location, skills, resume_url");
  const ids = (profiles ?? []).map((item) => String(item.user_id));
  const [usersQuery, appsResult] = await Promise.all([
    ids.length
      ? supabase.from("profiles").select("id, email, full_name, role, created_at, updated_at, access_status").in("id", ids)
      : Promise.resolve({ data: [] as Record<string, unknown>[], error: null }),
    ids.length
      ? supabase.from("applications").select("id, candidate_id, status").in("candidate_id", ids)
      : Promise.resolve({ data: [] }),
  ]);
  const users = usersQuery.error
    ? (
        await supabase.from("profiles").select("id, email, full_name, role, created_at, updated_at").in("id", ids)
      ).data
    : usersQuery.data;
  const apps = appsResult.data;
  const userMap = new Map((users ?? []).map((item) => [item.id, item]));
  const rows = (profiles ?? []).map((profile) => {
    const user = userMap.get(String(profile.user_id));
    const related = (apps ?? []).filter((item) => item.candidate_id === profile.user_id);
    if (user && "role" in user && user.role && user.role !== "candidate") return null;
    return {
      id: String(profile.user_id),
      name: user?.full_name ?? null,
      email: user?.email ?? "",
      headline: (profile.title as string | null) ?? null,
      location: (profile.location as string | null) ?? null,
      skills: (profile.skills as string[]) ?? [],
      applications: related.length,
      updatedAt: String(user?.updated_at ?? user?.created_at ?? ""),
      accessStatus: user && "access_status" in user && user.access_status === "approved" ? "approved" as const : "pending" as const,
    };
  }).filter((row): row is NonNullable<typeof row> => row !== null);
  rows.sort((a, b) => Number(a.accessStatus === "approved") - Number(b.accessStatus === "approved"));
  const q = query?.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (row) =>
      row.name?.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.headline?.toLowerCase().includes(q) ||
      row.skills.some((skill) => skill.toLowerCase().includes(q)),
  );
}

export async function getAdminEmployees() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data: profiles } = await supabase.from("profiles").select("id, email, full_name, role, created_at").in("role", ["employee", "admin"]);
  const ids = (profiles ?? []).map((item) => item.id);
  const { data: employees } = ids.length
    ? await supabase.from("employee_profiles").select("user_id, job_title, department, status").in("user_id", ids)
    : { data: [] };
  const empMap = new Map((employees ?? []).map((item) => [item.user_id, item]));
  return (profiles ?? []).map((profile) => {
    const emp = empMap.get(profile.id);
    return {
      id: String(profile.id),
      name: profile.full_name,
      email: profile.email,
      role: profile.role,
      jobTitle: emp?.job_title ?? null,
      department: emp?.department ?? null,
      status: emp?.status ?? "active",
      createdAt: String(profile.created_at),
    };
  });
}

export async function getAdminUsers() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("profiles").select("id, email, full_name, role, created_at").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminInvites() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("employee_invites").select("*").order("created_at", { ascending: false });
  const base = siteOrigin();
  return (data ?? []).map((invite) => ({
    id: String(invite.id),
    email: String(invite.email),
    name: (invite.full_name as string | null) ?? null,
    jobTitle: (invite.job_title as string | null) ?? null,
    department: (invite.department as string | null) ?? null,
    role: String(invite.role ?? "employee"),
    usedAt: invite.used_at ? String(invite.used_at) : null,
    expiresAt: String(invite.expires_at),
    createdAt: String(invite.created_at),
    inviteUrl: invite.used_at ? null : `${base}/register?invite=${String(invite.token ?? "")}`,
  }));
}

export async function getAdminActivity(limit = 50) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(limit);
  const rows = data ?? [];
  const actorIds = [...new Set(rows.map((item) => item.actor_id).filter(Boolean))] as string[];
  const { data: actors } = actorIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", actorIds)
    : { data: [] };
  const actorMap = new Map((actors ?? []).map((item) => [item.id, item]));
  return rows.map((item) => ({
    id: String(item.id),
    action: String(item.action),
    entityType: (item.entity_type as string | null) ?? null,
    entityId: (item.entity_id as string | null) ?? null,
    createdAt: String(item.created_at),
    actor: actorMap.get(String(item.actor_id))?.full_name ?? actorMap.get(String(item.actor_id))?.email ?? "System",
  }));
}

export async function getApplicationInternals(applicationId: string) {
  if (!isSupabaseConfigured()) {
    return { notes: [] as AdminNote[], events: [] as AdminEvent[] };
  }
  const supabase = await createServerSupabaseClient();
  const [{ data: notes }, { data: events }] = await Promise.all([
    supabase.from("application_notes").select("*").eq("application_id", applicationId).order("created_at", { ascending: false }),
    supabase.from("application_events").select("*").eq("application_id", applicationId).order("created_at", { ascending: false }),
  ]);
  const authorIds = [
    ...new Set([
      ...(notes ?? []).map((item) => item.author_id),
      ...(events ?? []).map((item) => item.actor_id),
    ].filter(Boolean)),
  ] as string[];
  const { data: authors } = authorIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", authorIds)
    : { data: [] };
  const authorMap = new Map((authors ?? []).map((item) => [item.id, item]));
  return {
    notes: (notes ?? []).map((note) => ({
      id: String(note.id),
      body: String(note.body),
      createdAt: String(note.created_at),
      author: authorMap.get(String(note.author_id))?.full_name ?? authorMap.get(String(note.author_id))?.email ?? "Admin",
    })),
    events: (events ?? []).map((event) => ({
      id: String(event.id),
      fromStatus: (event.from_status as string | null) ?? null,
      toStatus: (event.to_status as string | null) ?? null,
      createdAt: String(event.created_at),
      actor: event.actor_id
        ? authorMap.get(String(event.actor_id))?.full_name ?? authorMap.get(String(event.actor_id))?.email ?? "Admin"
        : "System",
    })),
  };
}

export type AdminNote = { id: string; body: string; createdAt: string; author: string };
export type AdminEvent = { id: string; fromStatus: string | null; toStatus: string | null; createdAt: string; actor: string };

export async function getAdminEmployee(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const [{ data: profile }, { data: employee }] = await Promise.all([
    supabase.from("profiles").select("id, email, full_name, role, created_at").eq("id", id).maybeSingle(),
    supabase.from("employee_profiles").select("user_id, job_title, department, status").eq("user_id", id).maybeSingle(),
  ]);
  if (!profile || (profile.role !== "employee" && profile.role !== "admin")) return null;
  return {
    id: String(profile.id),
    name: profile.full_name,
    email: profile.email,
    role: profile.role,
    jobTitle: employee?.job_title ?? null,
    department: employee?.department ?? null,
    status: employee?.status ?? "active",
    createdAt: String(profile.created_at),
  };
}

export async function getAdminContent() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const defaults = [
    { key: "homepage_announcement", title: "Homepage announcement", body: "" },
    { key: "careers_intro", title: "Careers intro", body: "" },
    { key: "featured_jobs", title: "Featured jobs", body: "" },
    { key: "company_statistics", title: "Company statistics", body: "" },
    { key: "case_studies", title: "Case studies", body: "" },
    { key: "resources_intro", title: "Resources", body: "" },
  ];
  await supabase.from("company_content").upsert(defaults, { onConflict: "key", ignoreDuplicates: true });
  const { data: seeded } = await supabase.from("company_content").select("*").order("key");
  return seeded ?? [];
}

export async function searchAdmin(query: string) {
  const q = query.trim();
  if (!q || !isSupabaseConfigured()) {
    return { jobs: [] as { id: string; title: string }[], candidates: [] as { id: string; name: string | null; email: string }[], applications: [] as { id: string; label: string }[], employees: [] as { id: string; name: string | null; email: string }[] };
  }
  const needle = q.toLowerCase();
  const [jobs, candidates, applications, employees] = await Promise.all([
    getAdminJobs(),
    getAdminCandidates(q),
    listApplications(),
    getAdminEmployees(),
  ]);
  return {
    jobs: jobs
      .filter((job) => job.title.toLowerCase().includes(needle) || (job.location ?? "").toLowerCase().includes(needle) || (job.department ?? "").toLowerCase().includes(needle))
      .slice(0, 8)
      .map((job) => ({ id: job.id, title: job.title })),
    candidates: candidates.slice(0, 8).map((item) => ({ id: item.id, name: item.name, email: item.email })),
    applications: applications
      .filter(
        (item) =>
          item.job.title.toLowerCase().includes(needle) ||
          (item.candidate.name ?? "").toLowerCase().includes(needle) ||
          (item.candidate.email ?? "").toLowerCase().includes(needle),
      )
      .slice(0, 8)
      .map((item) => ({
        id: item.id,
        label: `${item.candidate.name ?? item.candidate.email ?? "Candidate"} · ${item.job.title}`,
      })),
    employees: employees
      .filter(
        (item) =>
          (item.name ?? "").toLowerCase().includes(needle) ||
          item.email.toLowerCase().includes(needle) ||
          (item.jobTitle ?? "").toLowerCase().includes(needle),
      )
      .slice(0, 8)
      .map((item) => ({ id: item.id, name: item.name, email: item.email })),
  };
}

export async function getAdminResources() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminAnalytics() {
  const overview = await getAdminOverview();
  return { ...overview, byJob: overview.byJob };
}
