import Link from "next/link";
import { EmptyState } from "@/components/dashboard/candidate/empty-state";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Button } from "@/components/ui/button";

export function JobAlertsCard() {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)]">
      <SectionHeader title="Job alerts" />
      <EmptyState
        className="border-0 bg-transparent px-0 py-2"
        title="No alerts yet"
        description="New published roles that match your profile will be listed here. Until then, browse current openings."
        action={
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/dashboard/candidate/jobs">Browse careers</Link>
          </Button>
        }
      />
    </section>
  );
}
