import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Dark surface reserved for photography the user will upload later. */
export function MediaPlaceholder({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#141210]",
        className,
      )}
    >
      {children}
    </div>
  );
}
