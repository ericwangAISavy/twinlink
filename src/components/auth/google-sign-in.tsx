"use client";

import { useState } from "react";
import { beginGoogleSignIn } from "@/server/actions/google-auth";
import { Spinner } from "@/components/loading-spinner";

export function GoogleSignIn({
  next,
  invite,
  disabled,
}: {
  next?: string | null;
  invite?: string;
  disabled?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={pending || disabled}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-[#1c1916] transition hover:bg-[#f4eee4] disabled:cursor-wait disabled:opacity-60"
        onClick={async () => {
          setPending(true);
          setError(null);
          try {
            const result = await beginGoogleSignIn({ next, invite });
            if (result.url) window.location.assign(result.url);
            else {
              setError(result.error || "Google sign-in could not be started.");
              setPending(false);
            }
          } catch {
            setError("Google sign-in could not be started. Please try again.");
            setPending(false);
          }
        }}
      >
        {pending ? (
          <Spinner />
        ) : (
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.89-1.74 2.98-4.3 2.98-7.36Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.06.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.11-1.31.31-1.92V7.49H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.51l3.35-2.59Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.35 2.59A5.99 5.99 0 0 1 12 5.96Z"
            />
          </svg>
        )}
        {pending ? "Connecting to Google…" : "Continue with Google"}
      </button>
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/50 bg-red-950/50 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}
    </div>
  );
}
