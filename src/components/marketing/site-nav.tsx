"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  FileText,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#people", label: "Engineering Network" },
  { href: "/careers", label: "Careers" },
] as const;

const RESOURCES = [
  {
    href: "/case-studies",
    label: "Case Studies",
    description: "Explore our approach to complex challenges.",
    icon: FileText,
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Perspectives on engineering and delivery.",
    icon: BookOpen,
  },
  {
    href: "/events",
    label: "Events",
    description: "Conversations that connect our community.",
    icon: CalendarDays,
  },
] as const;

const itemStyle =
  "rounded-lg px-3 py-3 text-white/80 hover:bg-white/5 focus:bg-white/5 focus:text-[#e8d5a3]";
const panelStyle = "border-white/15 bg-[#151310] p-2 text-white shadow-2xl";

export function SiteNav({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const active = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));
  const resourcesActive = RESOURCES.some((item) => active(item.href));
  const linkStyle = (href: string) =>
    cn(
      "rounded-sm py-2 transition-colors hover:text-[#e8d5a3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8d5a3]",
      active(href) &&
        "text-[#e8d5a3] underline decoration-[#e8d5a3] underline-offset-8",
    );

  return (
    <div className="order-3 xl:order-none">
      <nav
        className="hidden items-center gap-5 text-sm text-white/75 xl:flex"
        aria-label="Primary"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active(item.href) ? "page" : undefined}
            className={linkStyle(item.href)}
          >
            {item.label}
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-1.5 rounded-sm py-2 outline-none transition-colors hover:text-[#e8d5a3] focus-visible:ring-2 focus-visible:ring-[#e8d5a3] data-[state=open]:text-[#e8d5a3] [&[data-state=open]>svg]:rotate-180",
              resourcesActive && "text-[#e8d5a3] underline underline-offset-8",
            )}
          >
            Resources <ChevronDown size={14} className="transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={18}
            className={cn(panelStyle, "w-80 rounded-xl")}
          >
            <DropdownMenuLabel className="px-3 pb-3 pt-2 text-[10px] uppercase tracking-[.25em] text-[#c4a574]">
              Ideas, experience & community
            </DropdownMenuLabel>
            {RESOURCES.map((item) => (
              <DropdownMenuItem key={item.href} asChild className={itemStyle}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className="gap-3"
                >
                  <item.icon className="size-5 shrink-0 text-[#c4a574]" />
                  <span>
                    <span
                      className={cn(
                        "block font-medium",
                        active(item.href) && "text-[#e8d5a3]",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/55">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="mx-2 my-2 bg-white/10" />
            <DropdownMenuItem asChild className={itemStyle}>
              <Link href="/#insights" className="justify-between">
                Featured Insights <ArrowUpRight size={15} />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/contact"
          className={linkStyle("/contact")}
          aria-current={active("/contact") ? "page" : undefined}
        >
          Contact
        </Link>
      </nav>
      <nav aria-label="Mobile primary" className="xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open navigation"
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-[#e8d5a3] outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#e8d5a3]"
          >
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={16}
            className={cn(
              panelStyle,
              "max-h-[calc(100dvh-6rem)] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-xl",
            )}
          >
            <DropdownMenuLabel className="px-3 py-2 text-[10px] uppercase tracking-[.25em] text-[#c4a574]">
              Explore Twinlink
            </DropdownMenuLabel>
            {NAV.map((item) => (
              <DropdownMenuItem key={item.href} asChild className={itemStyle}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={cn(active(item.href) && "text-[#e8d5a3]")}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="mx-2 my-2 bg-white/10" />
            <DropdownMenuLabel className="px-3 py-2 text-[10px] uppercase tracking-[.25em] text-[#c4a574]">
              Resources
            </DropdownMenuLabel>
            {[
              ...RESOURCES,
              { href: "/#insights", label: "Featured Insights" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <DropdownMenuItem key={item.href} asChild className={itemStyle}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={cn(active(item.href) && "text-[#e8d5a3]")}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="mx-2 my-2 bg-white/10" />
            {signedIn ? (
              <DropdownMenuItem asChild className={itemStyle}>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild className={itemStyle}>
                <Link href="/login">Sign in</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
