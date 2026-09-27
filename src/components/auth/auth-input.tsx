import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 rounded-full border-white/15 bg-black/35 pl-11 text-white shadow-none placeholder:text-white/35 focus-visible:ring-[#c4a574]";

export function AuthInput({
  icon: Icon,
  className,
  trailing,
  ...props
}: ComponentProps<typeof Input> & {
  icon: LucideIcon;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#c4a574]" />
      <Input className={cn(fieldClass, trailing && "pr-11", className)} {...props} />
      {trailing ? (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</div>
      ) : null}
    </div>
  );
}
