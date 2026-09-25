"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/server/actions/settings";

export function PasswordForm() {
  return (
    <ActionForm action={changePassword} submitLabel="Update password">
      <div className="grid gap-4">
        <Field htmlFor="currentPassword" label="Current password">
          <Input id="currentPassword" name="currentPassword" type="password" required minLength={8} />
        </Field>
        <Field htmlFor="newPassword" label="New password">
          <Input id="newPassword" name="newPassword" type="password" required minLength={8} />
        </Field>
        <Field htmlFor="confirmPassword" label="Confirm new password">
          <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
        </Field>
      </div>
    </ActionForm>
  );
}
