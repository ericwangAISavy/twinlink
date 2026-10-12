"use client";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Eye, ImagePlus, Plus, Trash2 } from "lucide-react";
import {
  EDITORIAL_IMAGE_MAX_BYTES,
  editorialKinds,
  editorialLabels,
  editorialStatuses,
  type EditorialContent,
  type EditorialEntry,
} from "@/lib/editorial-schema";
import {
  saveEditorialEntry,
  uploadEditorialImage,
} from "@/server/actions/editorial";
import { Button } from "@/components/ui/button";

const inputStyle =
  "mt-2 w-full rounded-lg border border-[#d9cdb8] bg-white px-3 py-2.5 text-sm text-[#1c1916] focus:outline-none focus:ring-2 focus:ring-[#c4a574]";
const sectionStyle = "rounded-2xl border border-[#eadfcd] bg-white p-5 md:p-7";
function newContent(): EditorialContent {
  return {
    kind: "blog",
    slug: "",
    title: "",
    summary: "",
    category: "Engineering",
    image: "/images/about-vision-ai.jpg",
    imageAlt: "Engineering and technology illustration",
    label: "Engineering perspective",
    author: "Twinlink Editorial",
    sections: [{ title: "", body: "" }],
  };
}
function toLocal(value?: string) {
  if (!value) return "";
  return new Date(new Date(value).getTime() + 8 * 3600000)
    .toISOString()
    .slice(0, 16);
}
function toUtc(value: string) {
  return value ? new Date(`${value}:00+08:00`).toISOString() : undefined;
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function EditorialEditor({ entry }: { entry?: EditorialEntry }) {
  const router = useRouter();
  const [content, setContent] = useState<EditorialContent>(
    entry?.content || newContent(),
  );
  const [status, setStatus] = useState<EditorialEntry["status"]>(
    entry?.status || "draft",
  );
  const [version, setVersion] = useState(entry?.version || 0);
  const [id, setId] = useState(entry?.id || "");
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function change(patch: Partial<EditorialContent>) {
    setContent((old) => ({ ...old, ...patch }));
    setDirty(true);
    setMessage("");
  }
  function updateSection(
    index: number,
    patch: Partial<EditorialContent["sections"][number]>,
  ) {
    change({
      sections: content.sections.map((section, i) =>
        i === index ? { ...section, ...patch } : section,
      ),
    });
  }
  function moveSection(index: number, offset: number) {
    const next = [...content.sections];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    change({ sections: next });
  }
  function normalize() {
    return {
      ...content,
      sections: content.sections.map((section) => {
        const paragraphs = [section.body, ...(section.paragraphs || [])]
          .join("\n\n")
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
        return {
          ...section,
          body: paragraphs[0] || "",
          paragraphs: paragraphs.slice(1),
          bullets: section.bullets?.map((b) => b.trim()).filter(Boolean),
        };
      }),
    };
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      entry?.status === "published" &&
      status !== "published" &&
      !window.confirm(
        "This will remove the entry from the public website. Continue?",
      )
    )
      return;
    setError("");
    setMessage("");
    const data = new FormData();
    data.set("content", JSON.stringify(normalize()));
    data.set("status", status);
    data.set("id", id);
    data.set("version", String(version));
    startTransition(async () => {
      try {
        const result = await saveEditorialEntry(data);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        setVersion(result.version);
        setId(result.id);
        setDirty(false);
        setMessage(result.message);
        if (!id) router.replace(`/admin/publishing/${result.id}`);
        else router.refresh();
      } catch {
        setError("Saving failed. Please check your session and try again.");
      }
    });
  }
  async function upload(file?: File, figureIndex?: number) {
    if (!file) return;
    if (file.size > EDITORIAL_IMAGE_MAX_BYTES) {
      setError("Choose an image up to 4 MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      data.set("file", file);
      const result = await uploadEditorialImage(data);
      if (!result.ok) setError(result.error);
      else {
        if (figureIndex === undefined)
          change({ image: result.url, fallbackImage: undefined });
        else
          change({
            supportingImages: content.supportingImages!.map((figure, index) =>
              index === figureIndex
                ? { ...figure, image: result.url, fallbackImage: result.url }
                : figure,
            ),
          });
        setMessage("Image uploaded. Save the entry to use it on the website.");
      }
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }
  function leave(event: React.MouseEvent<HTMLAnchorElement>) {
    if (dirty && !window.confirm("You have unsaved changes. Leave the editor?"))
      event.preventDefault();
  }
  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/publishing"
          onClick={leave}
          className="text-sm underline"
        >
          ← All publications
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            {dirty
              ? "Unsaved changes"
              : id
                ? `Saved version ${version}`
                : "New draft"}
          </span>
          {id && (
            <Link
              href={`/admin/publishing/${id}/preview`}
              onClick={leave}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9c6a4] px-4 py-2 text-sm"
            >
              <Eye size={15} />
              Preview saved entry
            </Link>
          )}
        </div>
      </div>
      <fieldset
        disabled={pending || uploading}
        className="min-w-0 space-y-6 border-0 p-0"
      >
        <section className={sectionStyle}>
          <h2 className="mb-5 font-serif text-2xl">Publication details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Content type">
              <select
                value={content.kind}
                className={inputStyle}
                onChange={(e) => {
                  const kind = e.target.value as EditorialContent["kind"];
                  change({
                    kind,
                    ...(kind !== "events"
                      ? { date: undefined, end: undefined, location: undefined }
                      : {}),
                  });
                }}
              >
                {editorialKinds.map((kind) => (
                  <option key={kind} value={kind}>
                    {editorialLabels[kind]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={status}
                className={inputStyle}
                onChange={(e) => {
                  setStatus(e.target.value as EditorialEntry["status"]);
                  setDirty(true);
                }}
              >
                {editorialStatuses.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Drafts and archived entries are private. Saving a published entry
            updates the public page immediately. Changing its URL also retires
            the previous URL.
          </p>
          <div className="mt-5 space-y-5">
            <Field label="Title">
              <input
                required
                minLength={3}
                maxLength={180}
                value={content.title}
                onChange={(e) => change({ title: e.target.value })}
                className={inputStyle}
              />
            </Field>
            <Field label="URL slug">
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                minLength={3}
                maxLength={140}
                value={content.slug}
                onChange={(e) => change({ slug: e.target.value })}
                placeholder="a-clear-article-title"
                className={inputStyle}
              />
            </Field>
            <p className="-mt-3 break-all text-xs text-muted-foreground">
              Public URL: /{content.kind}/{content.slug || "your-slug"}
            </p>
            <Field label="Summary">
              <textarea
                maxLength={1200}
                rows={3}
                value={content.summary}
                onChange={(e) => change({ summary: e.target.value })}
                className={inputStyle}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Topic / category">
                <input
                  value={content.category}
                  maxLength={100}
                  onChange={(e) => change({ category: e.target.value })}
                  className={inputStyle}
                />
              </Field>
              <Field label="Card label">
                <input
                  value={content.label}
                  maxLength={150}
                  onChange={(e) => change({ label: e.target.value })}
                  className={inputStyle}
                />
              </Field>
              <Field label="Author / editorial team">
                <input
                  value={content.author || ""}
                  maxLength={150}
                  onChange={(e) => change({ author: e.target.value })}
                  className={inputStyle}
                />
              </Field>
            </div>
            {content.kind === "case-studies" && (
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(content.featured)}
                  onChange={(event) =>
                    change({ featured: event.target.checked })
                  }
                />
                Feature this case study on the homepage
              </label>
            )}
            <Field label="Disclosure or editor’s note">
              <textarea
                rows={3}
                maxLength={1500}
                value={content.notice || ""}
                onChange={(e) => change({ notice: e.target.value })}
                placeholder="Identify illustrative outcomes, proposed programs or any important context."
                className={inputStyle}
              />
            </Field>
          </div>
        </section>
        <section className={sectionStyle}>
          <h2 className="mb-5 font-serif text-2xl">Cover image</h2>
          <div className="space-y-5">
            <Field label="Image path or uploaded URL">
              <input
                required
                value={content.image}
                onChange={(e) =>
                  change({ image: e.target.value, fallbackImage: undefined })
                }
                className={inputStyle}
              />
            </Field>
            <Field label="Image description (alternative text)">
              <input
                maxLength={300}
                value={content.imageAlt}
                onChange={(e) => change({ imageAlt: e.target.value })}
                className={inputStyle}
              />
            </Field>
            <label className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-[#d9c6a4] p-4 text-sm">
              <ImagePlus size={20} />
              <span>Upload JPEG, PNG or WebP · up to 4 MB</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  void upload(e.target.files?.[0]);
                  e.target.value = "";
                }}
                aria-label="Upload cover image"
                className="max-w-full text-xs"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Uploaded images are public website assets. Upload only imagery
              suitable for public use. Reading time is calculated automatically
              from the article text.
            </p>
          </div>
        </section>
        {content.kind === "events" && (
          <section className={sectionStyle}>
            <h2 className="mb-5 font-serif text-2xl">Event information</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Leave both dates empty for a proposed program. Times are entered
              in China Standard Time (UTC+8). Add dates only when you can
              publish a schedule.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Start (China Standard Time)">
                <input
                  type="datetime-local"
                  value={toLocal(content.date)}
                  onChange={(e) => change({ date: toUtc(e.target.value) })}
                  className={inputStyle}
                />
              </Field>
              <Field label="End (China Standard Time)">
                <input
                  type="datetime-local"
                  value={toLocal(content.end)}
                  onChange={(e) => change({ end: toUtc(e.target.value) })}
                  className={inputStyle}
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Location or online format">
                <input
                  value={content.location || ""}
                  maxLength={300}
                  onChange={(e) => change({ location: e.target.value })}
                  className={inputStyle}
                />
              </Field>
            </div>
          </section>
        )}
        <section className={sectionStyle}>
          <h2 className="font-serif text-2xl">Article sections</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Separate paragraphs with a blank line. Content is plain text, so
            pasted HTML or scripts will never run.
          </p>
          <div className="mt-6 space-y-6">
            {content.sections.map((section, index) => (
              <fieldset
                key={index}
                className="min-w-0 rounded-xl border border-[#eadfcd] p-4 md:p-5"
              >
                <legend className="px-2 text-sm font-semibold">
                  Section {index + 1}
                </legend>
                <div className="mb-4 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={`Move section ${index + 1} up`}
                    disabled={index === 0}
                    onClick={() => moveSection(index, -1)}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={`Move section ${index + 1} down`}
                    disabled={index === content.sections.length - 1}
                    onClick={() => moveSection(index, 1)}
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={`Remove section ${index + 1}`}
                    disabled={content.sections.length === 1}
                    onClick={() => {
                      if (window.confirm("Remove this section?"))
                        change({
                          sections: content.sections.filter(
                            (_, i) => i !== index,
                          ),
                        });
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="space-y-4">
                  <Field label="Section heading">
                    <input
                      maxLength={180}
                      value={section.title}
                      onChange={(e) =>
                        updateSection(index, { title: e.target.value })
                      }
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Section text">
                    <textarea
                      rows={8}
                      value={[section.body, ...(section.paragraphs || [])].join(
                        "\n\n",
                      )}
                      onChange={(e) =>
                        updateSection(index, {
                          body: e.target.value,
                          paragraphs: [],
                        })
                      }
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Checklist / bullet points (one per line)">
                    <textarea
                      rows={3}
                      value={(section.bullets || []).join("\n")}
                      onChange={(e) =>
                        updateSection(index, {
                          bullets: e.target.value.split("\n"),
                        })
                      }
                      className={inputStyle}
                    />
                  </Field>
                </div>
                {section.table ? (
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap justify-between gap-3">
                      <p className="text-sm font-medium">Comparison table</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateSection(index, { table: undefined })
                        }
                      >
                        Remove table
                      </Button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr>
                            {section.table.columns.map((column, c) => (
                              <th key={c} className="p-1">
                                <input
                                  aria-label={`Section ${index + 1} column ${c + 1}`}
                                  value={column}
                                  onChange={(e) =>
                                    updateSection(index, {
                                      table: {
                                        ...section.table!,
                                        columns: section.table!.columns.map(
                                          (value, j) =>
                                            j === c ? e.target.value : value,
                                        ),
                                      },
                                    })
                                  }
                                  className={inputStyle}
                                />
                              </th>
                            ))}
                            <th className="p-1 text-xs">Rows</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, r) => (
                            <tr key={r}>
                              {row.map((value, c) => (
                                <td key={c} className="p-1">
                                  <input
                                    aria-label={`Section ${index + 1} row ${r + 1} column ${c + 1}`}
                                    value={value}
                                    onChange={(e) =>
                                      updateSection(index, {
                                        table: {
                                          ...section.table!,
                                          rows: section.table!.rows.map(
                                            (cells, j) =>
                                              j === r
                                                ? cells.map((text, k) =>
                                                    k === c
                                                      ? e.target.value
                                                      : text,
                                                  )
                                                : cells,
                                          ),
                                        },
                                      })
                                    }
                                    className={inputStyle}
                                  />
                                </td>
                              ))}
                              <td>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  aria-label={`Remove row ${r + 1} from section ${index + 1}`}
                                  disabled={section.table!.rows.length === 1}
                                  onClick={() =>
                                    updateSection(index, {
                                      table: {
                                        ...section.table!,
                                        rows: section.table!.rows.filter(
                                          (_, j) => j !== r,
                                        ),
                                      },
                                    })
                                  }
                                >
                                  <Trash2 />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={section.table.rows.length >= 30}
                        onClick={() =>
                          updateSection(index, {
                            table: {
                              ...section.table!,
                              rows: [
                                ...section.table!.rows,
                                section.table!.columns.map(() => ""),
                              ],
                            },
                          })
                        }
                      >
                        Add row
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={section.table.columns.length >= 6}
                        onClick={() =>
                          updateSection(index, {
                            table: {
                              columns: [...section.table!.columns, ""],
                              rows: section.table!.rows.map((row) => [
                                ...row,
                                "",
                              ]),
                            },
                          })
                        }
                      >
                        Add column
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={section.table.columns.length <= 2}
                        onClick={() =>
                          updateSection(index, {
                            table: {
                              columns: section.table!.columns.slice(0, -1),
                              rows: section.table!.rows.map((row) =>
                                row.slice(0, -1),
                              ),
                            },
                          })
                        }
                      >
                        Remove last column
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      updateSection(index, {
                        table: {
                          columns: ["Measure", "Result"],
                          rows: [["", ""]],
                        },
                      })
                    }
                  >
                    Add comparison table
                  </Button>
                )}
              </fieldset>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            disabled={content.sections.length >= 30}
            onClick={() =>
              change({
                sections: [...content.sections, { title: "", body: "" }],
              })
            }
          >
            <Plus />
            Add section
          </Button>
        </section>
        <section className={sectionStyle}>
          <h2 className="font-serif text-2xl">Outcome panels</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use verified results, or clearly identify fictional and modeled
            figures in the disclosure.
          </p>
          <div className="mt-5 space-y-4">
            {(content.metrics || []).map((metric, index) => (
              <div
                key={index}
                className="grid items-end gap-3 sm:grid-cols-[1fr_2fr_auto]"
              >
                <Field label={`Outcome ${index + 1} value`}>
                  <input
                    value={metric.value}
                    onChange={(e) =>
                      change({
                        metrics: content.metrics!.map((m, i) =>
                          i === index ? { ...m, value: e.target.value } : m,
                        ),
                      })
                    }
                    className={inputStyle}
                  />
                </Field>
                <Field label={`Outcome ${index + 1} description`}>
                  <input
                    value={metric.label}
                    onChange={(e) =>
                      change({
                        metrics: content.metrics!.map((m, i) =>
                          i === index ? { ...m, label: e.target.value } : m,
                        ),
                      })
                    }
                    className={inputStyle}
                  />
                </Field>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={`Remove outcome ${index + 1}`}
                  onClick={() =>
                    change({
                      metrics: content.metrics!.filter((_, i) => i !== index),
                    })
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            disabled={(content.metrics || []).length >= 8}
            onClick={() =>
              change({
                metrics: [...(content.metrics || []), { value: "", label: "" }],
              })
            }
          >
            <Plus />
            Add outcome panel
          </Button>
        </section>
        <section className={sectionStyle}>
          <h2 className="font-serif text-2xl">Additional figures</h2>
          <div className="mt-5 space-y-5">
            {(content.supportingImages || []).map((figure, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-[#eadfcd] p-4"
              >
                <Field label={`Figure ${index + 1} image URL or local path`}>
                  <input
                    value={figure.image}
                    onChange={(e) =>
                      change({
                        supportingImages: content.supportingImages!.map(
                          (f, i) =>
                            i === index
                              ? {
                                  ...f,
                                  image: e.target.value,
                                  fallbackImage: e.target.value,
                                }
                              : f,
                        ),
                      })
                    }
                    className={inputStyle}
                  />
                </Field>
                <Field label={`Figure ${index + 1} description`}>
                  <input
                    value={figure.imageAlt}
                    onChange={(e) =>
                      change({
                        supportingImages: content.supportingImages!.map(
                          (f, i) =>
                            i === index
                              ? { ...f, imageAlt: e.target.value }
                              : f,
                        ),
                      })
                    }
                    className={inputStyle}
                  />
                </Field>
                <label className="block text-sm">
                  Upload figure {index + 1}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    aria-label={`Upload figure ${index + 1}`}
                    onChange={(event) => {
                      void upload(event.target.files?.[0], index);
                      event.target.value = "";
                    }}
                    className="mt-2 block max-w-full text-xs"
                  />
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    change({
                      supportingImages: content.supportingImages!.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                >
                  Remove figure
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            disabled={(content.supportingImages || []).length >= 12}
            onClick={() =>
              change({
                supportingImages: [
                  ...(content.supportingImages || []),
                  {
                    image: "/images/about-vision-ai.jpg",
                    fallbackImage: "/images/about-vision-ai.jpg",
                    imageAlt: "Technology illustration",
                  },
                ],
              })
            }
          >
            <Plus />
            Add figure
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            You can reuse uploaded image URLs in additional figures.
          </p>
        </section>
      </fieldset>
      <div className="sticky bottom-4 z-10 rounded-2xl border border-[#d9c6a4] bg-[#fffcf6] p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {status === "published"
              ? "Changes will be visible on the public website."
              : status === "archived"
                ? "This entry will be removed from public collections."
                : "Only administrators can view this draft."}
          </p>
          <Button type="submit" disabled={pending || uploading}>
            {pending
              ? "Saving…"
              : uploading
                ? "Uploading…"
                : status === "published"
                  ? "Save & publish"
                  : status === "archived"
                    ? "Save as archived"
                    : "Save draft"}
          </Button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-3 text-sm text-emerald-800">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
