import { redirect } from "next/navigation";

export default async function JobApplicantsRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/employee/jobs/${id}`);
}
