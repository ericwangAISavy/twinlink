"use client";

import { ActionForm } from "@/components/action-form";
import { adminSetUserRole } from "@/server/actions/admin";

export function AdminRoleForm({ userId, role }: { userId: string; role: string }) {
  return (
    <ActionForm action={adminSetUserRole} submitLabel="Update" className="flex items-end gap-2" submitClassName="mt-0 h-10">
      <input type="hidden" name="userId" value={userId} />
      <select name="role" defaultValue={role} className="flex h-10 rounded-md border border-input bg-card px-3 text-sm">
        <option value="candidate">candidate</option>
        <option value="employee">employee</option>
        <option value="admin">admin</option>
      </select>
    </ActionForm>
  );
}
