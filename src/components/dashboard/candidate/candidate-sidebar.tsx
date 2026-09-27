"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
}: {
  unread: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-1 text-[#1c1916] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <TwinlinkMark className="size-7 text-[#c4a574]" />
        <span className="font-serif text-2xl tracking-wide">Twinlink</span>
      </Link>
      <p className="mt-1 px-1 text-xs text-muted-foreground">Candidate portal</p>

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Candidate dashboard">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const home = link.href === "/dashboard/candidate";
          const active = home ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active
                  ? "bg-[#1c1916] text-[#f4efe6] shadow-sm"
                  : "text-[#5c5348] hover:bg-[#f4efe6] hover:text-[#1c1916]",
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

      <div className="mt-6 border-t border-[#eadfcd] pt-4">
        <SignOutButton variant="ghost" className="w-full justify-start text-[#5c5348] hover:bg-[#f4efe6]" />
      </div>
    </div>
  );
}
