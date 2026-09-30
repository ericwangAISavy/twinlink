import Link from "next/link";
import { Briefcase, CalendarDays, ChevronRight, FileText, UserPlus, Users } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminTrendChart } from "@/components/admin/admin-trend-chart";
import { Button } from "@/components/ui/button";
import { HIRING_STAGES } from "@/lib/hiring-stages";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatDateTime } from "@/lib/utils";
import { requireAdmin } from "@/server/authorization";
import { getAdminOverview } from "@/server/queries/admin";

const PIPELINE_ORDER = HIRING_STAGES.map((status, index) => ({
  status,
  color: `rgba(196, 165, 116, ${0.28 + index * 0.09})`,
}));

function greeting(name: string | null) {
  const hour = new Date().getHours();
  const period = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const first = name?.trim().split(/\s+/)[0];
  return first ? `${period}, ${first}` : period;
}

function relativeTime(value: string) {
  const hours = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 36e5));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default async function AdminOverviewPage() {
  const user = await requireAdmin();
  const data = await getAdminOverview();
  const maxPipeline = Math.max(1, ...PIPELINE_ORDER.map((item) => data.pipeline[item.status]));
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  const locationTotal = data.locations.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-[#c4a574]">{greeting(user.name)}</p>
            <h1 className="mt-1 font-serif text-4xl text-[#1c1916]">Twinlink Operations</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage recruiting, talent, and company operations.</p>
          </div>
          <p className="text-sm text-muted-foreground">{today}</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Open Jobs" value={data.openJobs} hint={data.openJobs === 0 ? "No published roles yet" : "Currently published"} icon={Briefcase} />
          <AdminStatCard
            label="Active Candidates"
            value={data.activeCandidates}
            hint={data.activeCandidates === 0 ? "No candidates yet" : "Registered profiles"}
            icon={Users}
          />
          <AdminStatCard
            label="Applications"
            value={data.applications}
            hint={data.applications === 0 ? "No applications yet" : "All time"}
            icon={FileText}
          />
          <AdminStatCard
            label="Interviews"
            value={data.interviews}
            hint={data.interviews === 0 ? "No interviews scheduled" : "Scheduled"}
            icon={CalendarDays}
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">Hiring Pipeline</h2>
              <span className="text-xs text-muted-foreground">Live applications</span>
            </div>
            <div className="mt-6 flex h-40 items-end gap-3">
              {PIPELINE_ORDER.map((item) => (
                <div key={item.status} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <p className="text-sm font-medium tabular-nums">{data.pipeline[item.status]}</p>
                  <div className="flex h-28 w-full items-end rounded-md bg-[#f7f1e8]">
                    <div
                      className="w-full rounded-md"
                      style={{
                        height: `${Math.max(data.pipeline[item.status] ? 8 : 0, (data.pipeline[item.status] / maxPipeline) * 100)}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <p className="text-center text-[11px] text-muted-foreground">{APPLICATION_STATUS_LABELS[item.status]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">Applications Trend</h2>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            {data.monthlyTrend.every((item) => item.count === 0) ? (
              <AdminEmptyState
                className="mt-4 border-0 px-0 py-8"
                title="No application trend yet"
                description="Counts will appear here as candidates apply."
              />
            ) : (
              <div className="mt-4">
                <AdminTrendChart points={data.monthlyTrend} />
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  {data.monthlyTrend.map((item) => (
                    <span key={item.key}>{item.label}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl">Recent Job Postings</h2>
              <Link href="/admin/jobs" className="text-sm text-[#c4a574] hover:underline">
                View all
              </Link>
            </div>
            {data.recentJobs.length === 0 ? (
              <AdminEmptyState
                className="border-0 px-0 py-6"
                title="No jobs created yet."
                action={
                  <Button asChild variant="teal" className="rounded-full">
                    <Link href="/admin/jobs/new">Create your first job</Link>
                  </Button>
                }
                description="Published roles will appear on the public careers pages."
              />
            ) : (
              <AdminTable className="border-0 shadow-none" headers={["Job title", "Department", "Location", "Applications", "Status", "Updated"]}>
                {data.recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-4 py-3">
                      <Link href={`/admin/jobs/${job.id}`} className="font-medium hover:underline">
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{job.department}</td>
                    <td className="px-4 py-3 text-muted-foreground">{job.location}</td>
                    <td className="px-4 py-3 tabular-nums">{job.applications}</td>
                    <td className="px-4 py-3">
                      <AdminStatusBadge kind="job" status={job.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(job.updatedAt)}</td>
                  </tr>
                ))}
              </AdminTable>
            )}
          </section>

          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl">Latest Applications</h2>
              <Link href="/admin/applications" className="text-sm text-[#c4a574] hover:underline">
                View all
              </Link>
            </div>
            {data.latestApplications.length === 0 ? (
              <AdminEmptyState
                className="border-0 px-0 py-6"
                title="No applications yet."
                description="Applications will appear here as candidates apply."
              />
            ) : (
              <ul className="space-y-3">
                {data.latestApplications.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.candidateName}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.jobTitle}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden text-xs text-muted-foreground sm:block">{relativeTime(item.createdAt)}</span>
                      <AdminStatusBadge kind="application" status={item.status} />
                      <Link href={`/admin/applications/${item.id}`} className="text-sm text-[#c4a574] hover:underline">
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <h2 className="font-serif text-xl">Top Job Locations</h2>
            {data.locations.length === 0 ? (
              <AdminEmptyState
                className="mt-4 border-0 px-0 py-6"
                title="No location data yet."
                description="Locations will appear after applications exist."
              />
            ) : (
              <ul className="mt-4 space-y-3">
                {data.locations.map((item) => (
                  <li key={item.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {item.count} · {Math.round((item.count / locationTotal) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f7f1e8]">
                      <div className="h-2 rounded-full bg-[#c4a574]" style={{ width: `${(item.count / locationTotal) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl">Upcoming Interviews</h2>
              <Link href="/admin/interviews" className="text-sm text-[#c4a574] hover:underline">
                View all
              </Link>
            </div>
            {data.upcomingInterviews.length === 0 ? (
              <AdminEmptyState
                className="border-0 px-0 py-6"
                title="No interviews scheduled."
                description="Scheduled interviews will appear here."
              />
            ) : (
              <ul className="space-y-3 text-sm">
                {data.upcomingInterviews.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 border-b border-[#eadfcd] pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{item.candidateName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.jobTitle} · {formatDateTime(item.scheduledAt)}
                      </p>
                    </div>
                    <Link href={`/admin/applications/${item.applicationId}`} className="text-[#c4a574] hover:underline">
                      Open
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
          <h2 className="font-serif text-xl">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <Button asChild className="w-full justify-between rounded-xl" variant="teal">
              <Link href="/admin/jobs/new">
                Create Job Posting
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="w-full justify-between rounded-xl" variant="outline">
              <Link href="/admin/applications">
                Review Applications
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="w-full justify-between rounded-xl" variant="outline">
              <Link href="/admin/candidates">
                View Candidates
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="w-full justify-between rounded-xl" variant="outline">
              <Link href="/admin/invitations">
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="size-4" />
                  Invite Employee
                </span>
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-xl">Recent Activity</h2>
            <Link href="/admin/activity" className="text-sm text-[#c4a574] hover:underline">
              View all
            </Link>
          </div>
          {data.activity.length === 0 ? (
            <AdminEmptyState
              className="border-0 px-0 py-6"
              title="No recent activity yet."
              description="Activity will appear as your team manages jobs and candidates."
            />
          ) : (
            <ul className="space-y-3 text-sm">
              {data.activity.map((item) => (
                <li key={item.id}>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.actor} · {relativeTime(item.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </div>
  );
}
