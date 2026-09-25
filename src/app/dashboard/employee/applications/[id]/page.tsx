import { redirect } from "next/navigation";

export default async function EmployeeApplicationRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/employee/applicants/${id}`);
}
