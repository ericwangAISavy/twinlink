import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getAdminEmployees } from "@/server/queries/admin";

export default async function AdminEmployeesPage() {
  const employees = await getAdminEmployees();

  return (
    <>
      <AdminPageHeader
        title="Employees"
        description="Employees join by invitation only. There is no public employee registration."
        actions={
          <Button asChild variant="teal" className="rounded-full">
            <Link href="/admin/invitations">Invite employee</Link>
          </Button>
        }
      />
      {employees.length === 0 ? (
        <AdminEmptyState
          title="No employees yet."
          description="Invite a colleague to create the first employee account."
          action={
            <Button asChild variant="teal" className="rounded-full">
              <Link href="/admin/invitations">Invite employee</Link>
            </Button>
          }
        />
      ) : (
        <AdminTable headers={["Name", "Title", "Department", "Role", "Status", "Joined"]}>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-4 py-3">
                <Link className="font-medium hover:underline" href={`/admin/employees/${employee.id}`}>
                  {employee.name ?? employee.email}
                </Link>
                <p className="text-xs text-muted-foreground">{employee.email}</p>
              </td>
              <td className="px-4 py-3">{employee.jobTitle ?? "—"}</td>
              <td className="px-4 py-3">{employee.department ?? "—"}</td>
              <td className="px-4 py-3 capitalize">{employee.role}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="generic" status={String(employee.status)} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(employee.createdAt)}</td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
