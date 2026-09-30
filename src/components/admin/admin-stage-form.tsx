"use client";

import { useState } from "react";
import { ActionForm } from "@/components/action-form";
import {
  ALL_HIRING_STAGES,
  getHiringStageLabel,
  transitionNeedsConfirmation,
  type HiringStage,
} from "@/lib/hiring-stages";
import { adminUpdateApplicationStatus } from "@/server/actions/admin";

export function AdminStageForm({
  applicationId,
  stage,
}: {
  applicationId: string;
  stage: HiringStage;
}) {
  const [next, setNext] = useState<HiringStage>(stage);
  const needsConfirmation = transitionNeedsConfirmation(stage, next);

  return (
    <ActionForm action={adminUpdateApplicationStatus} submitLabel="Update stage">
      <input type="hidden" name="applicationId" value={applicationId} />
      <label className="block text-sm font-medium" htmlFor="status">
        Current stage
      </label>
      <select
        id="status"
        name="status"
        value={next}
        onChange={(event) => setNext(event.target.value as HiringStage)}
        className="mt-2 flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
      >
        {ALL_HIRING_STAGES.map((value) => (
          <option key={value} value={value}>
            {getHiringStageLabel(value)}
          </option>
        ))}
      </select>
      <label className="mt-3 block text-sm font-medium" htmlFor="candidateMessage">
        Candidate-visible note
      </label>
      <textarea
        id="candidateMessage"
        name="candidateMessage"
        rows={3}
        className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
        placeholder="Optional note the candidate can read"
      />
      {needsConfirmation ? (
        <label className="mt-3 flex items-start gap-2 text-sm">
          <input type="checkbox" name="confirm" value="yes" required className="mt-1 accent-[#c4a574]" />
          <span>This skips, reverses, or closes the usual sequence. Confirm this change.</span>
        </label>
      ) : null}
    </ActionForm>
  );
}
