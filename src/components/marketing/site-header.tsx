import Link from "next/link";
import { Suspense } from "react";
import { SiteNav } from "@/components/marketing/site-nav";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";
import type { AppUser } from "@/lib/types";

export function SiteHeader({ user }: { user: AppUser | null }) {
  return (
    <header className="foundation-header">
      <div className="foundation-container foundation-header-inner">
        <Link href="/" className="foundation-brand" aria-label="TwinLink home">
          <TwinlinkMark className="foundation-mark" />
          <span>TWINLINK</span>
        </Link>
        <Suspense fallback={null}>
          <SiteNav signedIn={Boolean(user)} />
        </Suspense>
      </div>
    </header>
  );
}
