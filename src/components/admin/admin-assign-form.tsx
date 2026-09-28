"use client";

import { ActionForm } from "@/components/action-form";
import { adminAssignApplication } from "@/server/actions/admin";

export function AdminAssignForm({
  applicationId,
  assignedToId,
  employees,
}: {
  applicationId: string;
  assignedToId: string | null;
  employees: { id: string; name: string | null; email: string }[];
}) {
  return (
    <ActionForm action={adminAssignApplication} submitLabel="Save assignment">
      <input type="hidden" name="applicationId" value={applicationId} />
      <label className="block text-sm font-medium" htmlFor="assignedTo">
        Assigned employee
      </label>
      <select
        id="assignedTo"
        name="assignedTo"
        defaultValue={assignedToId ?? ""}
        className="mt-2 flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
      >
        <option value="">Unassigned</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name ?? employee.email}
          </option>
        ))}
      </select>
    </ActionForm>
  );
}
