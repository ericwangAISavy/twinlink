import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { formatDateTime } from "@/lib/utils";
import { getAdminActivity } from "@/server/queries/admin";

export default async function AdminActivityPage() {
  const activity = await getAdminActivity();

  return (
    <>
      <AdminPageHeader title="Activity" description="Operational audit trail for recruiting and people actions." />
      {activity.length === 0 ? (
        <AdminEmptyState
          title="No recent activity yet."
          description="Activity will appear as your team manages jobs and candidates."
        />
      ) : (
        <AdminTable headers={["Actor", "Action", "Target", "When"]}>
          {activity.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.actor}</td>
              <td className="px-4 py-3">{item.action}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {item.entityType ?? "—"}
                {item.entityId ? ` · ${item.entityId.slice(0, 8)}` : ""}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDateTime(item.createdAt)}</td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
