"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { initials } from "@/lib/utils";

const TITLES: Record<string, string> = {
  "/dashboard/candidate": "Overview",
  "/dashboard/candidate/profile": "Profile",
  "/dashboard/candidate/resume": "Resume",
  "/dashboard/candidate/jobs": "Browse roles",
  "/dashboard/candidate/applications": "Applications",
  "/dashboard/candidate/saved": "Saved jobs",
  "/dashboard/candidate/messages": "Messages",
  "/dashboard/candidate/settings": "Settings",
};

function pageTitle(pathname: string) {
  const match = Object.keys(TITLES)
    .sort((a, b) => b.length - a.length)
    .find((href) => pathname === href || pathname.startsWith(`${href}/`));
  return match ? TITLES[match] : "Dashboard";
}

export function CandidateTopbar({
  name,
  email,
  image,
  unread,
  onMenuClick,
}: {
  name: string | null;
  email: string;
  image: string | null;
  unread: number;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const title = pageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-[#eadfcd] bg-white/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <span className="sr-only">Open navigation</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </Button>

        <p className="hidden text-base font-medium text-[#1c1916] sm:block">{title}</p>

        <form action="/dashboard/candidate/jobs" method="get" className="relative ml-auto hidden min-w-0 flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            type="search"
            placeholder="Search published roles"
            aria-label="Search published roles"
            className="rounded-full border-[#eadfcd] bg-[#faf7f1] pl-9"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button asChild variant="ghost" size="icon" className="relative rounded-full">
            <Link href="/dashboard/candidate/messages" aria-label={unread ? `${unread} unread alerts` : "Messages"}>
              <Bell className="size-4" />
              {unread > 0 ? (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
              ) : null}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 text-left transition-colors hover:bg-[#eadfcd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent data-[state=open]:bg-[#eadfcd]"
              >
                <Avatar className="size-9">
                  {image ? <AvatarImage src={image} alt="" /> : null}
                  <AvatarFallback>{initials(name, email)}</AvatarFallback>
                </Avatar>
                <span className="hidden min-w-0 sm:block">
                  <span className="block truncate text-sm font-medium">{name ?? email}</span>
                  <span className="block text-xs text-muted-foreground">Candidate</span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <p className="truncate text-sm font-medium">{name ?? "Candidate"}</p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/candidate/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/candidate/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <form action="/dashboard/candidate/jobs" method="get" className="border-t border-[#eadfcd] px-4 py-2 md:hidden">
        <label className="sr-only" htmlFor="candidate-role-search">
          Search published roles
        </label>
        <Input
          id="candidate-role-search"
          name="q"
          type="search"
          placeholder="Search published roles"
          className="rounded-full border-[#eadfcd] bg-[#faf7f1]"
        />
      </form>
    </header>
  );
}
