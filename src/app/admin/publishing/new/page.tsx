import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditorialEditor } from "@/components/admin/editorial-editor";
import { getAdminEditorialEntries } from "@/server/queries/editorial";
export default async function NewPublicationPage() {
  const { error } = await getAdminEditorialEntries();
  return (
    <>
      <AdminPageHeader
        title="New publication"
        description="Create a case study, blog post or event. Save it privately as a draft, then publish when ready."
      />
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-5"
        >
          {error}
        </p>
      ) : (
        <EditorialEditor />
      )}
    </>
  );
}
