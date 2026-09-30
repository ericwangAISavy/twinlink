"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteCandidate, setCandidateAccess } from "@/server/actions/admin";

export function CandidateAccessControls({
  userId,
  accessStatus,
  name,
}: {
  userId: string;
  accessStatus: "pending" | "approved";
  name: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<"status" | "delete" | null>(null);
  const approved = accessStatus === "approved";

  async function changeAccess() {
    setPending("status");
    try {
      const result = await setCandidateAccess(userId, approved ? "pending" : "approved");
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function removeCandidate() {
    const label = name || "this candidate";
    if (!window.confirm(`Remove ${label}? Their account and applications will be deleted.`)) return;
    setPending("delete");
    try {
      const result = await deleteCandidate(userId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      router.refresh();
      if (window.location.pathname.includes(`/admin/candidates/${userId}`)) {
        router.push("/admin/candidates");
      }
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <span className={approved ? "text-sm text-muted-foreground" : "text-sm text-[#8a4b2f]"}>
        {approved ? "Approved" : "Pending approval"}
      </span>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          className="rounded-full bg-[#1c1916] text-white hover:bg-[#2a241e]"
          disabled={pending !== null}
          onClick={() => void changeAccess()}
        >
          {pending === "status" ? "Saving…" : approved ? "Revoke access" : "Approve access"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-red-300 text-red-700 hover:bg-red-50"
          disabled={pending !== null}
          onClick={() => void removeCandidate()}
        >
          {pending === "delete" ? "Removing…" : "Delete"}
        </Button>
      </div>
    </div>
  );
}
