import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { getAdminEditorialEntry } from "@/server/queries/editorial";
import { readingMinutes } from "@/lib/editorial-schema";
import { ResourceDetail } from "@/components/resources/resource-detail";
import { getCompanyProfile } from "@/server/queries/company";
export const metadata: Metadata = {
  title: "Private publication preview",
  robots: { index: false, follow: false },
};
export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const entry = await getAdminEditorialEntry(id);
  if (!entry) notFound();
  const company = await getCompanyProfile();
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#eadfcd] bg-white p-5">
        <p className="text-sm">
          Private admin preview · {entry.status} · saved version {entry.version}
        </p>
        <Link className="text-sm underline" href={`/admin/publishing/${id}`}>
          Return to editor
        </Link>
      </div>
      <div className="marketing-theme overflow-hidden rounded-2xl">
        <ResourceDetail
          item={{
            ...entry.content,
            readMinutes: readingMinutes(entry.content),
          }}
          email={company.email || "hello@twinlink.com"}
        />
      </div>
    </>
  );
}
