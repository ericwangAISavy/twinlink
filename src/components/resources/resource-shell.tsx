import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
export function ResourceHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c0b0a] via-[#0c0b0a]/90 to-[#0c0b0a]/45" />
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[.3em] text-[#e8d5a3]">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-tight text-white md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </section>
  );
}
export function ResourceLinks() {
  return (
    <nav aria-label="Resources" className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 px-4 py-5 text-sm text-[#e8d5a3]">
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
