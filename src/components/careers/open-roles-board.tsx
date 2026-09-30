"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  MapPin,
  Megaphone,
  PenLine,
  Rocket,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type OpenRole = {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  workplaceType: string | null;
  publishedAt: string | null;
};

const DEPARTMENTS = [
  "AI Engineering",
  "Product Engineering",
  "Platform",
  "Design",
  "Go-to-Market",
  "Operations",
  "People",
  "Other",
] as const;

const WORK_TYPES = ["Full-time", "Part-time", "Contract"] as const;
const LOCATION_GROUPS = [
  "China",
  "Hong Kong",
  "United States",
  "Canada",
  "United Kingdom",
  "Europe",
  "Singapore",
  "Japan",
  "India",
  "Australia",
  "Remote",
] as const;
const CHINA_FOCUS = "China";
const EXPERIENCE = ["Junior", "Mid-level", "Senior", "Staff", "Lead"] as const;
const PAGE_SIZE = 6;

function departmentOf(role: OpenRole) {
  const value = (role.department ?? "").toLowerCase();
  if (!value) return "Other";
  if (value.includes("ai") || value.includes("ml")) return "AI Engineering";
  if (value.includes("product")) return "Product Engineering";
  if (value.includes("platform")) return "Platform";
  if (value.includes("design")) return "Design";
  if (value.includes("market") || value.includes("gtm")) return "Go-to-Market";
  if (value.includes("operation")) return "Operations";
  if (value.includes("people") || value.includes("recruit") || value.includes("talent")) return "People";
  const match = DEPARTMENTS.find((item) => item.toLowerCase() === value);
  return match ?? (role.department?.trim() || "Other");
}

function workTypeOf(role: OpenRole) {
  const value = (role.employmentType ?? "").toLowerCase();
  if (value.includes("part")) return "Part-time";
  if (value.includes("contract") || value.includes("freelance")) return "Contract";
  if (value.includes("full")) return "Full-time";
  return role.employmentType?.trim() || "Full-time";
}

function workplaceOf(role: OpenRole) {
  const explicit = role.workplaceType?.trim();
  if (explicit) {
    const value = explicit.toLowerCase();
    if (value.includes("remote")) return "Remote";
    if (value.includes("hybrid")) return "Hybrid";
    if (value.includes("site") || value.includes("office")) return "On-site";
    return explicit;
  }
  if ((role.location ?? "").toLowerCase().includes("remote")) return "Remote";
  return null;
}

const US_STATES = new Set([
  "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me",
  "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa",
  "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy", "dc",
]);

function includesAny(value: string, needles: string[]) {
  return needles.some((needle) => value.includes(needle));
}

function hasToken(value: string, token: string) {
  return new RegExp(`(?:^|[^a-z])${token}(?:[^a-z]|$)`).test(value);
}

function locationGroup(role: OpenRole) {
  const value = (role.location ?? "").toLowerCase();
  if (!value) return "Other";
  if (includesAny(value, ["remote", "anywhere", "worldwide", "global", "flexible", "distributed"])) return "Remote";
  if (
    includesAny(value, [
      "china",
      "中国",
      "beijing",
      "北京",
      "shanghai",
      "上海",
      "shenzhen",
      "深圳",
      "guangzhou",
      "广州",
      "hangzhou",
      "杭州",
      "chengdu",
      "成都",
      "nanjing",
      "suzhou",
      "wuhan",
      "chongqing",
    ])
  ) {
    return "China";
  }
  if (includesAny(value, ["hong kong", "香港"])) return "Hong Kong";
  if (
    value.includes("canada") ||
    includesAny(value, ["toronto", "vancouver", "montreal", "ottawa", "calgary"]) ||
    /,\s*(bc|on|qc|ab|mb|sk|ns)\b/.test(value)
  ) {
    return "Canada";
  }
  if (
    includesAny(value, ["united kingdom", "england", "scotland", "wales", "london"]) ||
    hasToken(value, "uk")
  ) {
    return "United Kingdom";
  }
  if (
    includesAny(value, [
      "europe",
      "germany",
      "france",
      "netherlands",
      "ireland",
      "spain",
      "italy",
      "sweden",
      "switzerland",
      "poland",
      "berlin",
      "paris",
      "amsterdam",
      "dublin",
      "munich",
      "zurich",
    ])
  ) {
    return "Europe";
  }
  if (value.includes("singapore")) return "Singapore";
  if (includesAny(value, ["japan", "tokyo", "osaka"])) return "Japan";
  if (includesAny(value, ["india", "bangalore", "bengaluru", "mumbai", "hyderabad", "delhi"])) return "India";
  if (includesAny(value, ["australia", "sydney", "melbourne"])) return "Australia";
  if (value.includes("united states") || value.includes("usa") || value.includes("u.s.")) return "United States";
  const state = value.match(/,\s*([a-z]{2})\b/);
  if (state && US_STATES.has(state[1])) return "United States";
  return role.location?.trim() || "Other";
}

