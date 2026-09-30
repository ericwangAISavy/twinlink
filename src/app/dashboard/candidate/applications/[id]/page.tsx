import { redirect } from "next/navigation";

export default async function CandidateApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/candidate/applications?id=${id}`);
}
