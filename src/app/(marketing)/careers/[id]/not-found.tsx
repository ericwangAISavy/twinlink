import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function JobNotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-serif text-3xl">Role not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This posting is closed or does not exist.
      </p>
      <Button asChild className="mt-6">
        <Link href="/careers">Back to careers</Link>
      </Button>
    </div>
  );
}
