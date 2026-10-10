"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import {
  editorialResourceSchema,
  editorialPublicationSchema,
  editorialStatuses,
} from "@/lib/editorial-schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/server/authorization";
import {
  EDITORIAL_TAG,
  EDITORIAL_SETUP_MESSAGE,
  isEditorialTableMissing,
} from "@/server/queries/editorial";

type SaveResult =
  | { ok: true; id: string; version: number; message: string }
  | { ok: false; error: string };
export async function saveEditorialEntry(
  formData: FormData,
): Promise<SaveResult> {
  const user = await requireAdmin();
  const raw = formData.get("content");
  if (typeof raw !== "string" || raw.length > 500000)
    return { ok: false, error: "The article is too large or missing." };
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      error: "The article could not be read. Please reload and try again.",
    };
  }
  const status = z.enum(editorialStatuses).safeParse(formData.get("status"));
  const parsed = (
    status.success && status.data === "published"
      ? editorialPublicationSchema
      : editorialResourceSchema
  ).safeParse(input);
  if (!parsed.success)
    return {
      ok: false,
      error: parsed.error.issues[0]?.message || "Check the article fields.",
    };
  if (!status.success)
    return { ok: false, error: "Choose draft, published, or archived." };
  const id = String(formData.get("id") || "");
  const version = Number(formData.get("version"));
  if (
    id &&
    (!z.uuid().safeParse(id).success ||
      !Number.isInteger(version) ||
      version < 1)
  )
    return { ok: false, error: "Invalid edit version. Reload the entry." };
  const client = await createServerSupabaseClient();
  let oldContent: { kind: string; slug: string } | undefined;
  if (id) {
    const { data, error } = await client
      .from("editorial_entries")
      .select("content")
      .eq("id", id)
      .maybeSingle();
    if (error)
      return {
        ok: false,
        error: isEditorialTableMissing(error)
          ? EDITORIAL_SETUP_MESSAGE
          : "Could not read the existing entry.",
      };
    if (!data) return { ok: false, error: "This entry no longer exists." };
    oldContent = data.content;
  }
  const payload = {
    kind: parsed.data.kind,
    slug: parsed.data.slug,
    status: status.data,
    content: parsed.data,
    updated_by: user.id,
  };
  const query = id
    ? client
        .from("editorial_entries")
        .update(payload)
        .eq("id", id)
        .eq("version", version)
    : client
        .from("editorial_entries")
        .insert({ ...payload, created_by: user.id });
  const { data, error } = await query.select("id,version").maybeSingle();
  if (error)
    return {
      ok: false,
      error: isEditorialTableMissing(error)
        ? EDITORIAL_SETUP_MESSAGE
        : error.code === "23505"
          ? "That URL slug is already used in this collection. Choose another slug."
          : "The entry could not be saved. Please try again.",
    };
  if (!data)
    return {
      ok: false,
      error:
        "Another administrator changed this entry. Reload it before saving so their changes are preserved.",
    };
  revalidateTag(EDITORIAL_TAG);
  revalidatePath("/admin/publishing");
  revalidatePath(`/admin/publishing/${data.id}`);
  revalidatePath(`/admin/publishing/${data.id}/preview`);
  for (const path of [
    "/",
    "/blog",
    "/events",
    "/case-studies",
    `/${parsed.data.kind}/${parsed.data.slug}`,
    ...(oldContent ? [`/${oldContent.kind}/${oldContent.slug}`] : []),
  ])
    revalidatePath(path);
  return {
    ok: true,
    id: data.id,
    version: data.version,
    message:
      status.data === "published"
        ? "Published changes are now live."
        : status.data === "archived"
          ? "Entry archived and removed from the public website."
          : "Draft saved. It is only visible to administrators.",
  };
}
export async function uploadEditorialImage(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.size || file.size > 5 * 1024 * 1024)
    return { ok: false, error: "Choose a JPEG, PNG or WebP image up to 5 MB." };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const png =
    bytes.length > 8 &&
    [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v);
  const jpeg =
    bytes.length > 3 &&
    bytes[0] === 255 &&
    bytes[1] === 216 &&
    bytes[2] === 255;
  const webp =
    bytes.length > 12 &&
    new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
  const mime = png
    ? "image/png"
    : jpeg
      ? "image/jpeg"
      : webp
        ? "image/webp"
        : null;
  if (!mime || file.type !== mime)
    return {
      ok: false,
      error:
        "The file must contain a valid JPEG, PNG or WebP image matching its file type.",
    };
  const client = await createServerSupabaseClient();
  const path = `${crypto.randomUUID()}.${png ? "png" : jpeg ? "jpg" : "webp"}`;
  const { error } = await client.storage
    .from("editorial-images")
    .upload(path, bytes, {
      contentType: mime,
      upsert: false,
      cacheControl: "31536000",
    });
  if (error)
    return {
      ok: false,
      error:
        "Image upload failed. Check that the editorial publishing migration and storage policies are installed.",
    };
  const { data } = client.storage.from("editorial-images").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
