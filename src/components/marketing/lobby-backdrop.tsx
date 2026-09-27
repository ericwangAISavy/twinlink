import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LobbyBackdrop({
  children,
  className,
  overlayClassName,
  imageClassName,
  priority = false,
}: {
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src="/images/twinlink-lobby.jpg"
        alt="Twinlink headquarters lobby"
        fill
        priority={priority}
        sizes="100vw"
        className={cn("object-cover object-[58%_center]", imageClassName)}
      />
      <div className={cn("absolute inset-0", overlayClassName)} aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
