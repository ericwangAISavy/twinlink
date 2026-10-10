"use client";
import { useState } from "react";
export function ContactForm({
  email,
  subject = "",
}: {
  email: string;
  subject?: string;
}) {
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nOrganization: ${form.get("organization") || "Not provided"}\nTopic: ${form.get("topic")}\n\n${form.get("message")}`;
    setDraft(
      `mailto:${email}?subject=${encodeURIComponent(subject || `Twinlink enquiry: ${form.get("topic")}`)}&body=${encodeURIComponent(body)}`,
    );
    setReady(true);
  }
  const field =
    "mt-2 w-full rounded-lg border border-white/20 bg-[#171510] px-4 py-3 text-white focus:border-[#e8d5a3] focus:outline-none focus:ring-1 focus:ring-[#e8d5a3]";
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-white/80">
          Your name <span aria-hidden="true">*</span>
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={field}
          />
        </label>
        <label className="text-sm text-white/80">
          Email <span aria-hidden="true">*</span>
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={field}
          />
        </label>
      </div>
      <label className="block text-sm text-white/80">
        Organization
        <input
          name="organization"
          maxLength={150}
          autoComplete="organization"
          className={field}
        />
      </label>
      <label className="block text-sm text-white/80">
        What would you like to discuss?
        <select
          name="topic"
          className={field}
          defaultValue={subject ? "Event interest" : "Project partnership"}
        >
          <option>Project partnership</option>
          <option>Engineering careers</option>
          <option>Event interest</option>
          <option>General enquiry</option>
        </select>
      </label>
      <label className="block text-sm text-white/80">
        Your message <span aria-hidden="true">*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="Tell us a little about your goals and how we can help."
          className={field}
        />
      </label>
      <p className="text-xs leading-relaxed text-white/60">
        This form prepares a message in your email app. Review and send it
        there; nothing is submitted to this website. Please leave out passwords
        and sensitive personal information.
      </p>
      <button
        type="submit"
        className="rounded-full bg-[#e8d5a3] px-7 py-3 font-medium text-[#0c0b0a] hover:bg-[#f4e5c3]"
      >
        Prepare email
      </button>
      {ready && (
        <p
          role="status"
          className="rounded-lg border border-[#c4a574]/30 p-4 text-sm text-[#e8d5a3]"
        >
          Your email draft is prepared.{" "}
          <a href={draft} className="font-medium underline">
            Open email draft
          </a>{" "}
          in your email app, or write directly to{" "}
          <a className="underline" href={`mailto:${email}`}>
            {email}
          </a>
          . Your message has not been sent.
        </p>
      )}
    </form>
  );
}
