import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import type { CompanyContent } from "@/lib/constants";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";

export function SiteFooter({ company }: { company: CompanyContent }) {
  return (
    <footer className="border-t border-white/10 bg-[#0c0b0a] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-serif text-2xl tracking-wide text-[#e8d5a3]">
            <TwinlinkMark className="size-6" />
            Twinlink
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
            Engineering expertise, global talent, and innovative solutions that
            turn ambitious ideas into meaningful impact.
          </p>
          <div className="mt-5 flex items-center gap-4 text-white/55">
            <button
              type="button"
              disabled
              aria-label="LinkedIn unavailable"
              title="LinkedIn unavailable"
              className="cursor-not-allowed opacity-40"
            >
              <Linkedin className="size-4" />
            </button>
            <button
              type="button"
              disabled
              aria-label="YouTube unavailable"
              title="YouTube unavailable"
              className="cursor-not-allowed opacity-40"
            >
              <Youtube className="size-4" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Instagram unavailable"
              title="Instagram unavailable"
              className="cursor-not-allowed opacity-40"
            >
              <Instagram className="size-4" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/about" className="hover:text-[#e8d5a3]">
              About
            </Link>
            <Link href="/#solutions" className="hover:text-[#e8d5a3]">
              Solutions
            </Link>
            <Link href="/#people" className="hover:text-[#e8d5a3]">
              Engineering Network
            </Link>
            <Link href="/careers" className="hover:text-[#e8d5a3]">
              Careers
            </Link>
            <Link href="/#insights" className="hover:text-[#e8d5a3]">
              Insights
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Resources
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/case-studies" className="hover:text-[#e8d5a3]">
              Case Studies
            </Link>
            <Link href="/blog" className="hover:text-[#e8d5a3]">
              Blog
            </Link>
            <Link href="/events" className="hover:text-[#e8d5a3]">
              Events
            </Link>
            <Link href="/contact" className="hover:text-[#e8d5a3]">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Get in touch
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <a
              href={`mailto:${company.email || "hello@twinlink.com"}`}
              className="hover:text-[#e8d5a3]"
            >
              {company.email || "hello@twinlink.com"}
            </a>
            <p>Headquartered in China</p>
            <p>China Standard Time · UTC+8</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Twinlink. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#e8d5a3]">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#e8d5a3]">
              Terms of Service
            </Link>
            <Link href="/privacy#preferences" className="hover:text-[#e8d5a3]">
              Privacy Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
