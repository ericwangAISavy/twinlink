"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { adminSetEmployeeStatus } from "@/server/actions/admin";

export function AdminEmployeeForm({
  employee,
}: {
  employee: { id: string; jobTitle: string | null; department: string | null; status: string };
}) {
  return (
    <ActionForm action={adminSetEmployeeStatus} submitLabel="Save employee">
      <input type="hidden" name="userId" value={employee.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field htmlFor="jobTitle" label="Job title">
          <Input id="jobTitle" name="jobTitle" defaultValue={employee.jobTitle ?? ""} />
        </Field>
        <Field htmlFor="department" label="Department">
          <Input id="department" name="department" defaultValue={employee.department ?? ""} />
        </Field>
        <Field htmlFor="status" label="Status">
          <select id="status" name="status" defaultValue={employee.status} className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
            <option value="invited">Invited</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </Field>
      </div>
    </ActionForm>
  );
}
