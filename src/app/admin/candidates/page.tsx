import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminFilterBar } from "@/components/admin/admin-filter-bar";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { ApproveCandidateButton } from "@/components/admin/approve-candidate-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { getAdminCandidates } from "@/server/queries/admin";

export default async function AdminCandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const candidates = await getAdminCandidates(q);

  return (
    <>
      <AdminPageHeader title="Candidates" description="New candidates can sign in after you approve their access." />
      <AdminFilterBar>
        <Input name="q" defaultValue={q} placeholder="Search name, email, headline, or skills" className="max-w-sm" />
        <Button type="submit" variant="outline" size="sm">
          Search
        </Button>
      </AdminFilterBar>
      {candidates.length === 0 ? (
        <AdminEmptyState title="No candidates yet." description="Candidate profiles appear after people register and complete their talent profile." />
      ) : (
        <AdminTable headers={["Candidate", "Access", "Headline", "Location", "Skills", "Applications", "Last activity"]}>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="px-4 py-3">
                <Link href={`/admin/candidates/${candidate.id}`} className="font-medium hover:underline">
                  {candidate.name ?? candidate.email}
                </Link>
                <p className="text-xs text-muted-foreground">{candidate.email}</p>
              </td>
              <td className="px-4 py-3">
                {candidate.accessStatus === "pending" ? (
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-sm text-[#8a4b2f]">Pending approval</span>
                    <ApproveCandidateButton userId={candidate.id} />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Approved</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{candidate.headline ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{candidate.location ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{candidate.skills.slice(0, 4).join(", ") || "—"}</td>
              <td className="px-4 py-3 tabular-nums">{candidate.applications}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(candidate.updatedAt)}</td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
