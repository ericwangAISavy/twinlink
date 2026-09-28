"use client";

import { useRef } from "react";
import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMPLOYMENT_TYPES } from "@/lib/constants";
import { adminUpsertJob } from "@/server/actions/admin";

export function AdminJobForm({
  job,
}: {
  job?: {
    id?: string;
    title?: string;
    slug?: string;
    department?: string;
    location?: string;
    workplaceType?: string;
    employmentType?: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    preferredQualifications?: string;
    salaryMin?: string;
    salaryMax?: string;
    currency?: string;
    applicationDeadline?: string;
    status?: string;
  };
}) {
  const statusRef = useRef<HTMLInputElement>(null);

  return (
    <ActionForm action={adminUpsertJob} hideSubmit>
      {job?.id ? <input type="hidden" name="id" value={job.id} /> : null}
      <input type="hidden" name="status" ref={statusRef} defaultValue={job?.status ?? "DRAFT"} />
      <div className="space-y-8">
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Basic information</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field htmlFor="title" label="Title">
              <Input id="title" name="title" required defaultValue={job?.title} />
            </Field>
            <Field htmlFor="slug" label="Slug">
              <Input id="slug" name="slug" defaultValue={job?.slug} placeholder="generated-if-empty" />
            </Field>
            <Field htmlFor="department" label="Department">
              <Input id="department" name="department" defaultValue={job?.department} />
            </Field>
            <Field htmlFor="location" label="Location">
              <Input id="location" name="location" defaultValue={job?.location} />
            </Field>
            <Field htmlFor="workplaceType" label="Workplace type">
              <Input id="workplaceType" name="workplaceType" defaultValue={job?.workplaceType} placeholder="Remote, Hybrid, On-site" />
            </Field>
            <Field htmlFor="employmentType" label="Employment type">
              <select id="employmentType" name="employmentType" defaultValue={job?.employmentType ?? "Full-time"} className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Description</h2>
          <div className="mt-4 grid gap-4">
            <Field htmlFor="description" label="Overview">
              <Textarea id="description" name="description" required defaultValue={job?.description} />
            </Field>
            <Field htmlFor="responsibilities" label="Responsibilities">
              <Textarea id="responsibilities" name="responsibilities" defaultValue={job?.responsibilities} />
            </Field>
            <Field htmlFor="requirements" label="Requirements">
              <Textarea id="requirements" name="requirements" defaultValue={job?.requirements} />
            </Field>
            <Field htmlFor="preferredQualifications" label="Preferred qualifications">
              <Textarea id="preferredQualifications" name="preferredQualifications" defaultValue={job?.preferredQualifications} />
            </Field>
          </div>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Compensation & publishing</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field htmlFor="salaryMin" label="Salary minimum">
              <Input id="salaryMin" name="salaryMin" type="number" defaultValue={job?.salaryMin} />
            </Field>
            <Field htmlFor="salaryMax" label="Salary maximum">
              <Input id="salaryMax" name="salaryMax" type="number" defaultValue={job?.salaryMax} />
            </Field>
            <Field htmlFor="currency" label="Currency">
              <Input id="currency" name="currency" defaultValue={job?.currency ?? "USD"} />
            </Field>
            <Field htmlFor="applicationDeadline" label="Application deadline">
              <Input id="applicationDeadline" name="applicationDeadline" type="date" defaultValue={job?.applicationDeadline?.slice(0, 10)} />
            </Field>
          </div>
        </section>
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              if (statusRef.current) statusRef.current.value = "DRAFT";
            }}
          >
            Save draft
          </Button>
          <Button
            type="submit"
            variant="teal"
            className="rounded-full"
            onClick={() => {
              if (statusRef.current) statusRef.current.value = "PUBLISHED";
            }}
          >
            Publish
          </Button>
        </div>
      </div>
    </ActionForm>
  );
}
