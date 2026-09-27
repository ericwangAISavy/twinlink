import Link from "next/link";
import { EmptyState } from "@/components/dashboard/candidate/empty-state";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type RecommendedJobItem = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  employmentType: string | null;
  saved: boolean;
};

export function RecommendedJobsCard({ items }: { items: RecommendedJobItem[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-6">
      <SectionHeader
        title="Open roles"
        action={
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/dashboard/candidate/jobs">Browse all</Link>
          </Button>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No open roles right now"
          description="Published Twinlink openings you have not applied to will show here."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((job) => (
            <li key={job.id} className="rounded-xl border border-[#eadfcd] px-4 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[#1c1916]">{job.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {job.location ?? "Flexible"}
                    {job.employmentType ? ` · ${job.employmentType}` : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.employmentType ? <Badge variant="secondary">{job.employmentType}</Badge> : null}
                    {job.saved ? <Badge variant="teal">Saved</Badge> : null}
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <Link href={`/dashboard/candidate/jobs/${job.id}`}>View details</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
