import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminSaveCompanySettings } from "@/server/actions/admin";
import { getCompanyProfile } from "@/server/queries/company";

export default async function AdminSettingsPage() {
  const company = await getCompanyProfile();

  return (
    <>
      <AdminPageHeader title="Settings" description="Only controls with a real backend are enabled. Placeholder sections stay informational." />
      <div className="space-y-6">
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Company</h2>
          <p className="mt-1 text-sm text-muted-foreground">Updates the public Twinlink company profile.</p>
          <div className="mt-4">
            <ActionForm action={adminSaveCompanySettings} submitLabel="Save company">
              <div className="grid gap-4">
                <Field htmlFor="name" label="Company name">
                  <Input id="name" name="name" required defaultValue={company.name} />
                </Field>
                <Field htmlFor="tagline" label="Tagline">
                  <Input id="tagline" name="tagline" defaultValue={company.tagline ?? ""} />
                </Field>
                <Field htmlFor="intro" label="Introduction">
                  <Textarea id="intro" name="intro" defaultValue={company.intro ?? ""} />
                </Field>
                <Field htmlFor="email" label="Email">
                  <Input id="email" name="email" defaultValue={company.email ?? ""} />
                </Field>
                <Field htmlFor="website" label="Website">
                  <Input id="website" name="website" defaultValue={company.website ?? ""} />
                </Field>
                <input type="hidden" name="mission" value={company.mission ?? ""} />
                <input type="hidden" name="vision" value={company.vision ?? ""} />
                <input type="hidden" name="partnership" value={company.partnership ?? ""} />
                <input type="hidden" name="about" value={company.about ?? ""} />
                <input type="hidden" name="phone" value={company.phone ?? ""} />
                <input type="hidden" name="address" value={company.address ?? ""} />
                <input type="hidden" name="valuesJson" value={JSON.stringify(company.values)} />
                <input type="hidden" name="capabilitiesJson" value={JSON.stringify(company.capabilities)} />
                <input type="hidden" name="benefitsJson" value={JSON.stringify(company.benefits)} />
              </div>
            </ActionForm>
          </div>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Recruiting</h2>
          <p className="mt-2 text-sm text-muted-foreground">Job statuses, pipelines, and invitations are managed from their own admin pages.</p>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Notifications</h2>
          <p className="mt-2 text-sm text-muted-foreground">In-app notifications are stored in Supabase. Email delivery is not configured yet.</p>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Email</h2>
          <p className="mt-2 text-sm text-muted-foreground">Transactional email is not connected. Invitation links are generated in-product.</p>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Storage</h2>
          <p className="mt-2 text-sm text-muted-foreground">Resumes and avatars use private Supabase Storage buckets. Public resume access is not enabled.</p>
        </section>
        <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
          <h2 className="font-serif text-xl">Security</h2>
          <p className="mt-2 text-sm text-muted-foreground">Admin access requires a Supabase session and a database role of admin, enforced in middleware, server layouts, and RLS.</p>
        </section>
      </div>
    </>
  );
}
