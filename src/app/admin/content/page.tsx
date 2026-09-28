import { AdminContentForm } from "@/components/admin/admin-content-form";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminContent } from "@/server/queries/admin";

export default async function AdminContentPage() {
  const content = await getAdminContent();

  return (
    <>
      <AdminPageHeader
        title="Website content"
        description="Lightweight copy for announcements, careers intro, and related blocks. This is not a full CMS."
      />
      {content.length === 0 ? (
        <AdminEmptyState
          title="No content records yet."
          description="Apply the admin database migration to seed homepage announcement, careers intro, and featured jobs keys."
        />
      ) : (
        <div className="grid gap-6">
          {content.map((item) => (
            <section key={String(item.id)} className="rounded-2xl border border-[#eadfcd] bg-white p-6">
              <AdminContentForm
                item={{
                  id: String(item.id),
                  key: String(item.key),
                  title: String(item.title),
                  body: (item.body as string | null) ?? null,
                }}
              />
            </section>
          ))}
        </div>
      )}
    </>
  );
}
