"use client";

import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { adminScheduleInterview } from "@/server/actions/admin";

export function AdminInterviewForm({ applicationId }: { applicationId: string }) {
  return (
    <ActionForm action={adminScheduleInterview} submitLabel="Schedule interview">
      <input type="hidden" name="applicationId" value={applicationId} />
      <div className="grid gap-3">
        <Field htmlFor="scheduledAt" label="Date and time">
          <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required />
        </Field>
        <Field htmlFor="interviewType" label="Interview type">
          <select id="interviewType" name="interviewType" defaultValue="video" className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
            <option value="video">Video</option>
            <option value="phone">Phone</option>
            <option value="onsite">On-site</option>
          </select>
        </Field>
        <Field htmlFor="scheduledEnd" label="End time">
          <Input id="scheduledEnd" name="scheduledEnd" type="datetime-local" />
        </Field>
        <Field htmlFor="timezone" label="Timezone">
          <Input id="timezone" name="timezone" placeholder="America/Los_Angeles" />
        </Field>
        <Field htmlFor="meetingLocation" label="Location">
          <Input id="meetingLocation" name="meetingLocation" placeholder="Office, room, or city" />
        </Field>
        <Field htmlFor="meetingUrl" label="Meeting URL">
          <Input id="meetingUrl" name="meetingUrl" placeholder="https://" />
        </Field>
        <Field htmlFor="candidateInstructions" label="Instructions for the candidate">
          <Input id="candidateInstructions" name="candidateInstructions" placeholder="What the candidate should know" />
        </Field>
        <Field htmlFor="internalNotes" label="Internal notes">
          <Input id="internalNotes" name="internalNotes" placeholder="Visible only to staff" />
        </Field>
      </div>
    </ActionForm>
  );
}
