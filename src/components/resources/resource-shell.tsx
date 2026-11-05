import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function ResourceHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="foundation-resource-hero">
      <div className="foundation-container">
        <p className="foundation-resource-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="foundation-resource-description">{description}</p>
      </div>
      <div className="foundation-wave" aria-hidden="true" />
    </section>
  );
}
export function ResourceLinks() {
  return (
    <nav aria-label="Resources" className="foundation-resource-links">
      <div className="foundation-container flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm">
        {[
          ["case-studies", "Case studies"],
          ["blog", "Blog"],
          ["events", "Events"],
          ["contact", "Contact"],
        ].map(([path, label]) => (
          <Link
            key={path}
            href={`/${path}`}
            className="hover:underline underline-offset-4"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
export function ResourceCta() {
  return (
    <section className="mx-auto mb-16 mt-12 flex max-w-6xl flex-col justify-between gap-6 rounded-2xl border border-[#c4a574]/25 bg-[#c4a574]/5 px-8 py-10 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs uppercase tracking-[.25em] text-[#c4a574]">
          Let’s build what comes next
        </p>
        <h2 className="mt-3 font-serif text-3xl text-white">
          A good partnership starts with a conversation.
        </h2>
      </div>
      <Link
        href="/contact"
        className="inline-flex shrink-0 items-center gap-3 text-[#e8d5a3] hover:underline"
      >
        Talk to Twinlink <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
