import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/authorization";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const notifications = await getUnreadNotifications(user.id);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <AdminShell user={{ name: user.name, email: user.email, image: user.image ?? null }} unread={unread}>
      {children}
    </AdminShell>
  );
}
