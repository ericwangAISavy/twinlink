"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/loading-spinner";
import { cn } from "@/lib/utils";

export function SignOutButton({
  className,
  variant = "outline",
  icon = false,
}: {
  className?: string;
  variant?: "outline" | "ghost" | "teal" | "default";
  icon?: boolean;
}) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      className={cn("whitespace-nowrap", className)}
      disabled={pending}
      onClick={() => {
        setPending(true);
        window.location.assign("/auth/sign-out");
      }}
    >
      {pending ? <Spinner className="text-current" /> : icon ? <LogOut aria-hidden /> : null}
      Sign out
    </Button>
  );
}
