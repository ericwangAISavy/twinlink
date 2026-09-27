"use client";

import { signOutAction } from "@/server/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function SignOutButton({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: "outline" | "ghost" | "teal" | "default";
}) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      className={className}
      onClick={async () => {
        try {
          const supabase = createBrowserSupabaseClient();
          await supabase.auth.signOut();
        } catch {
          await signOutAction();
        }
        router.push("/");
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
}
