"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { approveCandidateAccess } from "@/server/actions/admin";

export function ApproveCandidateButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      className="rounded-full bg-[#1c1916] text-white hover:bg-[#2a241e]"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          const result = await approveCandidateAccess(userId);
          if (!result.ok) {
            toast.error(result.error);
            return;
          }
          toast.success(result.message);
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
    >
      {pending ? "Approving…" : "Approve access"}
    </Button>
  );
}
