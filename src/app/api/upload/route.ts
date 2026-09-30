import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/server/authorization";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user?.id || user.role !== "CANDIDATE") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  }

  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
    return NextResponse.json({ error: "Upload a PDF or Word document." }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 5MB." }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const path = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from("resumes").upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  await supabase.from("candidate_profiles").upsert({
    user_id: user.id,
    resume_url: path,
  });

  const { data: signed } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 60);
  return NextResponse.json({
    ok: true,
    path,
    url: signed?.signedUrl ?? null,
    filename: file.name,
    uploadedAt: new Date().toISOString(),
    size: file.size,
  });
}
