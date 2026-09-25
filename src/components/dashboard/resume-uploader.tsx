"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResumeUploader({ configured }: { configured: boolean }) {
  const [busy, setBusy] = useState(false);

  if (!configured) {
    return (
      <p className="rounded-md border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        Resume upload is unavailable until a Vercel Blob token is configured (`BLOB_READ_WRITE_TOKEN`).
        You can still complete your profile and apply.
      </p>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (event) => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("file") as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) {
          toast.error("Choose a PDF or Word resume.");
          return;
        }
        setBusy(true);
        try {
          const body = new FormData();
          body.append("file", file);
          const response = await fetch("/api/upload", { method: "POST", body });
          const payload = (await response.json()) as { error?: string; ok?: boolean };
          if (!response.ok) {
            toast.error(payload.error ?? "Upload failed.");
            return;
          }
          toast.success("Resume uploaded.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <label htmlFor="file" className="text-sm font-medium">
        Resume file
      </label>
      <Input id="file" name="file" type="file" accept=".pdf,.doc,.docx,application/pdf" required />
      <Button type="submit" disabled={busy}>
        {busy ? "Uploading…" : "Upload resume"}
      </Button>
    </form>
  );
}
