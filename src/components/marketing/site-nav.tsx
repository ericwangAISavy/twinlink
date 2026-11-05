"use client";

import Link from "next/link";
import { SERVICE_LINKS } from "./service-links";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ReferenceIcon } from "./reference-icon";

type Item = { label: string; href: string };
const GROUPS: { label: string; items: Item[] }[] = [
  { label: "About us", items: [
    { label: "About TwinLink", href: "/about" },
    { label: "Life at TwinLink", href: "/about#culture" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy policy", href: "/privacy" },
  ] },
  { label: "Tech services", items: [
    ...SERVICE_LINKS.map(item => ({ label: item.label, href: `/services/${item.slug}` })),
    { label: "Our solutions", href: "/#solutions" },
  ] },
  { label: "HR services", items: [
    { label: "Engineering Network", href: "/#people" },
    { label: "Careers", href: "/careers" },
    { label: "Talent enquiry", href: "/contact" },
  ] },
  { label: "Resources", items: [
    { label: "Case studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Featured Insights", href: "/#insights" },
  ] },
];

export function SiteNav({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(pathname);
  const keyboardGroup = useRef<string | null>(null);

  const close = (restoreFocus = false) => {
    keyboardGroup.current = null;
    setMobileOpen(false);
    setOpenGroup(null);
    if (restoreFocus) toggle.current?.focus();
  };

  useEffect(() => {
    if (openGroup === null) return;
    if (keyboardGroup.current === openGroup) {
      keyboardGroup.current = null;
      nav.current?.querySelector<HTMLAnchorElement>(`#nav-group-${openGroup} a`)?.focus();
    }
  }, [openGroup]);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setMobileOpen(false);
      setOpenGroup(null);
      previousPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 992px)");
    const resize = () => { setMobileOpen(false); setOpenGroup(null); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const oldOverflow = document.body.style.overflow;
    const content = document.getElementById("marketing-content");
    const footer = document.getElementById("site-footer");
    const brand = document.querySelector<HTMLElement>(".foundation-brand");
    const backgrounds = [content, footer, brand].filter((el): el is HTMLElement => Boolean(el));
    const oldInert = backgrounds.map(el => el.inert);
    backgrounds.forEach(el => { el.inert = true; });
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = oldOverflow;
      backgrounds.forEach((el, i) => { el.inert = oldInert[i]; });
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        keyboardGroup.current = null;
        if (mobileOpen) {
          setMobileOpen(false); setOpenGroup(null); toggle.current?.focus();
        } else if (openGroup) {
          const trigger = nav.current?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`);
          setOpenGroup(null); trigger?.focus();
        }
      }
      if (mobileOpen && event.key === "Tab") {
        const items = [...(nav.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
          .filter(el => el.getClientRects().length > 0);
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = (event: PointerEvent) => {
      if (!mobileOpen && nav.current && !nav.current.contains(event.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", handle);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", handle); document.removeEventListener("pointerdown", outside); };
  }, [mobileOpen, openGroup]);

  const active = (href: string) => !href.includes("#") && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));
  const navLink = (item: Item, extra = "") => (
    <Link key={`${item.label}-${item.href}`} href={item.href} className={extra}
      aria-current={active(item.href) ? "page" : undefined} onClick={() => close()}>
      {item.label}
    </Link>
  );

  return (
    <>
      <button ref={toggle} type="button" className="foundation-menu-toggle" aria-label="Open navigation"
        aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen(true)}>
        <ReferenceIcon name="list" />
      </button>
      <nav ref={nav} id="primary-navigation" className={`foundation-nav${mobileOpen ? " is-mobile-open" : ""}`}
        role={mobileOpen ? "dialog" : undefined} aria-modal={mobileOpen || undefined}
        aria-label={mobileOpen ? "Site navigation" : "Primary"}
        onClick={e => { if (e.target === e.currentTarget && mobileOpen) close(true); }}>
        <button ref={closeButton} className="foundation-menu-close" type="button" aria-label="Close navigation" onClick={() => close(true)}>
          <ReferenceIcon name="x" />
        </button>
        <ul className="foundation-nav-list">
          <li>{navLink({ label: "Home", href: "/" })}</li>
          {GROUPS.map((group, index) => {
            const expanded = openGroup === String(index);
            return (
              <li key={group.label} className={`foundation-nav-group${expanded ? " is-expanded" : ""}`}
                onMouseEnter={() => { if (window.matchMedia("(min-width: 992px)").matches) { keyboardGroup.current = null; setOpenGroup(String(index)); } }}
                onMouseLeave={() => { if (window.matchMedia("(min-width: 992px)").matches) setOpenGroup(current => current === String(index) ? null : current); }}
                onBlur={event => { if (!mobileOpen && !event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}>
                <button type="button" data-group={index} aria-expanded={expanded} aria-controls={`nav-group-${index}`}
                  onClick={() => setOpenGroup(expanded ? null : String(index))}
                  onKeyDown={event => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      if (expanded) nav.current?.querySelector<HTMLAnchorElement>(`#nav-group-${index} a`)?.focus();
                      else { keyboardGroup.current = String(index); setOpenGroup(String(index)); }
                    }
                  }}>
                  {group.label}<ReferenceIcon name="chevron-down" />
                </button>
                <ul id={`nav-group-${index}`} className="foundation-submenu" inert={!expanded}>
                  {group.items.map(item => <li key={item.label}>{navLink(item)}</li>)}
                </ul>
              </li>
            );
          })}
          <li>{navLink({ label: "Contact us", href: "/contact" })}</li>
          <li className="foundation-account">
            {signedIn ? navLink({ label: "Dashboard", href: "/dashboard" }, "foundation-button foundation-button-small") : <>
              {navLink({ label: "Sign in", href: "/login" })}
              {navLink({ label: "Join", href: "/register" }, "foundation-button foundation-button-small")}
            </>}
          </li>
        </ul>
      </nav>
    </>
  );
}
