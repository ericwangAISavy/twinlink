import { requireUser } from "@/server/authorization";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}
