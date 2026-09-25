import { redirect } from "next/navigation";

export default async function CandidateMessageAliasPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await params;
  redirect(`/dashboard/candidate/applications/${applicationId}`);
}
