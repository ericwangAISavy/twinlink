"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Briefcase, CalendarDays, ChevronRight, ExternalLink, MapPin, MoreHorizontal } from "lucide-react";
import { withdrawApplication } from "@/server/actions/applications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_MESSAGES,
  isActiveApplicationStatus,
  isTerminalApplicationStatus,
} from "@/lib/constants";
import type { CandidateBoardApplication } from "@/lib/candidate-applications";
import { cn, formatDate } from "@/lib/utils";

type Bucket = "all" | "active" | "completed";
type SortKey = "newest" | "oldest" | "updated";

function inBucket(application: CandidateBoardApplication, bucket: Bucket) {
  if (bucket === "all") return true;
  if (bucket === "active") return isActiveApplicationStatus(application.status);
  return isTerminalApplicationStatus(application.status);
}

function metaLine(application: CandidateBoardApplication) {
  return [application.job.department, application.job.location, application.job.employmentType].filter(Boolean).join(" · ");
}

export function ApplicationsWorkspace({
  applications,
  initialId,
}: {
  applications: CandidateBoardApplication[];
  initialId: string | null;
  initialPanel?: string | null;
}) {
  const [bucket, setBucket] = useState<Bucket>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [selectedId, setSelectedId] = useState(initialId);

  const counts = useMemo(() => {
    return {
      all: applications.length,
      active: applications.filter((item) => inBucket(item, "active")).length,
      completed: applications.filter((item) => inBucket(item, "completed")).length,
    };
  }, [applications]);

  const visible = useMemo(() => {
    const list = applications.filter((item) => inBucket(item, bucket));
    list.sort((a, b) => {
      const left = new Date(sort === "updated" ? a.updatedAt : a.createdAt).getTime();
      const right = new Date(sort === "updated" ? b.updatedAt : b.createdAt).getTime();
      return sort === "oldest" ? left - right : right - left;
    });
    return list;
  }, [applications, bucket, sort]);

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

  if (applications.length === 0) {
    return (
      <div>
        <header>
          <h1 className="font-serif text-4xl tracking-tight text-[#1c1916]">My Applications</h1>
          <p className="mt-2 text-sm text-[#6f655b]">Track the status of your job applications.</p>
        </header>
        <div className="mt-8 rounded-2xl border border-[#eadfcd] bg-white px-6 py-12">
          <p className="font-serif text-2xl text-[#1c1916]">No applications yet</p>
          <p className="mt-2 max-w-lg text-sm text-[#6f655b]">When you apply to a published Twinlink role, it will appear here.</p>
          <Link href="/dashboard/candidate/jobs" className="mt-5 inline-flex text-sm text-[#8a6a32] hover:underline">
            Browse roles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-4xl tracking-tight text-[#1c1916]">My Applications</h1>
        <p className="mt-2 text-sm text-[#6f655b]">Track the status of your job applications.</p>
      </header>

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.9fr)]">
        <section className="rounded-2xl border border-[#eadfcd] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e7da] px-4 py-3">
            <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter applications">
              {(
                [
                  ["all", "All"],
                  ["active", "Active"],
                  ["completed", "Completed"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={bucket === key}
                  onClick={() => setBucket(key)}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]",
                    bucket === key ? "text-[#1c1916] shadow-[inset_0_-2px_0_#c4a574]" : "text-[#6f655b] hover:text-[#1c1916]",
                  )}
                >
                  {label} ({counts[key]})
                </button>
              ))}
            </div>
            <label className="text-sm text-[#6f655b]">
              <span className="sr-only">Sort applications</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-9 rounded-full border border-[#eadfcd] bg-white px-3 text-sm text-[#1c1916] outline-none focus:border-[#c4a574]"
              >
                <option value="newest">Sort by: Applied date</option>
                <option value="oldest">Sort by: Oldest applied</option>
                <option value="updated">Sort by: Last updated</option>
              </select>
            </label>
          </div>

          <div className="hidden grid-cols-[minmax(0,1.4fr)_7.5rem_8.5rem_7.5rem_1.5rem] gap-3 px-4 py-3 text-xs text-[#8d8274] sm:grid">
            <span>Position</span>
            <span>Applied date</span>
            <span>Status</span>
            <span>Last updated</span>
            <span className="sr-only">Open</span>
          </div>

          {visible.length === 0 ? (
            <p className="px-4 py-10 text-sm text-[#6f655b]">No applications in this view.</p>
          ) : (
            <ul className="max-h-[720px] overflow-auto">
              {visible.map((application) => {
                const active = selected?.id === application.id;
                const quiet = isTerminalApplicationStatus(application.status);
                return (
                  <li key={application.id} className="border-t border-[#f3ece2]">
                    <button
                      type="button"
                      onClick={() => setSelectedId(application.id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "grid w-full gap-2 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c4a574] sm:grid-cols-[minmax(0,1.4fr)_7.5rem_8.5rem_7.5rem_1.5rem] sm:items-center",
                        active ? "bg-[#f7f1e6]" : "hover:bg-[#fbf8f3]",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-[#1c1916]">{application.job.title}</span>
                        <span className="mt-0.5 block truncate text-xs text-[#8d8274]">{metaLine(application) || "Twinlink"}</span>
                      </span>
                      <span className="text-sm text-[#3f3832]">{formatDate(application.createdAt)}</span>
                      <span>
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs",
                            quiet ? "bg-[#eeeae4] text-[#6f655b]" : "bg-[#f3e6c8] text-[#6d5428]",
                          )}
                        >
                          {APPLICATION_STATUS_LABELS[application.status]}
                        </span>
                      </span>
                      <span className="text-sm text-[#3f3832]">{formatDate(application.updatedAt)}</span>
                      <ChevronRight className="hidden size-4 text-[#b7aa98] sm:block" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {selected ? (
          <ApplicationDetail application={selected} />
        ) : (
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 text-sm text-[#6f655b]">Select an application to see details.</section>
        )}
      </div>
    </div>
  );
}

function ApplicationDetail({ application }: { application: CandidateBoardApplication }) {
  const router = useRouter();
  const [withdrawing, startWithdraw] = useTransition();
  const canWithdraw = isActiveApplicationStatus(application.status);

  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-3xl tracking-tight text-[#1c1916]">{application.job.title}</h2>
        <div className="flex shrink-0 items-center gap-2">
          {application.job.slug ? (
            <Link
              href={`/careers/${application.job.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfcd] px-3 py-1.5 text-sm text-[#1c1916] hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
            >
              View job posting <ExternalLink className="size-3.5" aria-hidden />
            </Link>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Application actions"
              className="grid size-9 place-items-center rounded-full border border-[#eadfcd] text-[#1c1916] hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canWithdraw ? (
                <DropdownMenuItem
                  disabled={withdrawing}
                  onSelect={(event) => {
                    event.preventDefault();
                    if (!window.confirm("Withdraw this application?")) return;
                    startWithdraw(async () => {
                      const result = await withdrawApplication(application.id);
                      if (!result.ok) {
                        toast.error(result.error);
                        return;
                      }
                      toast.success(result.message);
                      router.refresh();
                    });
                  }}
                >
                  {withdrawing ? "Withdrawing…" : "Withdraw application"}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>No further actions</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6f655b]">
        {application.job.department ? (
          <li className="inline-flex items-center gap-1.5">
            <Briefcase className="size-3.5" aria-hidden /> {application.job.department}
          </li>
        ) : null}
        {application.job.location ? (
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden /> {application.job.location}
          </li>
        ) : null}
        {application.job.employmentType ? (
          <li className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden /> {application.job.employmentType}
          </li>
        ) : null}
      </ul>
      <p className="mt-2 text-sm text-[#8d8274]">Applied on {formatDate(application.createdAt)}</p>

      <div className="mt-5 rounded-2xl bg-[#f7f1e6] p-4">
        <p className="font-medium text-[#1c1916]">{APPLICATION_STATUS_LABELS[application.status]}</p>
        <p className="mt-1 text-sm text-[#6f655b]">{APPLICATION_STATUS_MESSAGES[application.status]}</p>
        <p className="mt-2 text-xs text-[#8d8274]">Updated {formatDate(application.updatedAt)}</p>
      </div>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-[#8d8274]">Resume submitted</dt>
          <dd className="mt-1">
            {application.resume ? (
              <a className="text-[#8a6a32] hover:underline" href={application.resume.url} target="_blank" rel="noreferrer">
                {application.resume.filename}
              </a>
            ) : (
              "No resume was attached"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[#8d8274]">Cover letter</dt>
          <dd className="mt-1 whitespace-pre-wrap text-[#3f3832]">{application.coverLetter || "No cover letter was included."}</dd>
        </div>
      </dl>
    </section>
  );
}
