"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { href } from "./links";
import { ANNOUNCEMENT, MENUS, type NavLink, type NavMenu } from "./nav-content";
import { Button, Logo } from "./ui";

const NAV_ITEM = "rounded-[6px] px-3 py-2 text-[14px] leading-5 font-semibold transition-colors duration-[250ms] hover:text-grey-750";

const external = (link: NavLink) => (href(link.to).startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

function Chevron({ open, size = 10 }: { open: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dropdown({ menu }: { menu: NavMenu }) {
  const products = menu.label === "Products";
  return (
    <div className="hc-panel absolute left-0 top-[72px] w-max pt-1.5">
      <div className="flex flex-col gap-2 rounded-[12px] border !border-grey-250 bg-white p-2 shadow-[0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)]">
        <div className="flex gap-2">
          <div className={products ? "grid grid-cols-[repeat(3,200px)] gap-2" : "flex gap-2"}>
            {menu.groups.map((group, index) => (
              <div key={group.title ?? index} className={`flex flex-col gap-0.5 ${group.title ? "w-[200px]" : "w-60"}`}>
                {group.title && <p className="px-3 pb-1 pt-2 text-[14px] font-bold leading-[21px] text-grey-500">{group.title}</p>}
                {group.links.map(link => (
                  <a key={link.label} href={href(link.to)} {...external(link)} className="flex items-center justify-between gap-3 rounded-[6px] px-3 py-2 text-[14px] leading-5 text-grey-600 hover:bg-grey-200 hover:text-grey-750">
                    {link.label}{link.external && <ExternalIcon />}
                  </a>
                ))}
              </div>
            ))}
          </div>
          {products && (
            <a href={href("/newsroom/holo4")} className="group flex w-56 flex-col gap-2 rounded-[6px] bg-grey-200 p-3">
              <span className="text-[14px] font-bold leading-[21px] text-grey-500">Featured</span>
              <span className="block aspect-video overflow-hidden rounded-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hc/holo4-cover-halftone.jpg" alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              </span>
              <span className="text-[14px] font-medium leading-5">Introducing Holo4</span>
              <span className="text-[12px] font-medium leading-[18px] text-iris-600">Read on the blog →</span>
            </a>
          )}
        </div>
        {products && (
          <a href={href("/h-platform")} className="flex items-center justify-between gap-6 rounded-[6px] bg-grey-200 p-3">
            <span className="flex flex-col gap-0.5">
              <span className="text-[14px] font-medium leading-[21px]">All four run on the Twinlink Platform</span>
              <span className="text-[12px] leading-[18px] text-grey-500">Models · Agent execution · Environments · Orchestration · Console &amp; replay · Security</span>
            </span>
            <span className="text-[14px] font-medium leading-[21px] text-iris-600">Explore the Twinlink Platform →</span>
          </a>
        )}
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const row = "flex h-10 items-center gap-2 px-3 text-[16px] text-grey-600";
  return (
    <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-112px)] overflow-y-auto bg-white px-6 pb-6 pt-[7px] shadow-[0_20px_30px_-12px_rgb(0_0_0/0.15)] lg:hidden">
      {MENUS.map(menu => {
        const expanded = open === menu.label;
        return (
          <div key={menu.label} className={`border-b !border-grey-250 ${expanded ? "pb-0" : ""}`}>
            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : menu.label)} className="flex h-14 w-full items-center justify-between px-3 text-[18px] font-medium">
              {menu.label}<span className="text-grey-500"><Chevron open={expanded} size={14} /></span>
            </button>
            {expanded && (
              <div className="hc-panel pb-3">
                {menu.groups.map((group, index) => (
                  <div key={group.title ?? index}>
                    {group.title && <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase leading-[15px] text-grey-500">{group.title}</p>}
                    {group.links.map(link => <a key={link.label} href={href(link.to)} {...external(link)} className={row}>{link.label}{link.external && <ExternalIcon />}</a>)}
                  </div>
                ))}
                {menu.label === "Products" && (
                  <div className="mt-3 border-t !border-grey-250 pt-3">
                    <a href={href("/h-platform")} className={row}>Explore the Twinlink Platform</a>
                    <a href={href("/newsroom/holo4")} className={row}>Introducing Holo4</a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className="pt-3">
        <a href={href("/pricing")} className={row}>Pricing</a>
      </div>
      <Button to="/contact?from=header#fill-out-the-form" className="mt-5 w-full">Book a demo</Button>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setActive(null); setMobile(false); } };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setMobile(false); else setActive(null); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-[margin] duration-300 ${scrolled ? "-mt-10" : ""}`}>
        <a href={href(ANNOUNCEMENT.to)} className="group flex h-10 w-full items-center justify-center gap-1.5 border-b !border-grey-250 bg-white px-6 text-[14px] font-medium leading-5 transition-opacity hover:opacity-80">
          <span className="truncate"><span className="sm:hidden">{ANNOUNCEMENT.short}</span><span className="hidden sm:inline">{ANNOUNCEMENT.long}</span></span>
          <span aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
      <div className="relative">
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 border-b !border-grey-250 bg-white transition-opacity duration-300 ${scrolled || mobile ? "opacity-100" : "opacity-0"}`} />
        <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex h-full items-center gap-6">
            <Link href="/" aria-label="Twinlink, back to homepage" className="flex h-full items-center"><Logo /></Link>
            <nav aria-label="Main navigation" className="hidden h-full items-center gap-1 lg:flex">
              {MENUS.map(menu => {
                const open = active === menu.label;
                return (
                  <div key={menu.label} className="relative flex h-full items-center" onMouseEnter={() => setActive(menu.label)} onMouseLeave={() => setActive(null)}
                    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
                    <button type="button" aria-haspopup="true" aria-expanded={open} onClick={() => setActive(menu.label)} className={`flex items-center gap-1 ${NAV_ITEM} ${open ? "text-grey-750" : "text-grey-600"}`}>
                      {menu.label}<Chevron open={open} />
                    </button>
                    {open && <Dropdown menu={menu} />}
                  </div>
                );
              })}
              <a href={href("/pricing")} className={`${NAV_ITEM} text-grey-600`}>Pricing</a>
            </nav>
          </div>
          <div className="flex h-full items-center gap-2">
            <Button to="/contact?from=header#fill-out-the-form" className="whitespace-nowrap !px-4 !py-2">Book a demo</Button>
            <button type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)} className={`-mr-1 flex h-11 w-11 items-center justify-center rounded-[6px] hover:bg-grey-200 lg:hidden ${mobile ? "bg-grey-250" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d={mobile ? "M4 4l10 10M14 4L4 14" : "M2.5 5h13M2.5 9h13M2.5 13h13"} />
              </svg>
            </button>
          </div>
        </div>
        {mobile && <MobileMenu />}
      </div>
    </header>
  );
}
