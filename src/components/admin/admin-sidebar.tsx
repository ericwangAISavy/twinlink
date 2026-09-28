"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  Settings,
  Shield,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";
import { cn } from "@/lib/utils";

const GROUPS = [
  {
    label: null,
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Recruiting",
    items: [
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
      { href: "/admin/applications", label: "Applications", icon: ClipboardList },
      { href: "/admin/candidates", label: "Candidates", icon: Users },
      { href: "/admin/interviews", label: "Interviews", icon: Video },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/employees", label: "Employees", icon: Building2 },
      { href: "/admin/invitations", label: "Invitations", icon: UserPlus },
    ],
  },
  {
    label: "Communication",
    items: [
      { href: "/admin/messages", label: "Messages", icon: Inbox },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/activity", label: "Activity", icon: Activity },
      { href: "/admin/content", label: "Website Content", icon: FileText },
      { href: "/admin/resources", label: "Resources", icon: FolderOpen },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/users", label: "Users & Roles", icon: Shield },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

export function AdminSidebar({ onNavigate, unread = 0 }: { onNavigate?: () => void; unread?: number }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col text-[#f4efe6]">
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex items-center gap-2 px-1 text-[#e8d5a3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
      >
        <TwinlinkMark className="size-7" />
        <span className="font-serif text-2xl tracking-wide">Twinlink</span>
      </Link>
      <p className="mt-1 px-1 text-[10px] font-semibold tracking-[0.18em] text-[#c4a574]/80 uppercase">
        Admin console
      </p>

      <nav className="mt-8 flex-1 space-y-5 overflow-y-auto pr-1" aria-label="Admin">
        {GROUPS.map((group) => (
          <div key={group.label ?? "overview"}>
            {group.label ? (
              <p className="mb-1 px-3 text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                {group.label}
              </p>
            ) : null}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]",
                      active
                        ? "bg-[#c4a574] font-medium text-[#1c1916]"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="flex-1">{item.label}</span>
                    {item.href === "/admin/notifications" && unread > 0 ? (
                      <span className="rounded-full bg-[#c4a574] px-1.5 py-0.5 text-[10px] font-medium text-[#1c1916]">
                        {unread}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <Link
        href="/"
        onClick={onNavigate}
        className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/15 px-3 py-2 text-sm text-[#e8d5a3] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
      >
        View public site
      </Link>
    </div>
  );
}
