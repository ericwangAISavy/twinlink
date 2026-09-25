"use client";

import { useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/action-result";

export function ActionForm({
  action,
  children,
  submitLabel = "Save",
  className,
  onSuccess,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  children: ReactNode;
  submitLabel?: string;
  className?: string;
  onSuccess?: (message?: string) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          setError(null);
          try {
            const result = await action(formData);
            if (!result.ok) {
              setError(result.error);
              toast.error(result.error);
              return;
            }
            toast.success(result.message ?? "Saved");
            onSuccess?.(result.message);
          } catch (error) {
            const digest =
              typeof error === "object" && error && "digest" in error
                ? String((error as { digest?: string }).digest)
                : "";
            if (digest.startsWith("NEXT_REDIRECT")) throw error;
            const message = error instanceof Error ? error.message : "Something went wrong.";
            setError(message);
            toast.error(message);
          }
        });
      }}
    >
      {children}
      {error ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="mt-4" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
