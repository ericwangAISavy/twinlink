import { useId } from "react";

/** Twinlink twin-stripe mark in metallic gold (matches the brand logo artwork). */
export function TwinlinkMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={className}>
      <defs>
        <linearGradient id={`tl-gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset=".45" stopColor="#f2b51c" />
          <stop offset="1" stopColor="#b97a06" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#tl-gold-${id})`}
        d="M4 20.5 12.2 6.8h5.2L9.2 20.5H4Zm7.4 0 8.2-13.7H25L16.6 20.5h-5.2Z"
      />
    </svg>
  );
}
