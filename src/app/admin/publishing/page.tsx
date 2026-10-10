import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditorialLibrary } from "@/components/admin/editorial-library";
import { getAdminEditorialEntries } from "@/server/queries/editorial";
export default async function PublishingPage() {
  const { entries, setupRequired, error } = await getAdminEditorialEntries();
  return (
    <>
      <AdminPageHeader
        title="Articles & events"
        description="Manage case studies, blog posts and events. Drafts stay private until you publish."
      />
      {error ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-serif text-xl">
            {setupRequired
              ? "Enable the publishing library"
              : "Content unavailable"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed">{error}</p>
          {setupRequired && (
            <p className="mt-3 text-sm">
              The migration also creates image storage and imports the existing
              20 entries without overwriting later edits. Current public
              articles stay available while setup is pending.
            </p>
          )}
        </section>
      ) : (
        <>
          <div className="mb-6 flex justify-end">
            <Link
              href="/admin/publishing/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#1c1916] px-5 py-3 text-sm text-white"
            >
              <Plus size={16} />
              New publication
            </Link>
          </div>
          <EditorialLibrary entries={entries} />
        </>
      )}
    </>
  );
}
