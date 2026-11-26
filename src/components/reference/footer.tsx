import Link from "next/link";
import { COMING_SOON, href } from "./links";
import { FOOTER_COLUMNS } from "./nav-content";
import { Logo } from "./ui";

const SOCIAL = [
  { label: "Twitter", viewBox: "0 0 1200 1227", d: "M714.163 519.284L1160.89 0H1052.07L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H108.822L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163Z" },
  { label: "LinkedIn", viewBox: "0 0 24 24", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Discord", viewBox: "0 0 24 24", d: "M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a13.4 13.4 0 0 1 3.3 1.6 15.9 15.9 0 0 0-13 0A13.4 13.4 0 0 1 8.8 3.4L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.5.3 17.9a19.9 19.9 0 0 0 6 3l1.3-2a12.7 12.7 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 11.8 0l.5.4a12.7 12.7 0 0 1-2 1l1.3 2a19.9 19.9 0 0 0 6-3c.4-5.1-.7-9.5-3.4-13.5ZM8.5 15.2c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Z" },
];

const LEGAL = [["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms-of-use"], ["CGV", "/cgv"], ["CGU", "/cgu"], ["DPA", "/dpa"], ["Cookie Policy", "/cookie-policy"], ["Cookie Preferences", "/cookie-preferences"], ["Trust Center", "/trust"]];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t !border-grey-250 bg-grey-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
          <div className="flex max-w-xs flex-col gap-5">
            <Link href="/" aria-label="Twinlink, back to homepage" className="flex w-fit items-center transition-colors hover:text-iris-600"><Logo /></Link>
            <div className="flex items-center gap-4">
              {SOCIAL.map(item => (
                <a key={item.label} href={COMING_SOON} aria-label={item.label} className="-m-3 p-3 text-grey-500 transition-colors hover:text-grey-750">
                  <svg viewBox={item.viewBox} fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d={item.d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Footer navigation" className="columns-2 gap-x-10 sm:grid sm:grid-cols-3 sm:gap-y-10 lg:grid-cols-5">
            {FOOTER_COLUMNS.map(column => (
              <div key={column.title} className="mb-10 flex break-inside-avoid flex-col gap-4 last:mb-0 sm:mb-0">
                <p className="text-[14px] font-bold leading-[21px] text-grey-500">{column.title}</p>
                <ul className="-my-1.5 flex flex-col">
                  {column.links.map(link => (
                    <li key={link.label}>
                      <a href={href(link.to)} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-block py-1.5 text-[14px] leading-5 text-grey-600 transition-colors hover:text-grey-750">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="h-px bg-grey-250" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="t12 text-grey-500">© 2026 Twinlink. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <ul className="-my-1.5 flex flex-wrap items-center gap-x-5">
              {LEGAL.map(([label, to]) => <li key={label}><a href={href(to)} className="t12 inline-block py-1.5 text-grey-500 transition-colors hover:text-grey-750">{label}</a></li>)}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
