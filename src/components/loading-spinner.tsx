import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/marketing/brand-logo";
import "./loading-spinner.css";

/** Ring spinner; button callers can continue to inherit their text color. */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("twinlink-spinner size-4 shrink-0 animate-spin text-current", className)}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Centered loading state. `brand` shows the official Twinlink wordmark above the
 * spinner (used for the first full-screen load); panels and cards omit it.
 */
export function PageSpinner({ className, brand = false }: { className?: string; brand?: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn("twinlink-page-loading grid min-h-[50vh] place-items-center", className)}
    >
      <div className="twinlink-loading-content">
        {brand && <BrandLogo height={40} priority />}
        <Spinner className="twinlink-loading-ring size-7" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}

export function MainPanelLoading() {
  return <PageSpinner />;
}
