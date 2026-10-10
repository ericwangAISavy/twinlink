"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FilePlus, Search } from "lucide-react";
import { editorialLabels, type EditorialEntry } from "@/lib/editorial-schema";
import { formatDate } from "@/lib/utils";
export function EditorialLibrary({ entries }: { entries: EditorialEntry[] }) {
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const filtered = entries.filter(
    (entry) =>
      (kind === "all" || entry.content.kind === kind) &&
      (status === "all" || entry.status === status) &&
      `${entry.content.title} ${entry.content.category} ${entry.content.slug}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {["published", "draft", "archived"].map((value) => (
          <div
            key={value}
            className="rounded-2xl border border-[#eadfcd] bg-white p-5"
          >
            <p className="text-sm capitalize text-muted-foreground">{value}</p>
            <p className="mt-2 font-serif text-3xl">
              {entries.filter((entry) => entry.status === value).length}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#eadfcd] bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#eadfcd] p-5">
          <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#eadfcd] px-3">
            <Search size={16} />
            <span className="sr-only">Search publications</span>
            <input
              className="min-w-0 w-full bg-transparent py-2 text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, topic or URL"
            />
          </label>
          <label className="text-sm">
            <span className="sr-only">Content type</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="rounded-lg border border-[#eadfcd] bg-white p-2"
            >
              <option value="all">All types</option>
              {Object.entries(editorialLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="sr-only">Publication status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-[#eadfcd] bg-white p-2"
            >
              <option value="all">All statuses</option>
              {["draft", "published", "archived"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="px-5 pt-4 text-xs text-muted-foreground" role="status">
          {filtered.length} matching entries
        </p>
        <div className="divide-y divide-[#eadfcd]">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-5 p-5"
            >
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {editorialLabels[entry.content.kind]} ·{" "}
                  {entry.content.category}
                </p>
                <Link
                  href={`/admin/publishing/${entry.id}`}
                  className="mt-2 block font-medium hover:underline"
                >
                  {entry.content.title}
                </Link>
                <p className="mt-2 text-xs text-muted-foreground">
                  Updated {formatDate(entry.updatedAt)} · Version{" "}
                  {entry.version}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs capitalize ${entry.status === "published" ? "bg-emerald-50 text-emerald-800" : entry.status === "draft" ? "bg-amber-50 text-amber-900" : "bg-gray-100 text-gray-600"}`}
                >
                  {entry.status}
                </span>
                <Link
                  href={`/admin/publishing/${entry.id}`}
                  className="rounded-full border border-[#d9c6a4] px-4 py-2 text-sm hover:bg-[#f8f5ef]"
                >
                  Edit
                </Link>
                {entry.status === "published" && (
                  <Link
                    href={`/${entry.content.kind}/${entry.content.slug}`}
                    aria-label={`View ${entry.content.title}`}
                    className="text-muted-foreground hover:text-accent"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="p-10 text-center">
            <FilePlus className="mx-auto text-muted-foreground" />
            <h2 className="mt-4 font-serif text-xl">No matching entries</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Change the filters or create a new publication.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
