"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { MessageForm } from "@/components/dashboard/message-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCandidateVisibleStage,
  getHiringStageOrder,
  isActiveStage,
  isTerminalStage,
  parseHiringStage,
  type HiringStage,
} from "@/lib/hiring-stages";
import type { CandidateBoardApplication } from "@/lib/candidate-applications";
import { cn, formatDate, formatDateTime } from "@/lib/utils";

const TRACK: { stage: HiringStage; label: string }[] = [
  { stage: "applied", label: "Applied" },
  { stage: "application_review", label: "Application Review" },
  { stage: "recruiter_screen", label: "Recruiter Screen" },
  { stage: "technical_interview", label: "Technical Interview" },
  { stage: "final_interview", label: "Final Interview" },
  { stage: "decision", label: "Decision" },
];

const CANDIDATE_LABEL: Record<HiringStage, string> = {
  applied: "Applied",
  application_review: "Application Review",
  recruiter_screen: "Recruiter Screen",
  technical_interview: "Technical Interview",
  final_interview: "Final Interview",
  decision: "Decision",
  offer: "Offer",
  hired: "Hired",
  rejected: "Not Selected",
  withdrawn: "Withdrawn",
  position_closed: "Position Closed",
};

const STATUS_TITLE: Record<HiringStage, string> = {
  applied: "Application submitted",
  application_review: "Application under review",
  recruiter_screen: "Recruiter screen",
  technical_interview: "Technical interview",
  final_interview: "Final interview",
  decision: "Decision in progress",
  offer: "Offer available",
  hired: "Hired",
  rejected: "Not selected",
  withdrawn: "Application withdrawn",
  position_closed: "Position closed",
};

const NEXT_STEP: Partial<Record<HiringStage, { title: string; body: string }>> = {
  applied: {
    title: "Application review",
    body: "A recruiter will review your application and experience.",
  },
  application_review: {
    title: "Recruiter screen",
    body: "Our recruiting team will reach out to you to schedule an initial conversation.",
  },
  recruiter_screen: {
    title: "Technical interview",
    body: "The next step is a technical conversation about the work.",
  },
  technical_interview: {
    title: "Final interview",
    body: "The hiring team will schedule a final conversation if you advance.",
  },
  final_interview: {
    title: "Decision",
    body: "The hiring team will make a decision after the final interview.",
  },
  decision: {
    title: "Offer",
    body: "If the decision is positive, Twinlink will share an offer.",
  },
  offer: {
    title: "Your response",
    body: "Review the offer details Twinlink shares with you.",
  },
};

type Bucket = "all" | "active" | "interviewing" | "offer" | "completed";
type Panel = "process" | "application" | "interviews" | "messages" | "activity";
type SortKey = "newest" | "oldest" | "updated";

function inBucket(stage: HiringStage, bucket: Bucket) {
  if (bucket === "all") return true;
  if (bucket === "active") return isActiveStage(stage) && stage !== "offer";
  if (bucket === "interviewing") return stage === "technical_interview" || stage === "final_interview";
  if (bucket === "offer") return stage === "offer";
  return isTerminalStage(stage) || stage === "hired";
}

function trackIndex(stage: HiringStage) {
  if (stage === "offer" || stage === "hired") return TRACK.length;
  return getHiringStageOrder(stage);
}

function shortDate(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value));
}

function metaLine(application: CandidateBoardApplication) {
  return [application.job.department, application.job.location, application.job.employmentType].filter(Boolean).join(" · ");
}

function activitySentence(stage: HiringStage, message: string | null) {
  if (message) return message;
  if (stage === "applied") return "You applied for this position.";
  return getCandidateVisibleStage(stage).message;
}

