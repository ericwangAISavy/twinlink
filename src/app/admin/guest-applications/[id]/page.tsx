import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GuestReviewForm } from "@/components/admin/guest-review-form";
import { getGuestApplication } from "@/server/queries/guest-applications";
import { formatDate } from "@/lib/utils";

export default async function GuestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const entry = await getGuestApplication(id);
  if (!entry) notFound();
  return (
    <>
      <AdminPageHeader
        title={entry.name}
        description={`${entry.jobTitle} · applied ${formatDate(entry.createdAt)}`}
      />
      <Link
        href="/admin/guest-applications"
        className="mb-6 inline-block underline"
      >
        ← Guest applications
      </Link>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-2xl">Applicant details</h2>
          <p className="break-all">
            Email:{" "}
            <a className="underline" href={`mailto:${entry.email}`}>
              {entry.email}
            </a>
          </p>
          <p>Phone: {entry.phone || "Not provided (earlier application)"}</p>
          <div>
            <h3 className="text-sm font-medium">Address</h3>
            <p className="mt-2 whitespace-pre-wrap break-words">
              {entry.address || "Not provided (earlier application)"}
            </p>
          </div>
          {entry.social && (
            <p>
              <a
                href={entry.social}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Open professional social profile ↗
              </a>
              <span className="mt-1 block break-all text-xs text-muted-foreground">
                {entry.social}
              </span>
            </p>
          )}
          {entry.resume && (
            <p>
              <a
                href={entry.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Open applicant’s resume or portfolio ↗
              </a>
              <span className="mt-1 block break-all text-xs text-muted-foreground">
                External link supplied by the applicant: {entry.resume}
              </span>
            </p>
          )}
          <h3 className="font-serif text-xl">Cover letter</h3>
          <p className="whitespace-pre-wrap break-words">
            {entry.cover || "No cover letter provided."}
          </p>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="mb-5 font-serif text-2xl">Review</h2>
          <GuestReviewForm key={entry.updatedAt} entry={entry} />
        </section>
      </div>
    </>
  );
}
