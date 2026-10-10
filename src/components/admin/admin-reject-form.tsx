"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Textarea } from "@/components/ui/textarea";
import { rejectHiringStep } from "@/server/actions/admin";

export function AdminRejectForm({
  applicationId,
  candidateName,
  jobTitle,
}: {
  applicationId: string;
  candidateName: string;
  jobTitle: string;
}) {
  return (
    <ActionForm action={rejectHiringStep} submitLabel="Reject application" submitVariant="destructive" submitClassName="rounded-full">
      <input type="hidden" name="applicationId" value={applicationId} />
      <p className="text-sm text-muted-foreground">Closes this application. The candidate will see the message below.</p>
      <Field htmlFor="rejectMessage" label="Message to candidate" className="mt-4">
        <Textarea
          id="rejectMessage"
          name="candidateMessage"
          required
          rows={5}
          defaultValue={`Hi ${candidateName},\n\nThank you for your interest in ${jobTitle}. After review, Twinlink will not be moving forward with this application. We appreciate the time you spent with us.\n\n— Twinlink recruiting`}
        />
      </Field>
    </ActionForm>
  );
}
