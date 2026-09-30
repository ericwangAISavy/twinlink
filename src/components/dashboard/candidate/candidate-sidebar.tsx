"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bookmark,
  Briefcase,
  ClipboardList,
  FileText,
  Inbox,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard/candidate", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/candidate/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/candidate/resume", label: "Resume", icon: FileText },
  { href: "/dashboard/candidate/jobs", label: "Browse roles", icon: Briefcase },
  { href: "/dashboard/candidate/applications", label: "Applications", icon: ClipboardList },
  { href: "/dashboard/candidate/saved", label: "Saved jobs", icon: Bookmark },
  { href: "/dashboard/candidate/messages", label: "Messages", icon: Inbox },
  { href: "/dashboard/candidate/settings", label: "Settings", icon: Settings },
] as const;

export function CandidateSidebar({
  unread,
  onNavigate,
  onPending,
}: {
  unread: number;
  onNavigate?: () => void;
  onPending?: () => void;
}) {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const currentPath = pendingHref ?? pathname;

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-2 text-[#f4efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
      >
        <TwinlinkMark className="size-6 text-[#c4a574]" />
        <span className="font-serif text-2xl tracking-wide">Twinlink</span>
      </Link>
      <p className="mt-1 px-2 text-xs text-[#a89b88]">Candidate portal</p>

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Candidate dashboard">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const home = link.href === "/dashboard/candidate";
          const active = home ? currentPath === link.href : currentPath.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => {
                if (!active) {
                  setPendingHref(link.href);
                  onPending?.();
                }
                onNavigate?.();
              }}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]",
                active
                  ? "border border-[#c4a574]/80 bg-[#c4a574]/10 text-[#f3e6c8]"
                  : "text-[#d8cfc3] hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="flex-1">{link.label}</span>
              {link.href === "/dashboard/candidate/messages" && unread > 0 ? (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                  {unread}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4">
        <SignOutButton
          icon
          variant="ghost"
          className="h-10 w-full justify-start rounded-xl px-3 text-[#d8cfc3] hover:bg-white/10 hover:text-white"
        />
      </div>
    </div>
  );
}
