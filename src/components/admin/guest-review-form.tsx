"use client";
import { ActionForm } from "@/components/action-form";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
} from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/form-field";
import { reviewGuestApplication } from "@/server/actions/guest-applications";
import type { GuestApplication } from "@/server/queries/guest-applications";

export function GuestReviewForm({ entry }: { entry: GuestApplication }) {
  return (
    <ActionForm action={reviewGuestApplication} submitLabel="Save review">
      <input type="hidden" name="id" value={entry.id} />
      <input type="hidden" name="updatedAt" value={entry.updatedAt} />
      <Field htmlFor="guest-status" label="Application status">
        <select
          id="guest-status"
          name="status"
          defaultValue={entry.status}
          className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
        >
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {APPLICATION_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </Field>
      <Field htmlFor="guest-notes" label="Private review notes">
        <Textarea
          id="guest-notes"
          name="notes"
          defaultValue={entry.notes}
          maxLength={10000}
        />
      </Field>
      <p className="text-xs text-muted-foreground">
        Saving a review does not send an email. Contact the applicant directly
        using their provided email.
      </p>
    </ActionForm>
  );
}
