"use client";

import { ActionForm } from "@/components/action-form";
import { APPLICATION_STATUSES, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { updateApplicationStatus } from "@/server/actions/applications";

export function StatusForm({
  applicationId,
  status,
}: {
  applicationId: string;
  status: (typeof APPLICATION_STATUSES)[number];
}) {
  return (
    <ActionForm action={updateApplicationStatus} submitLabel="Update status">
      <input type="hidden" name="applicationId" value={applicationId} />
      <label className="block text-sm font-medium" htmlFor="status">
        Application status
      </label>
      <select
        id="status"
        name="status"
        defaultValue={status}
        className="mt-2 flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
      >
        {APPLICATION_STATUSES.map((value) => (
          <option key={value} value={value}>
            {APPLICATION_STATUS_LABELS[value]}
          </option>
        ))}
      </select>
    </ActionForm>
  );
}
