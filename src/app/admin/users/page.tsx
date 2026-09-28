import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminRoleForm } from "@/components/admin/admin-role-form";
import { AdminTable } from "@/components/admin/admin-table";
import { formatDate } from "@/lib/utils";
import { getAdminUsers } from "@/server/queries/admin";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <>
      <AdminPageHeader
        title="Users & roles"
        description="Role changes run through a trusted server procedure. Public registration always creates candidates."
      />
      {users.length === 0 ? (
        <AdminEmptyState title="No users yet." description="Users appear after accounts are created in Supabase Auth." />
      ) : (
        <AdminTable headers={["Name", "Email", "Role", "Created", "Change role"]}>
          {users.map((user) => (
            <tr key={String(user.id)}>
              <td className="px-4 py-3">{(user.full_name as string | null) ?? "—"}</td>
              <td className="px-4 py-3">{String(user.email)}</td>
              <td className="px-4 py-3 capitalize">{String(user.role)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(String(user.created_at))}</td>
              <td className="px-4 py-3">
                <AdminRoleForm userId={String(user.id)} role={String(user.role)} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
