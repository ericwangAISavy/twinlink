import Link from "next/link";
import { FileText } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Button } from "@/components/ui/button";
import { getHiringStageLabel, getHiringStageOrder, HIRING_STAGES } from "@/lib/hiring-stages";
import type { ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export type RecentApplicationItem = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt?: string;
  job: {
    title: string;
    location: string | null;
    employmentType: string | null;
  };
};

export function RecentApplicationsCard({ items }: { items: RecentApplicationItem[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-6">
      <SectionHeader
        title="Active applications"
        action={
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/dashboard/candidate/applications">View all applications</Link>
          </Button>
        }
      />
      {items.length === 0 ? (
        <div className="rounded-2xl bg-[#faf7f1] px-6 py-8">
          <span className="grid size-10 place-items-center rounded-full bg-white text-[#c4a574] shadow-sm">
            <FileText className="size-4" aria-hidden />
          </span>
          <p className="mt-4 font-medium text-[#1c1916]">No applications yet</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            When you apply to a Twinlink role, it will appear here with status and date.
          </p>
          <Button asChild variant="teal" className="mt-5 rounded-full">
            <Link href="/dashboard/candidate/jobs">Browse careers</Link>
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-[#eadfcd]">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/dashboard/candidate/applications/${item.id}`}
                className="flex flex-wrap items-center justify-between gap-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#1c1916]">{item.job.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {getHiringStageLabel(item.status)}
                    {` · Updated ${formatDate(item.updatedAt ?? item.createdAt)}`}
                  </p>
                  <div className="mt-2 flex gap-1" aria-hidden>
                    {HIRING_STAGES.map((step, index) => (
                      <span
                        key={step}
                        className={
                          index <= Math.max(getHiringStageOrder(item.status), 0)
                            ? "h-1 flex-1 rounded-full bg-[#c4a574]"
                            : "h-1 flex-1 rounded-full bg-[#eadfcd]"
                        }
                      />
                    ))}
                  </div>
                  <p className="sr-only">{getHiringStageLabel(item.status)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
