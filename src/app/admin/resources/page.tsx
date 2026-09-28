import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminResourceForm } from "@/components/admin/admin-resource-form";
import { AdminTable } from "@/components/admin/admin-table";
import { formatDate } from "@/lib/utils";
import { getAdminResources } from "@/server/queries/admin";

export default async function AdminResourcesPage() {
  const resources = await getAdminResources();

  return (
    <>
      <AdminPageHeader
        title="Resources"
        description="Career guides, candidate materials, and internal recruiting documents."
      />
      <div className="mb-8 rounded-2xl border border-[#eadfcd] bg-white p-6">
        <h2 className="font-serif text-xl">Add resource</h2>
        <div className="mt-4">
          <AdminResourceForm />
        </div>
      </div>
      {resources.length === 0 ? (
        <AdminEmptyState title="No resources yet." description="Add a guide or document when you are ready to share it." />
      ) : (
        <AdminTable headers={["Title", "Kind", "Link", "Added"]}>
          {resources.map((resource) => (
            <tr key={String(resource.id)}>
              <td className="px-4 py-3">
                <p className="font-medium">{String(resource.title)}</p>
                <p className="text-xs text-muted-foreground">{(resource.description as string | null) ?? ""}</p>
              </td>
              <td className="px-4 py-3 capitalize">{String(resource.kind)}</td>
              <td className="px-4 py-3">
                {resource.url ? (
                  <a className="text-accent hover:underline" href={String(resource.url)} target="_blank" rel="noreferrer">
                    Open
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(String(resource.created_at))}</td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
