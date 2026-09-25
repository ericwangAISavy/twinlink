import { redirect } from "next/navigation";

export default async function EmployeeMessageAliasPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await params;
  redirect(`/dashboard/employee/applicants/${applicationId}`);
}
