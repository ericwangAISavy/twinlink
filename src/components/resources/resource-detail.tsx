import Link from "next/link";
import Image from "next/image";
import {
  withResourceImage,
  resolveEditorialImage,
} from "@/lib/resource-images";
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
  item = withResourceImage(item);
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
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <p className="text-sm text-white/60">
          {item.author || "Twinlink Engineering"} · {item.readMinutes} min read
        </p>
        {item.notice && (
          <p className="mt-5 rounded-xl border border-[#c4a574]/30 bg-[#c4a574]/5 p-5 text-sm leading-relaxed text-[#e8d5a3]">
            {item.notice}
          </p>
        )}
        {item.metrics && (
          <section
            aria-label="Illustrative scenario outcomes"
            className="mt-7 grid gap-4 sm:grid-cols-3"
          >
            {item.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/10 bg-[#151310] p-6"
              >
                <p className="font-serif text-4xl text-[#e8d5a3]">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {metric.label}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href={`/${item.kind}`}
          className="inline-flex items-center gap-2 text-sm text-[#e8d5a3]"
        >
          <ArrowLeft size={16} />
          Back to {item.kind.replace("-", " ")}
        </Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0 max-w-3xl">
            <figure className="mb-12 overflow-hidden rounded-xl border border-white/10 bg-[#090a10]">
              <div className="relative aspect-video">
                <Image
                  src={item.image}
                  alt={item.imageAlt || ""}
                  fill
                  sizes="(min-width:1024px) 800px, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="border-t border-white/10 px-5 py-3 text-xs leading-relaxed text-white/60">
                {item.imageAlt}
              </figcaption>
            </figure>
            {item.sections.map((s, i) => (
              <section
                key={s.title}
                id={`section-${i}`}
                className="mb-10 scroll-mt-24"
              >
                <p className="text-xs tracking-widest text-[#c4a574]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/75">{s.body}</p>
                {s.paragraphs?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-5 text-lg leading-8 text-white/75"
                  >
                    {paragraph}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-6 space-y-3 border-l-2 border-[#c4a574]/50 pl-6 text-base leading-7 text-white/75">
                    {s.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc ml-4">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div
                    className="mt-7 max-w-full overflow-x-auto rounded-xl border border-white/15"
                    role="region"
                    aria-label={`${s.title} comparison table`}
                    tabIndex={0}
                  >
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <caption className="sr-only">{s.title}</caption>
                      <thead className="bg-[#c4a574]/10 text-[#e8d5a3]">
                        <tr>
                          {s.table.columns.map((column) => (
                            <th
                              key={column}
                              scope="col"
                              className="p-4 font-medium"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, index) => (
                          <tr
                            key={index}
                            className="border-t border-white/10 text-white/75"
                          >
                            {row.map((value, cell) =>
                              cell === 0 ? (
                                <th
                                  key={cell}
                                  scope="row"
                                  className="p-4 font-medium"
                                >
                                  {value}
                                </th>
                              ) : (
                                <td key={cell} className="p-4 leading-relaxed">
                                  {value}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
            {item.supportingImages?.map((source) => {
              const resolved = resolveEditorialImage(source);
              return (
                <figure
                  key={source.image}
                  className="my-12 overflow-hidden rounded-xl border border-white/10"
                >
                  <div className="relative aspect-video bg-[#090a10]">
                    <Image
                      src={resolved.image}
                      alt={resolved.imageAlt}
                      fill
                      sizes="(min-width:1024px) 800px, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="px-5 py-3 text-xs text-white/60">
                    {resolved.imageAlt}
                  </figcaption>
                </figure>
              );
            })}
            {item.kind === "events" && (
              <section
                id="interest"
                className="mt-12 rounded-xl border border-white/10 bg-[#151310] p-6"
              >
                <h2 className="font-serif text-3xl text-white">
                  Interested in this program?
                </h2>
                <p className="mb-7 mt-3 text-sm text-white/65">
                  Tell us which topic would help your team. Dates are to be
                  announced; an interest email does not reserve a place.
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
              {item.date && item.end && (
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
              {!item.date && item.kind === "events" && (
                <p className="mt-5 text-sm leading-relaxed text-white/65">
                  Proposed program · dates to be announced. Explore the guide
                  and email your interest.
                </p>
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
                {item.supportingImages?.map((source) => {
                  const resolved = resolveEditorialImage(source);
                  return (
                    <figure
                      key={source.image}
                      className="my-12 overflow-hidden rounded-xl border border-white/10"
                    >
                      <div className="relative aspect-video bg-[#090a10]">
                        <Image
                          src={resolved.image}
                          alt={resolved.imageAlt}
                          fill
                          sizes="(min-width:1024px) 800px, 100vw"
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="px-5 py-3 text-xs text-white/60">
                        {resolved.imageAlt}
                      </figcaption>
                    </figure>
                  );
                })}
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
