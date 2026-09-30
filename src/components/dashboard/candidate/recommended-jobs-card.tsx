import Link from "next/link";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export type RecommendedJobItem = {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  publishedAt: string | null;
  saved: boolean;
};

export function RecommendedJobsCard({ items }: { items: RecommendedJobItem[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-6">
      <SectionHeader
        title="Open roles"
        action={
          <Button asChild variant="link" className="h-auto p-0 text-sm text-[#c4a574]">
            <Link href="/dashboard/candidate/jobs">Browse all</Link>
          </Button>
        }
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfcd] text-xs text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Role</th>
              <th className="pb-3 pr-4 font-medium">Department</th>
              <th className="pb-3 pr-4 font-medium">Location</th>
              <th className="pb-3 pr-4 font-medium">Type</th>
              <th className="pb-3 font-medium">Posted</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-sm text-muted-foreground">
                  Published Twinlink openings you have not applied to will show here.
                </td>
              </tr>
            ) : (
              items.map((job) => (
                <tr key={job.id} className="border-b border-[#f0e7da] last:border-0">
                  <td className="py-3.5 pr-4">
                    <Link href={`/dashboard/candidate/jobs/${job.id}`} className="font-medium text-[#1c1916] hover:underline">
                      {job.title}
                    </Link>
                    {job.saved ? <span className="ml-2 text-xs text-[#c4a574]">Saved</span> : null}
                  </td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{job.department ?? "—"}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{job.location ?? "Flexible"}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{job.employmentType ?? "—"}</td>
                  <td className="py-3.5 text-muted-foreground">{formatDate(job.publishedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
