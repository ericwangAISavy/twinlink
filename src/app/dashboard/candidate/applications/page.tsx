import { ApplicationsWorkspace } from "@/components/dashboard/candidate/applications-workspace";
import { withdrawApplication } from "@/server/actions/applications";
import { requireRole } from "@/server/authorization";
import { getCandidateApplicationBoard } from "@/server/queries/applications";

async function withdraw(formData: FormData) {
  "use server";
  await withdrawApplication(String(formData.get("applicationId") ?? ""));
}

export default async function CandidateApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await requireRole("CANDIDATE");
  const { id } = await searchParams;
  const applications = await getCandidateApplicationBoard(user.id);

  return <ApplicationsWorkspace applications={applications} initialId={id ?? null} withdrawAction={withdraw} />;
}
