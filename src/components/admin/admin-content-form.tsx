"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminSaveContent } from "@/server/actions/admin";

export function AdminContentForm({
  item,
}: {
  item: { id: string; key: string; title: string; body: string | null };
}) {
  return (
    <ActionForm action={adminSaveContent} submitLabel="Save">
      <input type="hidden" name="id" value={item.id} />
      <Field htmlFor={`title-${item.id}`} label={item.key.replace(/_/g, " ")}>
        <Input id={`title-${item.id}`} name="title" defaultValue={item.title} />
      </Field>
      <Field htmlFor={`body-${item.id}`} label="Body">
        <Textarea id={`body-${item.id}`} name="body" defaultValue={item.body ?? ""} />
      </Field>
    </ActionForm>
  );
}
