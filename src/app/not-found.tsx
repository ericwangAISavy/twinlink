import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-serif text-4xl">Page not found</h1>
      <p className="mt-3 text-muted-foreground">That route is not part of TwinLink.</p>
      <Button asChild className="mt-6">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
