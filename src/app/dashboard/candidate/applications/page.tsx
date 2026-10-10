import { ApplicationsWorkspace } from "@/components/dashboard/candidate/applications-workspace";
import { requireRole } from "@/server/authorization";
import { getCandidateApplicationBoard } from "@/server/queries/applications";

export default async function CandidateApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await requireRole("CANDIDATE");
  const { id } = await searchParams;
  const applications = await getCandidateApplicationBoard(user.id);

  return <ApplicationsWorkspace applications={applications} initialId={id ?? null} />;
}
