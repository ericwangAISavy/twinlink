"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl">Dashboard unavailable</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This usually means the database is not configured yet. Add a real DATABASE_URL and retry.
      </p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
