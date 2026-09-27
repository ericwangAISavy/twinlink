import Link from "next/link";
import { EmptyState } from "@/components/dashboard/candidate/empty-state";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export type RecentApplicationItem = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  job: {
    title: string;
    location: string | null;
    employmentType: string | null;
  };
};

function statusVariant(status: ApplicationStatus) {
  if (status === "REJECTED" || status === "WITHDRAWN") return "muted" as const;
  if (status === "OFFER") return "teal" as const;
  if (status === "INTERVIEW") return "secondary" as const;
  return "outline" as const;
}

export function RecentApplicationsCard({ items }: { items: RecentApplicationItem[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-6">
      <SectionHeader
        title="Recent applications"
        action={
          items.length ? (
            <Button asChild variant="link" className="h-auto p-0 text-sm">
              <Link href="/dashboard/candidate/applications">View all</Link>
            </Button>
          ) : null
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="When you apply to a Twinlink role, it will appear here with status and date."
          action={
            <Button asChild variant="teal" className="rounded-full">
              <Link href="/dashboard/candidate/jobs">Browse careers</Link>
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-[#eadfcd]">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/dashboard/candidate/applications/${item.id}`}
                className="flex flex-wrap items-center justify-between gap-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#1c1916]">{item.job.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Twinlink
                    {item.job.location ? ` · ${item.job.location}` : ""}
                    {item.job.employmentType ? ` · ${item.job.employmentType}` : ""}
                    {` · ${formatDate(item.createdAt)}`}
                  </p>
                </div>
                <Badge variant={statusVariant(item.status)}>{APPLICATION_STATUS_LABELS[item.status]}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
