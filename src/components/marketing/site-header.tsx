import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/server/authorization";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/marketing/site-nav";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0b0a]/55 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-[#e8d5a3]">
          <TwinlinkMark className="size-7" />
          <span className="font-serif text-2xl tracking-wide">Twinlink</span>
        </Link>
        <SiteNav />
        <div className="flex items-center gap-2">
          {user ? (
            <Button asChild size="sm" variant="teal" className="rounded-full">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost" className="text-white hover:bg-white/10 hover:text-[#e8d5a3]">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant="teal" className="rounded-full">
                <Link href="/register">
                  Join as a candidate <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
