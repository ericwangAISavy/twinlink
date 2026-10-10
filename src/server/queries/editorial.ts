import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { resources, type Resource } from "@/lib/resources";
import {
  editorialResourceSchema,
  editorialPublicationSchema,
  readingMinutes,
  type EditorialEntry,
} from "@/lib/editorial-schema";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/server/authorization";

export const EDITORIAL_TAG = "editorial-publications";
export const EDITORIAL_SETUP_MESSAGE =
  "Run supabase/migrations/0013_editorial_publishing.sql in your Supabase SQL editor to enable publishing and import the current articles.";
export function isEditorialTableMissing(error: {
  code?: string;
  message?: string;
}) {
  return (
    error.code === "42P01" ||
    (error.code === "PGRST205" &&
      /editorial_entries/i.test(error.message || ""))
  );
}
function contentResource(content: unknown): Resource {
  const parsed = editorialPublicationSchema.parse(content);
  return { ...parsed, readMinutes: readingMinutes(parsed) };
}
const loadPublished = unstable_cache(
  async (): Promise<Resource[]> => {
    if (!isSupabaseConfigured()) return resources;
    const client = createPublicSupabaseClient();
    const { data, error } = await client
      .from("editorial_entries")
      .select("content")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) {
      if (isEditorialTableMissing(error)) return resources;
      throw new Error(
        "Published content could not be loaded. Please try again.",
      );
    }
    // Once the table exists it is authoritative. Never resurrect archived or draft seed entries.
    return (data || []).map((row) => contentResource(row.content));
  },
  ["published-editorial-entries"],
  { revalidate: 60, tags: [EDITORIAL_TAG] },
);
export const getPublishedResources = cache(loadPublished);
export async function getAdminEditorialEntries(): Promise<{
  entries: EditorialEntry[];
  setupRequired: boolean;
  error?: string;
}> {
  await requireAdmin();
  const client = await createServerSupabaseClient();
  const { data, error } = await client
    .from("editorial_entries")
    .select("id,version,status,content,updated_at")
    .order("updated_at", { ascending: false });
  if (error)
    return {
      entries: [],
      setupRequired: isEditorialTableMissing(error),
      error: isEditorialTableMissing(error)
        ? EDITORIAL_SETUP_MESSAGE
        : "The content library could not be loaded. Please try again.",
    };
  try {
    return {
      entries: (data || []).map((row) => ({
        id: row.id,
        version: row.version,
        status: row.status,
        content: editorialResourceSchema.parse(row.content),
        updatedAt: row.updated_at,
      })),
      setupRequired: false,
    };
  } catch {
    return {
      entries: [],
      setupRequired: false,
      error:
        "A content record has an invalid structure. Check the editorial_entries data before editing.",
    };
  }
}
export async function getAdminEditorialEntry(
  id: string,
): Promise<EditorialEntry | null> {
  await requireAdmin();
  const client = await createServerSupabaseClient();
  const { data, error } = await client
    .from("editorial_entries")
    .select("id,version,status,content,updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error)
    throw new Error(
      isEditorialTableMissing(error)
        ? EDITORIAL_SETUP_MESSAGE
        : "The content record could not be loaded.",
    );
  return data
    ? {
        id: data.id,
        version: data.version,
        status: data.status,
        content: editorialResourceSchema.parse(data.content),
        updatedAt: data.updated_at,
      }
    : null;
}
