import { cn } from "@/lib/utils";

/** Twin-arc spinner — two opposing champagne strokes, echoing the Twinlink mark. */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-4 shrink-0 animate-spin text-[#c4a574]", className)}
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.75" />
      <path
        d="M12 3.75a8.25 8.25 0 0 1 8.25 8.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 20.25a8.25 8.25 0 0 1-8.25-8.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

export function PageSpinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      aria-busy="true"
      className={cn("grid min-h-[50vh] place-items-center", className)}
    >
      <Spinner className="size-9" />
    </div>
  );
}
