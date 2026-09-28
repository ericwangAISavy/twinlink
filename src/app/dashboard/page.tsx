import { redirect } from "next/navigation";
import { homePath } from "@/lib/types";
import { requireUser } from "@/server/authorization";

export default async function DashboardIndexPage() {
  const user = await requireUser();
  redirect(homePath(user.role));
}
