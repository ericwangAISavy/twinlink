"use client";

export function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl">Dashboard unavailable</h1>
      <p className="mt-2 text-sm text-muted-foreground">Something went wrong loading this page. Try again.</p>
      <button className="mt-4 text-sm text-accent underline" onClick={reset} type="button">
        Retry
      </button>
    </div>
  );
}

export default DashboardError;
