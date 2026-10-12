"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
export function VisitorRefresh() {
  const router = useRouter();
  const [automatic, setAutomatic] = useState(true);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (!automatic) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible")
        startTransition(() => router.refresh());
    }, 30000);
    return () => clearInterval(timer);
  }, [automatic, router]);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <button
        className="rounded-full border border-[#d9c6a4] px-4 py-2 text-sm"
        disabled={pending}
        onClick={() => startTransition(() => router.refresh())}
      >
        {pending ? "Refreshing…" : "Refresh visits"}
      </button>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={automatic}
          onChange={(event) => setAutomatic(event.target.checked)}
        />
        Refresh every 30 seconds
      </label>
    </div>
  );
}
