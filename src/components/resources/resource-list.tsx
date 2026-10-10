"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { chinaDate, resourceHref, type Resource } from "@/lib/resources";
export function ResourceList({ items }: { items: Resource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const filtered = items.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.title} ${i.summary} ${i.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === c ? "border-[#e8d5a3] bg-[#e8d5a3] text-[#0c0b0a]" : "border-white/20 text-white/75 hover:border-[#e8d5a3]"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 rounded-lg border border-white/20 px-4 py-3 text-white/60 focus-within:border-[#e8d5a3] focus-within:ring-1 focus-within:ring-[#e8d5a3]">
          <Search size={17} />
          <span className="sr-only">Search resources</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection"
            className="w-full bg-transparent text-sm text-white outline-none md:w-48"
          />
        </label>
      </div>
      <p
        className="my-6 text-xs uppercase tracking-widest text-white/50"
        role="status"
      >
        {filtered.length} {filtered.length === 1 ? "story" : "stories"}
      </p>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#151310]"
          >
            <Link href={resourceHref(item)} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 360px, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[.18em] text-[#c4a574]">
                  {item.category}
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {item.summary}
                </p>
                {item.date && (
                  <p className="mt-4 text-sm text-[#e8d5a3]">
                    {chinaDate(item.date)} CST (UTC+8)
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
                  <span>{item.label}</span>
                  <ArrowUpRight size={18} className="text-[#e8d5a3]" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border border-white/10 p-12 text-center">
          <h2 className="font-serif text-3xl text-white">
            No matching stories
          </h2>
          <p className="mt-3 text-white/60">
            Try a different topic or search term.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 text-[#e8d5a3] underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
