"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { AdminSearchInput } from "@/components/admin/admin-search-input";
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
import { initials } from "@/lib/utils";

export function AdminTopbar({
  name,
  email,
  image,
  unread = 0,
  onMenuClick,
}: {
  name: string | null;
  email: string;
  image: string | null;
  unread?: number;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#eadfcd] bg-[#f7f3ec]/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </Button>
        <AdminSearchInput />
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
            <Link href="/admin/notifications">
              <Bell className="size-4" />
              {unread > 0 ? <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#c4a574]" /> : null}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]"
              >
                <Avatar className="size-8">
                  {image ? <AvatarImage src={image} alt="" /> : null}
                  <AvatarFallback>{initials(name, email)}</AvatarFallback>
                </Avatar>
                <span className="hidden min-w-0 text-left sm:block">
                  <span className="block truncate text-xs font-medium">{name ?? email}</span>
                  <span className="block text-[10px] tracking-wide text-[#c4a574] uppercase">Administrator</span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <p className="truncate text-sm font-medium">{name ?? "Admin"}</p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">View public site</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/sign-out">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SignOutButton variant="ghost" />
        </div>
      </div>
    </header>
  );
}
