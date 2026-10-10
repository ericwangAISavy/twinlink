import { notFound } from "next/navigation";
import { z } from "zod";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditorialEditor } from "@/components/admin/editorial-editor";
import { getAdminEditorialEntry } from "@/server/queries/editorial";
export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const entry = await getAdminEditorialEntry(id);
  if (!entry) notFound();
  return (
    <>
      <AdminPageHeader
        title="Edit publication"
        description="Update the content, imagery and publication status. Published changes become visible after saving."
      />
      <EditorialEditor key={`${entry.id}-${entry.version}`} entry={entry} />
    </>
  );
}
