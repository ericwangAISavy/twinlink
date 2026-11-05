import { cn } from "@/lib/utils";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";
import "./loading-spinner.css";

/** Twin-arc spinner; button callers can continue to inherit their text color. */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("twinlink-spinner size-4 shrink-0 animate-spin text-current", className)}
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
      className={cn("twinlink-page-loading grid min-h-[50vh] place-items-center", className)}
    >
      <div className="twinlink-loading-content">
        <div className="twinlink-loading-brand" aria-hidden="true">
          <TwinlinkMark className="size-8" />
          <span>TWINLINK</span>
        </div>
        <Spinner className="size-8 text-[#157cbf]" />
        <p>Loading</p>
      </div>
    </div>
  );
}

export function MainPanelLoading() {
  return <PageSpinner />;
}
