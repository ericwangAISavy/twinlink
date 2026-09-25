"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Briefcase, Building2, Home, Inbox, Settings, UserRound, Bookmark, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const employeeLinks = [
  { href: "/dashboard/employee", label: "Overview", icon: Home },
  { href: "/dashboard/employee/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/employee/company", label: "Company", icon: Building2 },
  { href: "/dashboard/employee/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/employee/applicants", label: "Applicants", icon: FileText },
  { href: "/dashboard/employee/messages", label: "Messages", icon: Inbox },
  { href: "/dashboard/employee/settings", label: "Settings", icon: Settings },
];

const candidateLinks = [
  { href: "/dashboard/candidate", label: "Overview", icon: Home },
  { href: "/dashboard/candidate/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/candidate/resume", label: "Resume", icon: FileText },
  { href: "/dashboard/candidate/jobs", label: "Browse roles", icon: Briefcase },
  { href: "/dashboard/candidate/applications", label: "Applications", icon: FileText },
  { href: "/dashboard/candidate/saved", label: "Saved jobs", icon: Bookmark },
  { href: "/dashboard/candidate/messages", label: "Messages", icon: Inbox },
  { href: "/dashboard/candidate/settings", label: "Settings", icon: Settings },
];

export function DashboardNav({
  role,
  unread,
}: {
  role: "EMPLOYEE" | "CANDIDATE";
  unread: number;
}) {
  const pathname = usePathname();
  const links = role === "EMPLOYEE" ? employeeLinks : candidateLinks;
  const home = role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate";

  return (
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
      {links.map((link) => {
        const active = pathname === link.href || (link.href !== home && pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
      <div className="mt-4 flex items-center gap-2 px-3 text-xs text-white/50">
        <Bell className="size-3.5" />
        {unread} unread notifications
      </div>
    </nav>
  );
}
