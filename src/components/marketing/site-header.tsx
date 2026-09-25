import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-primary-foreground backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl tracking-tight">
          TwinLink
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex" aria-label="Primary">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/careers" className="hover:text-white">
            Careers
          </Link>
          <Link href="/#capabilities" className="hover:text-white">
            Capabilities
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <Button asChild size="sm" variant="teal">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant="teal">
                <Link href="/register">Join as candidate</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
