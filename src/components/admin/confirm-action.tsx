"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/loading-spinner";
import type { ActionResult } from "@/lib/action-result";

export function ConfirmAction({
  label,
  message,
  action,
}: {
  label: string;
  message: string;
  action: () => Promise<ActionResult>;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className="inline-flex items-center gap-1 text-sm text-accent hover:underline disabled:opacity-50"
      onClick={() => {
        if (!window.confirm(message)) return;
        startTransition(async () => {
          const result = await action();
          if (result.ok) toast.success(result.message ?? "Updated");
          else toast.error(result.error);
        });
      }}
    >
      {pending ? <Spinner className="size-3.5" /> : null}
      {pending ? "Updating…" : label}
    </button>
  );
}
