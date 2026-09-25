import { redirect } from "next/navigation";
import { requireUser } from "@/server/authorization";

export default async function DashboardIndexPage() {
  const user = await requireUser();
  redirect(user.role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate");
}
