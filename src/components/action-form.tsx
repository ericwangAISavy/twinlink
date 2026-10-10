"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/action-result";
import { cn } from "@/lib/utils";

export function ActionForm({
  action,
  children,
  submitLabel = "Save",
  submitClassName,
  submitVariant,
  hideSubmit = false,
  className,
  resetOnSuccess = false,
  onSuccess,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  children: ReactNode;
  submitLabel?: string;
  submitClassName?: string;
  submitVariant?: "default" | "teal" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  hideSubmit?: boolean;
  className?: string;
  resetOnSuccess?: boolean;
  onSuccess?: (message?: string) => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
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
            if (resetOnSuccess) form.reset();
            router.refresh();
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
      <fieldset disabled={pending} className="min-w-0 border-0 p-0">
        {children}
      </fieldset>
      {error ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {hideSubmit ? null : (
        <Button type="submit" variant={submitVariant} className={cn("mt-4", submitClassName)} disabled={pending}>
          {pending ? <Spinner className="text-current" /> : null}
          {pending ? "Saving…" : submitLabel}
        </Button>
      )}
    </form>
  );
}
