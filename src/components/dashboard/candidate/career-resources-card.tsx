import Link from "next/link";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";

const LINKS = [
  { href: "/careers", label: "Public careers page" },
  { href: "/about", label: "About Twinlink" },
  { href: "/dashboard/candidate/resume", label: "Resume upload" },
] as const;

export function CareerResourcesCard() {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)]">
      <SectionHeader title="Resources" />
      <ul className="space-y-2 text-sm">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[#1c1916] underline-offset-4 hover:text-[#c4a574] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
