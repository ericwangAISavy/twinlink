import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus } from "@/lib/types";
import { getAdminAnalytics } from "@/server/queries/admin";

const PIPELINE_ORDER: ApplicationStatus[] = [
  "SUBMITTED",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "OFFER",
  "HIRED",
];

export default async function AdminAnalyticsPage() {
  const data = await getAdminAnalytics();
  const maxTrend = Math.max(1, ...data.trend.map((item) => item.count));
  const maxJob = Math.max(1, ...data.byJob.map((item) => item.count));

  return (
    <>
      <AdminPageHeader title="Analytics" description="Metrics derived only from live Twinlink data." />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Applications" value={data.applications} />
        <AdminStatCard label="Interviews" value={data.interviews} />
        <AdminStatCard label="Offers" value={data.pipeline.OFFER} />
        <AdminStatCard label="Hires" value={data.pipeline.HIRED} />
      </section>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Applications · 30 days</h2>
          {data.trend.every((item) => item.count === 0) ? (
            <AdminEmptyState className="mt-4 border-0 bg-transparent p-0" title="No application trend yet." description="Counts appear after candidates apply." />
          ) : (
            <div className="mt-6 flex h-40 items-end gap-1">
              {data.trend.map((item) => (
                <div key={item.key} className="flex flex-1 flex-col items-center justify-end">
                  <div className="w-full rounded-t bg-[#c4a574]" style={{ height: `${Math.max(4, (item.count / maxTrend) * 100)}%` }} title={`${item.label}: ${item.count}`} />
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Pipeline</h2>
          <ul className="mt-4 space-y-3">
            {PIPELINE_ORDER.map((status) => (
              <li key={status} className="flex items-center justify-between text-sm">
                <span>{APPLICATION_STATUS_LABELS[status]}</span>
                <span className="tabular-nums">{data.pipeline[status]}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6 lg:col-span-2">
          <h2 className="font-serif text-xl">Applications by job</h2>
          {data.byJob.length === 0 ? (
            <AdminEmptyState className="mt-4 border-0 bg-transparent p-0" title="No job application data yet." description="Publish a role and wait for applications." />
          ) : (
            <ul className="mt-4 space-y-3">
              {data.byJob.map((item) => (
                <li key={item.title}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span className="tabular-nums">{item.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f3eee6]">
                    <div className="h-full bg-[#c4a574]" style={{ width: `${(item.count / maxJob) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
