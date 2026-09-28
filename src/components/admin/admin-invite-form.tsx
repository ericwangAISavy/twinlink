"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { adminInvitePerson } from "@/server/actions/admin";

export function AdminInviteForm() {
  return (
    <ActionForm action={adminInvitePerson} submitLabel="Send invitation">
      <div className="grid gap-4 md:grid-cols-2">
        <Field htmlFor="name" label="Name">
          <Input id="name" name="name" />
        </Field>
        <Field htmlFor="email" label="Email">
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field htmlFor="jobTitle" label="Job title">
          <Input id="jobTitle" name="jobTitle" />
        </Field>
        <Field htmlFor="department" label="Department">
          <Input id="department" name="department" />
        </Field>
        <Field htmlFor="role" label="Role">
          <select id="role" name="role" defaultValue="employee" className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
      </div>
    </ActionForm>
  );
}
