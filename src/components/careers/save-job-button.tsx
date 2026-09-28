"use client";

import { useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { toggleSavedJob } from "@/server/actions/jobs";

export function SaveJobButton({ jobId, saved }: { jobId: string; saved: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant={saved ? "teal" : "outline"}
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const result = await toggleSavedJob(jobId);
          if (!result.ok) toast.error(result.error);
          else toast.success(result.message);
        });
      }}
    >
      {pending ? <Spinner className="text-current" /> : <Bookmark className={saved ? "fill-current" : ""} />}
      {pending ? "Saving…" : saved ? "Saved" : "Save role"}
    </Button>
  );
}
