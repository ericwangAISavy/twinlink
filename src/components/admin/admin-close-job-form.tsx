"use client";

import { ActionForm } from "@/components/action-form";
import { adminCloseJob } from "@/server/actions/admin";

export function AdminCloseJobForm({ jobId, closed }: { jobId: string; closed: boolean }) {
  if (closed) return null;
  return (
    <ActionForm action={adminCloseJob} submitLabel="Close role">
      <input type="hidden" name="jobId" value={jobId} />
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="closeApplications" value="yes" className="mt-1 accent-[#c4a574]" />
        <span>Also move active applications for this role to Position closed. Existing history stays intact.</span>
      </label>
    </ActionForm>
  );
}