function experienceOf(role: OpenRole) {
  const title = role.title.toLowerCase();
  if (/\bstaff\b|\bprincipal\b/.test(title)) return "Staff";
  if (/\blead\b|\bhead\b|\bdirector\b/.test(title)) return "Lead";
  if (/\bsenior\b|\bsr\.?\b/.test(title)) return "Senior";
  if (/\bjunior\b|\bintern\b/.test(title)) return "Junior";
  if (/\bmid\b/.test(title)) return "Mid-level";
  return null;
}

function iconFor(department: string) {
  const value = department.toLowerCase();
  if (value.includes("ai") || value.includes("ml")) return Rocket;
  if (value.includes("design")) return PenLine;
  if (value.includes("people") || value.includes("recruit")) return Users;
  if (value.includes("market") || value.includes("gtm")) return Megaphone;
  return Code2;
}

function toggleValue(current: string[], value: string) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export function OpenRolesBoard({ roles }: { roles: OpenRole[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [locations, setLocations] = useState<string[]>([]);
  const [team, setTeam] = useState("all");
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [experience, setExperience] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const featuredId = useMemo(() => {
    const ranked = [...roles].sort(
      (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
    );
    return ranked[0]?.id ?? null;
  }, [roles]);

  const departments = useMemo(() => {
    const extra = roles
      .map(departmentOf)
      .filter((item) => !DEPARTMENTS.includes(item as (typeof DEPARTMENTS)[number]));
    return [...DEPARTMENTS, ...new Set(extra)];
  }, [roles]);

  const locationOptions = useMemo(() => {
    const extra = roles
      .map(locationGroup)
      .filter((item) => !LOCATION_GROUPS.includes(item as (typeof LOCATION_GROUPS)[number]) && item !== "Other");
    return [...LOCATION_GROUPS, ...new Set(extra)];
  }, [roles]);

  const teamOptions = useMemo(() => {
    return [...new Set(roles.map(workplaceOf).filter((item): item is string => Boolean(item)))];
  }, [roles]);

  const workTypeOptions = useMemo(() => {
    const extra = roles
      .map(workTypeOf)
      .filter((item) => !WORK_TYPES.includes(item as (typeof WORK_TYPES)[number]));
    return [...WORK_TYPES, ...new Set(extra)];
  }, [roles]);

  function baseMatch(role: OpenRole, skip?: "department" | "location" | "work") {
    const haystack = `${role.title} ${role.department ?? ""} ${role.location ?? ""}`.toLowerCase();
    if (query.trim() && !haystack.includes(query.trim().toLowerCase())) return false;
    if (team !== "all" && workplaceOf(role) !== team) return false;
    if (experience !== "all" && experienceOf(role) !== experience) return false;
    if (skip !== "department" && department !== "all" && departmentOf(role) !== department) return false;
    if (skip !== "location" && locations.length > 0 && !locations.includes(locationGroup(role))) return false;
    if (skip !== "work" && workTypes.length > 0 && !workTypes.includes(workTypeOf(role))) return false;
    return true;
  }

  const filtered = useMemo(() => {
    const list = roles.filter((role) => baseMatch(role));
    list.sort((a, b) => {
      const delta = new Date(a.publishedAt ?? 0).getTime() - new Date(b.publishedAt ?? 0).getTime();
      return sort === "newest" ? -delta : delta;
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, query, department, locations, team, workTypes, experience, sort]);

  const departmentCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const role of roles.filter((item) => baseMatch(item, "department"))) {
      const key = departmentOf(role);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, query, locations, team, workTypes, experience]);

  const workCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const role of roles.filter((item) => baseMatch(item, "work"))) {
      const key = workTypeOf(role);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, query, department, locations, team, experience]);

  const locationCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const role of roles.filter((item) => baseMatch(item, "location"))) {
      const key = locationGroup(role);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, query, department, workTypes, team, experience]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const allCount = roles.filter((role) => baseMatch(role, "department")).length;

  function setDepartmentFilter(value: string) {
    setDepartment(value);
    setPage(1);
  }

  const pages = pageList(currentPage, pageCount);

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-8 pt-8 md:pt-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <Image
            src="/images/careers-earth.jpg"
            alt=""
            fill
            priority
            quality={95}
            sizes="50vw"
            className="object-cover object-[62%_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11100e] via-[#11100e]/55 to-[#11100e]/10" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">Careers</p>
            <h1 className="mt-3 font-serif text-5xl text-white md:text-6xl">Open roles</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Join Twinlink and help build the next generation of AI infrastructure. Work with world-class people on
              ambitious problems that matter.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="teal" className="rounded-full">
                <Link href="/about#values">
                  View our values <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/about#culture">Life at Twinlink</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:text-right">
            <div className="relative mb-4 h-28 overflow-hidden rounded-2xl lg:hidden">
              <Image src="/images/careers-earth.jpg" alt="" fill className="object-cover object-[center_30%]" />
            </div>
            <p className="font-serif text-6xl leading-none text-[#e8d5a3] md:text-7xl">{roles.length}</p>
            <div className="mt-2 flex items-end justify-between gap-4 lg:justify-end">
              <p className="text-[#e8d5a3]">open roles</p>
              <p className="max-w-[11rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
                Global and flexible, with a focus on China
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(5,minmax(0,0.7fr))]">
            <label className="relative block">
              <span className="sr-only">Search roles</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search roles, keywords, or teams..."
                className="h-11 w-full rounded-xl border border-white/10 bg-[#171512] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c4a574]/60"
              />
            </label>
            <FilterSelect
              label="Department"
              value={department}
              onChange={setDepartmentFilter}
              options={[{ value: "all", label: "Department" }, ...departments.map((item) => ({ value: item, label: item }))]}
            />
            <FilterSelect
              label="Location"
              value={locations.length === 1 ? locations[0] : "all"}
              onChange={(value) => {
                setLocations(value === "all" ? [] : [value]);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Location" },
                ...locationOptions.map((item) => ({
                  value: item,
                  label: item === CHINA_FOCUS ? "China · hiring focus" : item,
                })),
              ]}
            />
            <FilterSelect
              label="Team"
              value={team}
              onChange={(value) => {
                setTeam(value);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Team" },
                ...teamOptions.map((item) => ({ value: item, label: item })),
              ]}
            />
            <FilterSelect
              label="Work type"
              value={workTypes.length === 1 ? workTypes[0] : "all"}
              onChange={(value) => {
                setWorkTypes(value === "all" ? [] : [value]);
                setPage(1);
              }}
              options={[{ value: "all", label: "Work type" }, ...workTypeOptions.map((item) => ({ value: item, label: item }))]}
            />
            <FilterSelect
              label="Experience level"
              value={experience}
              onChange={(value) => {
                setExperience(value);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Experience level" },
                ...EXPERIENCE.map((item) => ({ value: item, label: item })),
              ]}
            />
          </div>
          <div className="mt-3 flex justify-end">
            <FilterSelect
              label="Sort"
              value={sort}
              onChange={(value) => {
                setSort(value as "newest" | "oldest");
                setPage(1);
              }}
              options={[
                { value: "newest", label: "Newest first" },
                { value: "oldest", label: "Oldest first" },
              ]}
              className="w-full sm:w-44"
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <ul className="space-y-1 text-sm">
                <CountRow
                  label="All roles"
                  count={allCount}
                  active={department === "all"}
                  onClick={() => setDepartmentFilter("all")}
                />
                {departments.map((item) => (
                  <CountRow
                    key={item}
                    label={item}
                    count={departmentCounts.get(item) ?? 0}
                    active={department === item}
                    onClick={() => setDepartmentFilter(item)}
                  />
                ))}
              </ul>
              <FilterGroup title="Work type">
                {workTypeOptions.map((item) => (
                  <CheckRow
                    key={item}
                    label={item}
                    count={workCounts.get(item) ?? 0}
                    checked={workTypes.includes(item)}
                    onChange={() => {
                      setWorkTypes((current) => toggleValue(current, item));
                      setPage(1);
                    }}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="Location">
                <p className="px-3 pb-1 text-[11px] leading-snug text-[#e8d5a3]/80">
                  China is a hiring focus. Roles can be based in any region.
                </p>
                {locationOptions.map((item) => (
                  <CheckRow
                    key={item}
                    label={item}
                    count={locationCounts.get(item) ?? 0}
                    checked={locations.includes(item)}
                    accent={item === CHINA_FOCUS}
                    onChange={() => {
                      setLocations((current) => toggleValue(current, item));
                      setPage(1);
                    }}
                  />
                ))}
              </FilterGroup>
            </aside>

            <div>
              <p className="mb-3 text-sm text-white/45">{filtered.length} roles</p>
              {visible.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#171512] px-6 py-12 text-sm text-white/55">
                  No open roles match these filters. Clear a filter or check back when a new search is published.
                </div>
              ) : (
                <ul className="overflow-hidden rounded-2xl border border-white/10">
                  {visible.map((role) => {
                    const Icon = iconFor(departmentOf(role));
                    const workplace = workplaceOf(role);
                    return (
                      <li key={role.id} className="border-b border-white/10 bg-[#141210] last:border-b-0">
                        <div className="grid items-center gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_auto] sm:px-5">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#c4a574]/30 bg-[#1c1916] text-[#e8d5a3]">
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-medium text-white">{role.title}</p>
                                {role.id === featuredId ? (
                                  <span className="rounded-full bg-[#c4a574]/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#e8d5a3]">
                                    Featured
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-0.5 text-xs text-white/45">{departmentOf(role)}</p>
                            </div>
                          </div>
                          <p className="text-sm text-white/70">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-3.5 text-white/35" aria-hidden />
                              {role.location ?? "Location open"}
                            </span>
                            {locationGroup(role) === CHINA_FOCUS ? (
                              <span className="mt-1 inline-flex rounded-full bg-[#c4a574]/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#e8d5a3]">
                                China focus
                              </span>
                            ) : null}
                            {workplace ? <span className="mt-1 block text-xs text-white/40">{workplace}</span> : null}
                          </p>
                          <p className="text-sm text-white/70">
                            <span className="inline-flex items-center gap-1.5">
                              <Briefcase className="size-3.5 text-white/35" aria-hidden />
                              {workTypeOf(role)}
                            </span>
                            <span className="mt-1 block text-xs text-white/40">{departmentOf(role)}</span>
                          </p>
                          <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <p className="text-xs text-white/40">{formatRelativeTime(role.publishedAt)}</p>
                            <Link
                              href={`/careers/${role.slug}`}
                              className="inline-flex items-center gap-1 text-sm text-[#e8d5a3] hover:underline"
                            >
                              View role <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <PageButton
                    label="Previous page"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    <ChevronLeft className="size-4" />
                  </PageButton>
                  {pages.map((item, index) =>
                    item === "gap" ? (
                      <span key={`gap-${index}`} className="px-1 text-sm text-white/35">
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPage(item)}
                        aria-current={item === currentPage ? "page" : undefined}
                        className={cn(
                          "grid size-8 place-items-center rounded-full text-sm",
                          item === currentPage
                            ? "bg-[#c4a574] text-[#1c1916]"
                            : "text-white/70 hover:bg-white/10",
                        )}
                      >
                        {item}
                      </button>
                    ),
                  )}
                  <PageButton
                    label="Next page"
                    disabled={currentPage === pageCount}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    <ChevronRight className="size-4" />
                  </PageButton>
                </div>
                <p className="text-xs text-white/40">
                  {filtered.length === 0
                    ? "Showing 0 roles"
                    : `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} roles`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-[#171512] px-3 text-sm text-white/80 outline-none focus:border-[#c4a574]/60"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CountRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left",
          active ? "border-l-2 border-[#c4a574] bg-white/5 text-white" : "text-white/65 hover:bg-white/5",
        )}
      >
        <span>{label}</span>
        <span className="text-xs text-white/40">{count}</span>
      </button>
    </li>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{title}</p>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
  accent = false,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
  accent?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-sm hover:bg-white/5",
        accent ? "bg-[#c4a574]/10 text-[#e8d5a3]" : "text-white/70",
      )}
    >
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="size-3.5 accent-[#c4a574]"
        />
        {label}
        {accent ? (
          <span className="rounded-full bg-[#c4a574]/25 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#e8d5a3]">
            Focus
          </span>
        ) : null}
      </span>
      <span className={cn("text-xs", accent ? "text-[#e8d5a3]/70" : "text-white/35")}>{count}</span>
    </label>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function pageList(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages: Array<number | "gap"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("gap");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("gap");
  pages.push(total);
  return pages;
}
