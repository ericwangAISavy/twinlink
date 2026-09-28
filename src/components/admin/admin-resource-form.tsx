"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminCreateResource } from "@/server/actions/admin";

export function AdminResourceForm() {
  return (
    <ActionForm action={adminCreateResource} submitLabel="Add resource">
      <div className="grid gap-4 md:grid-cols-2">
        <Field htmlFor="title" label="Title">
          <Input id="title" name="title" required />
        </Field>
        <Field htmlFor="url" label="URL">
          <Input id="url" name="url" placeholder="https://" />
        </Field>
        <Field htmlFor="kind" label="Kind">
          <select id="kind" name="kind" defaultValue="public" className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
            <option value="public">Public</option>
            <option value="candidate">Candidate</option>
            <option value="internal">Internal</option>
          </select>
        </Field>
        <Field htmlFor="description" label="Description" className="md:col-span-2">
          <Textarea id="description" name="description" />
        </Field>
      </div>
    </ActionForm>
  );
}