export function ApplicationsWorkspace({
  applications,
  initialId,
  withdrawAction,
}: {
  applications: CandidateBoardApplication[];
  initialId: string | null;
  withdrawAction: (formData: FormData) => Promise<void>;
}) {
  const [bucket, setBucket] = useState<Bucket>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [panel, setPanel] = useState<Panel>("process");
  const [selectedId, setSelectedId] = useState(initialId);

  const counts = useMemo(() => {
    return {
      all: applications.length,
      active: applications.filter((item) => inBucket(item.status, "active")).length,
      interviewing: applications.filter((item) => inBucket(item.status, "interviewing")).length,
      offer: applications.filter((item) => inBucket(item.status, "offer")).length,
      completed: applications.filter((item) => inBucket(item.status, "completed")).length,
    };
  }, [applications]);

  const visible = useMemo(() => {
    const list = applications.filter((item) => inBucket(item.status, bucket));
    list.sort((a, b) => {
      const left = new Date(sort === "updated" ? a.updatedAt : a.createdAt).getTime();
      const right = new Date(sort === "updated" ? b.updatedAt : b.createdAt).getTime();
      return sort === "oldest" ? left - right : right - left;
    });
    return list;
  }, [applications, bucket, sort]);

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

  function choose(id: string) {
    setSelectedId(id);
    setPanel("process");
  }

  if (applications.length === 0) {
    return (
      <div>
        <header>
          <h1 className="font-serif text-4xl tracking-tight text-[#1c1916]">My Applications</h1>
          <p className="mt-2 text-sm text-[#6f655b]">Track the status of your job applications and hiring process.</p>
        </header>
        <div className="mt-8 rounded-2xl border border-[#eadfcd] bg-white px-6 py-12">
          <p className="font-serif text-2xl text-[#1c1916]">No applications yet</p>
          <p className="mt-2 max-w-lg text-sm text-[#6f655b]">
            When you apply to a published Twinlink role, it will appear here with its real hiring stage.
          </p>
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
        <p className="mt-2 text-sm text-[#6f655b]">Track the status of your job applications and hiring process.</p>
      </header>

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.9fr)]">
        <section className="rounded-2xl border border-[#eadfcd] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e7da] px-4 py-3">
            <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter applications">
              {(
                [
                  ["all", "All"],
                  ["active", "Active"],
                  ["interviewing", "Interviewing"],
                  ["offer", "Offer"],
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
                const quiet = isTerminalStage(application.status) || application.status === "hired";
                return (
                  <li key={application.id} className="border-t border-[#f3ece2]">
                    <button
                      type="button"
                      onClick={() => choose(application.id)}
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
                          {CANDIDATE_LABEL[application.status]}
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
          <ApplicationDetail application={selected} panel={panel} onPanel={setPanel} withdrawAction={withdrawAction} />
        ) : (
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 text-sm text-[#6f655b]">
            Select an application to see its hiring progress.
          </section>
        )}
      </div>
    </div>
  );
}

function ApplicationDetail({
  application,
  panel,
  onPanel,
  withdrawAction,
}: {
  application: CandidateBoardApplication;
  panel: Panel;
  onPanel: (panel: Panel) => void;
  withdrawAction: (formData: FormData) => Promise<void>;
}) {
  const stage = application.status;
  const visible = getCandidateVisibleStage(stage);
  const next = NEXT_STEP[stage];
  const canWithdraw = isActiveStage(stage);
  const historyNewest = [...application.history].reverse();
  const reached = new Map<string, string>();
  for (const item of application.history) {
    if (!reached.has(item.toStage)) reached.set(item.toStage, item.changedAt);
  }
  if (!reached.has("applied")) reached.set("applied", application.createdAt);

  const currentIndex = trackIndex(stage);
  const terminal = isTerminalStage(stage);

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
                  onSelect={(event) => {
                    event.preventDefault();
                    if (window.confirm("Withdraw this application? The record and its history stay visible to you and Twinlink.")) {
                      const form = document.getElementById(`withdraw-${application.id}`) as HTMLFormElement | null;
                      form?.requestSubmit();
                    }
                  }}
                >
                  Withdraw application
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>No further actions</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {canWithdraw ? (
            <form id={`withdraw-${application.id}`} action={withdrawAction} className="hidden">
              <input type="hidden" name="applicationId" value={application.id} />
            </form>
          ) : null}
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

      <div className="mt-5 flex gap-4 overflow-auto border-b border-[#f0e7da]" role="tablist" aria-label="Application sections">
        {(
          [
            ["process", "Hiring process"],
            ["application", "Application"],
            ["interviews", "Interviews"],
            ["messages", "Messages"],
            ["activity", "Activity"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={panel === key}
            onClick={() => onPanel(key)}
            className={cn(
              "shrink-0 pb-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]",
              panel === key ? "text-[#1c1916] shadow-[inset_0_-2px_0_#c4a574]" : "text-[#6f655b]",
            )}
          >
            {label}
            {key === "interviews" && application.interviews.length ? ` (${application.interviews.length})` : ""}
            {key === "messages" && application.messages.length ? ` (${application.messages.length})` : ""}
          </button>
        ))}
      </div>

      <div className="mt-5" role="tabpanel">
        {panel === "process" ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#f0e7da] p-4">
              <h3 className="font-medium text-[#1c1916]">Hiring progress</h3>
              <p className="mt-1 text-sm text-[#6f655b]">Here&apos;s the current status of your application.</p>
              <ol className="mt-5 flex min-w-[520px] gap-1" aria-label="Hiring progress">
                {TRACK.map((step, index) => {
                  const reachedAt = reached.get(step.stage);
                  const complete = terminal ? Boolean(reachedAt) : currentIndex > index;
                  const current = !terminal && currentIndex === index;
                  return (
                    <li key={step.stage} className="flex-1" aria-current={current ? "step" : undefined}>
                      <div className="relative flex justify-center">
                        {index > 0 ? (
                          <span
                            className={cn(
                              "absolute right-1/2 top-3 h-px w-full",
                              complete || current ? "bg-[#c4a574]" : "bg-[#e6dfd4]",
                            )}
                          />
                        ) : null}
                        <span
                          className={cn(
                            "relative z-10 grid size-6 place-items-center rounded-full",
                            complete
                              ? "bg-[#c4a574] text-white"
                              : current
                                ? "border-2 border-[#c4a574] bg-white"
                                : "border border-[#e0d8cc] bg-white text-[#d9d0c4]",
                          )}
                        >
                          {complete || !current ? <Check className="size-3.5" aria-hidden /> : null}
                          <span className="sr-only">
                            {step.label} {complete ? "completed" : current ? "current stage" : "pending"}
                          </span>
                        </span>
                      </div>
                      <p className={cn("mt-2 text-center text-[11px] leading-tight", current || complete ? "text-[#1c1916]" : "text-[#b7aa98]")}>
                        {step.label}
                      </p>
                      <p className="mt-1 text-center text-[10px] text-[#8d8274]">{complete && reachedAt ? shortDate(reachedAt) : ""}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="rounded-2xl bg-[#f7f1e6] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-[#c4a574]">
                    <UserRound className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-[#1c1916]">{STATUS_TITLE[stage]}</p>
                    <p className="mt-1 text-sm text-[#6f655b]">{visible.message}</p>
                  </div>
                </div>
                <p className="shrink-0 text-xs text-[#8d8274]">Updated {formatDate(application.updatedAt)}</p>
              </div>
            </div>

            {next && !terminal ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-[#f0e7da] p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1c1916]">
                    <CalendarDays className="size-4 text-[#c4a574]" aria-hidden /> Next step
                  </p>
                  <p className="mt-3 font-medium text-[#1c1916]">{next.title}</p>
                  <p className="mt-1 text-sm text-[#6f655b]">{next.body}</p>
                </article>
                <article className="rounded-2xl border border-[#f0e7da] p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1c1916]">
                    <Clock3 className="size-4 text-[#c4a574]" aria-hidden /> Estimated timeline
                  </p>
                  <p className="mt-3 text-sm text-[#6f655b]">
                    We&apos;ll keep you updated as the process moves forward. Timelines may vary depending on the role and team.
                  </p>
                </article>
              </div>
            ) : null}

            <div>
              <h3 className="font-medium text-[#1c1916]">Recent activity</h3>
              <ActivityList items={historyNewest.slice(0, 4)} />
            </div>
          </div>
        ) : null}

        {panel === "application" ? (
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-[#8d8274]">Role</dt>
              <dd className="mt-1 text-[#1c1916]">{application.job.title}</dd>
            </div>
            <div>
              <dt className="text-[#8d8274]">Workplace</dt>
              <dd className="mt-1">{application.job.workplaceType ?? "—"}</dd>
            </div>
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
              <dd className="mt-1 whitespace-pre-wrap text-[#3f3832]">
                {application.coverLetter || "No cover letter was included."}
              </dd>
            </div>
          </dl>
        ) : null}

        {panel === "interviews" ? (
          application.interviews.length === 0 ? (
            <p className="text-sm text-[#6f655b]">No interview is scheduled.</p>
          ) : (
            <ul className="space-y-3">
              {application.interviews.map((interview) => (
                <li key={interview.id} className="rounded-2xl border border-[#f0e7da] p-4 text-sm">
                  <p className="font-medium capitalize text-[#1c1916]">{interview.interviewType.replaceAll("_", " ")}</p>
                  <p className="mt-1 text-[#6f655b]">
                    {formatDateTime(interview.scheduledAt)}
                    {interview.timezone ? ` · ${interview.timezone}` : ""}
                    {` · ${interview.status}`}
                  </p>
                  {interview.meetingLocation ? <p className="mt-1">{interview.meetingLocation}</p> : null}
                  {interview.meetingUrl ? (
                    <a className="mt-2 inline-flex text-[#8a6a32] hover:underline" href={interview.meetingUrl}>
                      Join meeting
                    </a>
                  ) : null}
                  {interview.instructions ? <p className="mt-2 whitespace-pre-wrap text-[#3f3832]">{interview.instructions}</p> : null}
                </li>
              ))}
            </ul>
          )
        ) : null}

        {panel === "messages" ? (
          <div className="space-y-3">
            {application.messages.length === 0 ? <p className="text-sm text-[#6f655b]">No messages yet.</p> : null}
            {application.messages.map((message) => (
              <article key={message.id} className="rounded-2xl bg-[#faf7f1] p-3">
                <p className="text-xs text-[#8d8274]">
                  {message.senderName ?? "Twinlink"} · {formatDateTime(message.createdAt)}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{message.body}</p>
              </article>
            ))}
            <MessageForm applicationId={application.id} />
          </div>
        ) : null}

        {panel === "activity" ? <ActivityList items={historyNewest} /> : null}
      </div>
    </section>
  );
}

function ActivityList({
  items,
}: {
  items: CandidateBoardApplication["history"];
}) {
  if (items.length === 0) {
    return <p className="mt-3 text-sm text-[#6f655b]">Activity will appear here as Twinlink updates this application.</p>;
  }
  return (
    <ol className="mt-3 space-y-4">
      {items.map((item, index) => {
        const stage = parseHiringStage(item.toStage);
        return (
          <li key={item.id} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3">
            <span className="mt-1 flex justify-center">
              <span className={cn("size-2.5 rounded-full", index === 0 ? "bg-[#c4a574]" : "bg-[#d9d0c4]")} />
            </span>
            <div>
              <p className="text-sm font-medium text-[#1c1916]">{CANDIDATE_LABEL[stage]}</p>
              <p className="text-xs text-[#8d8274]">{formatDateTime(item.changedAt)}</p>
              <p className="mt-1 text-sm text-[#6f655b]">{activitySentence(stage, item.message)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
