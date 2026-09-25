import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CANDIDATE") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Resume storage is not configured. Add BLOB_READ_WRITE_TOKEN." },
      { status: 503 },
    );
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

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 8MB." }, { status: 400 });
  }

  try {
    const blob = await put(`resumes/${session.user.id}/${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const fileObject = await prisma.fileObject.create({
      data: {
        uploaderId: session.user.id,
        url: blob.url,
        pathname: blob.pathname,
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        kind: "RESUME",
      },
    });

    await prisma.candidateProfile.upsert({
      where: { userId: session.user.id },
      update: { resumeFileId: fileObject.id },
      create: { userId: session.user.id, resumeFileId: fileObject.id },
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again later." }, { status: 500 });
  }
}
