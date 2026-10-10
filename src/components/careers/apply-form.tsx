"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Textarea } from "@/components/ui/textarea";
import { applyToJob } from "@/server/actions/applications";

export function ApplyForm({ jobId }: { jobId: string }) {
  return (
    <ActionForm action={applyToJob} submitLabel="Submit application">
      <input type="hidden" name="jobId" value={jobId} />
      <Field htmlFor="coverLetter" label="Cover letter (optional)">
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Share why this role is a fit."
        />
      </Field>
      <p className="mt-2 text-xs text-muted-foreground">
        Twinlink attaches the resume currently on your profile. You can update it from your candidate Resume page before applying.
      </p>
    </ActionForm>
  );
}
