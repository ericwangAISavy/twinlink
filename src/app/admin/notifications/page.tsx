import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatDateTime } from "@/lib/utils";
import { requireAdmin } from "@/server/authorization";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function AdminNotificationsPage() {
  const user = await requireAdmin();
  const notifications = await getUnreadNotifications(user.id);

  return (
    <>
      <AdminPageHeader title="Notifications" description="Operational alerts for your admin account." />
      {notifications.length === 0 ? (
        <AdminEmptyState title="No notifications yet." description="You will see application, interview, and message alerts here." />
      ) : (
        <ul className="space-y-3">
          {notifications.map((item) => (
            <li key={item.id} className="rounded-2xl border border-[#eadfcd] bg-white px-5 py-4">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              <p className="mt-2 text-xs text-muted-foreground">{formatDateTime(item.createdAt)}</p>
              {item.href ? (
                <Link className="mt-2 inline-block text-sm text-accent hover:underline" href={item.href}>
                  Open
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
