"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Textarea } from "@/components/ui/textarea";
import { sendApplicationMessage } from "@/server/actions/messages";

export function MessageForm({ applicationId }: { applicationId: string }) {
  return (
    <ActionForm action={sendApplicationMessage} submitLabel="Send message">
      <input type="hidden" name="applicationId" value={applicationId} />
      <Field htmlFor="body" label="Message">
        <Textarea id="body" name="body" required placeholder="Write a note about next steps…" />
      </Field>
    </ActionForm>
  );
}
