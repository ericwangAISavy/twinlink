"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMPLOYMENT_TYPES, JOB_STATUSES } from "@/lib/constants";
import { upsertJob } from "@/server/actions/jobs";

type JobValues = {
  id?: string;
  title?: string;
  location?: string | null;
  employmentType?: string | null;
  description?: string;
  requirements?: string | null;
  status?: string;
};

export function JobForm({ job }: { job?: JobValues }) {
  return (
    <ActionForm action={upsertJob} submitLabel={job?.id ? "Update role" : "Create role"}>
      {job?.id ? <input type="hidden" name="id" value={job.id} /> : null}
      <div className="grid gap-4">
        <Field htmlFor="title" label="Title">
          <Input id="title" name="title" required defaultValue={job?.title} />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field htmlFor="location" label="Location">
            <Input id="location" name="location" defaultValue={job?.location ?? ""} />
          </Field>
          <Field htmlFor="employmentType" label="Employment type">
            <select
              id="employmentType"
              name="employmentType"
              defaultValue={job?.employmentType ?? "Full-time"}
              className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field htmlFor="status" label="Status">
          <select
            id="status"
            name="status"
            defaultValue={job?.status ?? "DRAFT"}
            className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
          >
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field htmlFor="description" label="Description">
          <Textarea id="description" name="description" required defaultValue={job?.description} />
        </Field>
        <Field htmlFor="requirements" label="Requirements">
          <Textarea id="requirements" name="requirements" defaultValue={job?.requirements ?? ""} />
        </Field>
      </div>
    </ActionForm>
  );
}
