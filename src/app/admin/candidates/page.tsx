import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminFilterBar } from "@/components/admin/admin-filter-bar";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { CandidateAccessControls } from "@/components/admin/candidate-access-controls";
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
                <CandidateAccessControls
                  userId={candidate.id}
                  accessStatus={candidate.accessStatus}
                  name={candidate.name ?? candidate.email}
                />
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
