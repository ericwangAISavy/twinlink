import { z } from "zod";

export const editorialKinds = ["case-studies", "blog", "events"] as const;
export const editorialStatuses = ["draft", "published", "archived"] as const;
export const editorialLabels = {
  "case-studies": "Case study",
  blog: "Blog post",
  events: "Event",
};
export function isEditorialImage(value: string) {
  if (/^\/images\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes(".."))
    return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".supabase.co") &&
      !url.username &&
      !url.password &&
      !url.search &&
      url.pathname.startsWith("/storage/v1/object/public/editorial-images/")
    );
  } catch {
    return false;
  }
}
const image = z
  .string()
  .max(2048)
  .refine(
    isEditorialImage,
    "Use a local /images/ path or an uploaded editorial image.",
  );
const tableSchema = z
  .object({
    columns: z.array(z.string().trim().min(1).max(150)).min(2).max(6),
    rows: z.array(z.array(z.string().trim().max(1000)).min(2).max(6)).max(30),
  })
  .refine(
    (t) => t.rows.every((row) => row.length === t.columns.length),
    "Each table row must match the number of columns.",
  );
export const editorialResourceSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(3)
      .max(140)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers and single hyphens in the URL slug.",
      ),
    kind: z.enum(editorialKinds),
    featured: z.boolean().optional(),
    category: z.string().trim().max(100),
    title: z.string().trim().min(3).max(180),
    summary: z.string().trim().max(1200),
    image,
    imageAlt: z.string().trim().max(300),
    fallbackImage: image.optional(),
    label: z.string().trim().max(150),
    notice: z.string().trim().max(1500).optional(),
    author: z.string().trim().max(150).optional(),
    sections: z
      .array(
        z.object({
          title: z.string().trim().max(180),
          body: z.string().trim().max(12000),
          paragraphs: z
            .array(z.string().trim().min(1).max(12000))
            .max(30)
            .optional(),
          bullets: z
            .array(z.string().trim().min(1).max(1500))
            .max(30)
            .optional(),
          table: tableSchema.optional(),
        }),
      )
      .min(1)
      .max(30),
    metrics: z
      .array(
        z.object({
          value: z.string().trim().max(50),
          label: z.string().trim().max(200),
        }),
      )
      .max(8)
      .optional(),
    supportingImages: z
      .array(
        z.object({
          image,
          fallbackImage: image,
          imageAlt: z.string().trim().max(300),
        }),
      )
      .max(12)
      .optional(),
    date: z.iso.datetime().optional(),
    end: z.iso.datetime().optional(),
    location: z.string().trim().max(300).optional(),
  })
  .superRefine((item, ctx) => {
    if (Boolean(item.date) !== Boolean(item.end))
      ctx.addIssue({
        code: "custom",
        message: "Provide both the event start and end, or leave both empty.",
      });
    if (item.date && item.end && new Date(item.end) <= new Date(item.date))
      ctx.addIssue({
        code: "custom",
        message: "The event must end after it starts.",
      });
    if (item.date && item.kind !== "events")
      ctx.addIssue({
        code: "custom",
        message: "Only events have start and end dates.",
      });
  });
export type EditorialContent = z.infer<typeof editorialResourceSchema>;
export type EditorialEntry = {
  id: string;
  version: number;
  status: (typeof editorialStatuses)[number];
  content: EditorialContent;
  updatedAt: string;
};
export function readingMinutes(item: EditorialContent) {
  const words = item.sections.reduce(
    (total, section) =>
      total +
      [
        section.title,
        section.body,
        ...(section.paragraphs || []),
        ...(section.bullets || []),
      ]
        .join(" ")
        .split(/\s+/).length,
    0,
  );
  return Math.max(1, Math.ceil(words / 200));
}

export const editorialPublicationSchema = editorialResourceSchema.superRefine(
  (item, ctx) => {
    const checks: [boolean, string][] = [
      [item.category.length >= 2, "Add a category before publishing."],
      [
        item.summary.length >= 10,
        "Add a summary of at least 10 characters before publishing.",
      ],
      [
        item.imageAlt.length >= 3,
        "Describe the cover image before publishing.",
      ],
      [item.label.length >= 2, "Add a card label before publishing."],
      [
        item.sections.length >= 1,
        "Add at least one section before publishing.",
      ],
      [
        item.sections.every((s) => s.title.length >= 2 && s.body.length >= 10),
        "Every published section needs a heading and at least 10 characters of text.",
      ],
      [
        (item.metrics || []).every(
          (m) => m.value.length > 0 && m.label.length >= 3,
        ),
        "Complete every outcome panel before publishing.",
      ],
      [
        (item.supportingImages || []).every((i) => i.imageAlt.length >= 3),
        "Describe every additional figure before publishing.",
      ],
    ];
    for (const [valid, message] of checks)
      if (!valid) ctx.addIssue({ code: "custom", message });
  },
);
