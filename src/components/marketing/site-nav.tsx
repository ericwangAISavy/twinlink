"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#people", label: "Engineering Network" },
  { href: "/careers", label: "Careers" },
  { href: "/#insights", label: "Insights" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 text-sm text-white/75 lg:flex" aria-label="Primary">
      {NAV.map((item) => {
        const active = item.href.startsWith("/") && !item.href.includes("#") && pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "hover:text-[#e8d5a3]",
              active && "text-white underline decoration-[#e8d5a3] underline-offset-8",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
