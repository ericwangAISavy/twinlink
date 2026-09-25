import Link from "next/link";
import type { CompanyContent } from "@/lib/constants";

export function SiteFooter({ company }: { company: CompanyContent }) {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">{company.name}</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">{company.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-200">Visit</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/about">About</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/login">Client & talent portal</Link>
          </div>
        </div>
        <div className="text-sm text-white/70">
          <p>{company.address}</p>
          {company.email ? <p className="mt-2">{company.email}</p> : null}
          {company.phone ? <p>{company.phone}</p> : null}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
