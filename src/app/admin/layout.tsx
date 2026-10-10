import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/authorization";
import { getUnreadNotificationCount } from "@/server/queries/messages";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const unread = await getUnreadNotificationCount(user.id);

  return (
    <AdminShell user={{ name: user.name, email: user.email, image: user.image ?? null }} unread={unread}>
      {children}
    </AdminShell>
  );
}
