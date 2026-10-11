"use client";
import { useState } from "react";
import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitGuestApplication } from "@/server/actions/guest-applications";

export function GuestApplyForm({ jobId }: { jobId: string }) {
  const [received, setReceived] = useState(false);
  if (received)
    return (
      <div
        role="status"
        className="rounded-xl border border-[#c4a574]/30 bg-[#c4a574]/10 p-5"
      >
        <h3 className="font-serif text-xl">Application received</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you. Our team will review your application and can contact you
          using the email you provided.
        </p>
      </div>
    );
  return (
    <ActionForm
      action={submitGuestApplication}
      submitLabel="Submit application"
      submitClassName="w-full"
      onSuccess={() => setReceived(true)}
    >
      <p className="mb-5 text-sm text-muted-foreground">
        Apply directly. No account or sign-in required.
      </p>
      <input type="hidden" name="jobId" value={jobId} />
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-4">
        <Field htmlFor="guest-name" label="Full name">
          <Input
            id="guest-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={150}
          />
        </Field>
        <Field htmlFor="guest-email" label="Email">
          <Input
            id="guest-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </Field>
        <Field htmlFor="guest-phone" label="Phone (optional)">
          <Input
            id="guest-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={80}
          />
        </Field>
        <Field
          htmlFor="guest-resume"
          label="Resume or portfolio link (optional)"
        >
          <Input
            id="guest-resume"
            name="resume"
            type="url"
            placeholder="https://"
            maxLength={2048}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Use a shareable HTTPS link that the hiring team can open.
          </p>
        </Field>
        <Field htmlFor="guest-cover" label="Cover letter (optional)">
          <Textarea
            id="guest-cover"
            name="cover"
            maxLength={10000}
            placeholder="Tell us about your experience and interest in this role."
          />
        </Field>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Your details are shared with Twinlink administrators for recruitment.
        This does not create an account.
      </p>
    </ActionForm>
  );
}
