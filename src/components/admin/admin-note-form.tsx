"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Textarea } from "@/components/ui/textarea";
import { adminAddNote } from "@/server/actions/admin";

export function AdminNoteForm({ applicationId, candidateId }: { applicationId: string; candidateId?: string }) {
  return (
    <ActionForm action={adminAddNote} submitLabel="Add internal note">
      <input type="hidden" name="applicationId" value={applicationId} />
      {candidateId ? <input type="hidden" name="candidateId" value={candidateId} /> : null}
      <Field htmlFor="body" label="Internal note" hint="Never visible to candidates.">
        <Textarea id="body" name="body" required placeholder="Assessment, next steps, or interview notes…" />
      </Field>
    </ActionForm>
  );
}
