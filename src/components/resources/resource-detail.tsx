import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  chinaDate,
  resources,
  resourceHref,
  type Resource,
} from "@/lib/resources";
import { ResourceHero, ResourceLinks, ResourceCta } from "./resource-shell";
import { EventCalendar } from "./event-actions";
import { ContactForm } from "./contact-form";
export function ResourceDetail({
  item,
  email,
}: {
  item: Resource;
  email: string;
}) {
  const related = resources
    .filter((r) => r.kind === item.kind && r.slug !== item.slug)
    .slice(0, 2);
  return (
    <>
      <ResourceHero
        eyebrow={`${item.category} · ${item.label}`}
        title={item.title}
        description={item.summary}
        image={item.image}
      />
      <ResourceLinks />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href={`/${item.kind}`}
          className="inline-flex items-center gap-2 text-sm text-[#e8d5a3]"
        >
          <ArrowLeft size={16} />
          Back to {item.kind.replace("-", " ")}
        </Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="max-w-3xl">
            {item.sections.map((s, i) => (
              <section
                key={s.title}
                id={`section-${i}`}
                className="mb-10 scroll-mt-24"
              >
                <p className="text-xs tracking-widest text-[#c4a574]">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/75">{s.body}</p>
              </section>
            ))}
            {item.kind === "events" && (
              <section
                id="interest"
                className="mt-12 rounded-xl border border-white/10 bg-[#151310] p-6"
              >
                <h2 className="font-serif text-3xl text-white">
                  Help shape the conversation.
                </h2>
                <p className="mb-7 mt-3 text-sm text-white/65">
                  Express interest by email. This does not reserve a place or
                  confirm an event.
                </p>
                <ContactForm
                  email={email}
                  subject={`Interest in ${item.title}`}
                />
              </section>
            )}
          </article>
          <aside>
            <div className="rounded-xl border border-white/10 bg-[#151310] p-6 lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[.2em] text-[#c4a574]">
                {item.kind === "events" ? "Event notes" : "In this story"}
              </p>
              {item.date && (
                <>
                  <p className="mt-5 text-lg text-white">
                    {chinaDate(item.date)}
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    China Standard Time (UTC+8)
                  </p>
                  <p className="mt-3 text-white/75">{item.location}</p>
                  <p className="mt-4 text-xs text-[#e8d5a3]">{item.label}</p>
                  <EventCalendar event={item} />
                </>
              )}
              <nav
                aria-label="On this page"
                className="mt-6 flex flex-col gap-4 text-sm text-white/75"
              >
                {item.sections.map((s, i) => (
                  <a
                    key={s.title}
                    href={`#section-${i}`}
                    className="hover:text-[#e8d5a3]"
                  >
                    {s.title}
                  </a>
                ))}
                {item.kind === "events" && (
                  <a href="#interest" className="text-[#e8d5a3]">
                    Express interest ↓
                  </a>
                )}
              </nav>
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="font-serif text-3xl text-white">
              Continue exploring
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={resourceHref(r)}
                  className="flex items-center justify-between gap-6 rounded-xl border border-white/10 p-6 hover:border-[#c4a574]/60"
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#c4a574]">
                      {r.category}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-white">
                      {r.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="shrink-0 text-[#e8d5a3]" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
