import { notFound } from "next/navigation";
import { AdminEmployeeForm } from "@/components/admin/admin-employee-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { formatDate } from "@/lib/utils";
import { getAdminEmployee } from "@/server/queries/admin";

export default async function AdminEmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = await getAdminEmployee(id);
  if (!employee) notFound();

  return (
    <>
      <AdminPageHeader
        title={employee.name ?? employee.email}
        description={`${employee.email} · joined ${formatDate(employee.createdAt)}`}
        actions={<AdminStatusBadge kind="generic" status={String(employee.role)} />}
      />
      <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
        <h2 className="font-serif text-xl">Profile</h2>
        <p className="mt-2 text-sm text-muted-foreground">Deactivating an employee keeps the account but removes them from active operations.</p>
        <div className="mt-6">
          <AdminEmployeeForm employee={employee} />
        </div>
      </div>
    </>
  );
}
