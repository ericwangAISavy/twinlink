import { ActionForm } from "@/components/action-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Field } from "@/components/form-field";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanyProfile } from "@/server/actions/company";
import { requireRole } from "@/server/authorization";
import { getCompanyProfile } from "@/server/queries/company";

export default async function CompanyProfilePage() {
  await requireRole("EMPLOYEE");
  const company = await getCompanyProfile();

  return (
    <>
      <PageHeader
        title="Company profile"
        description="This singleton profile powers the public marketing site."
      />
      <Card>
        <CardContent className="pt-6">
          <ActionForm action={updateCompanyProfile} submitLabel="Save company profile">
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
              <Field htmlFor="mission" label="Mission">
                <Textarea id="mission" name="mission" defaultValue={company.mission ?? ""} />
              </Field>
              <Field htmlFor="vision" label="Vision">
                <Textarea id="vision" name="vision" defaultValue={company.vision ?? ""} />
              </Field>
              <Field htmlFor="partnership" label="Developer partnership">
                <Textarea id="partnership" name="partnership" defaultValue={company.partnership ?? ""} />
              </Field>
              <Field htmlFor="about" label="About">
                <Textarea id="about" name="about" defaultValue={company.about ?? ""} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field htmlFor="website" label="Website">
                  <Input id="website" name="website" defaultValue={company.website ?? ""} />
                </Field>
                <Field htmlFor="email" label="Email">
                  <Input id="email" name="email" defaultValue={company.email ?? ""} />
                </Field>
                <Field htmlFor="phone" label="Phone">
                  <Input id="phone" name="phone" defaultValue={company.phone ?? ""} />
                </Field>
                <Field htmlFor="address" label="Address">
                  <Input id="address" name="address" defaultValue={company.address ?? ""} />
                </Field>
              </div>
              <Field htmlFor="valuesJson" label="Values JSON" hint='Array of { "title", "body" } objects.'>
                <Textarea id="valuesJson" name="valuesJson" defaultValue={JSON.stringify(company.values, null, 2)} />
              </Field>
              <Field htmlFor="capabilitiesJson" label="Capabilities JSON">
                <Textarea
                  id="capabilitiesJson"
                  name="capabilitiesJson"
                  defaultValue={JSON.stringify(company.capabilities, null, 2)}
                />
              </Field>
              <Field htmlFor="benefitsJson" label="Benefits JSON">
                <Textarea id="benefitsJson" name="benefitsJson" defaultValue={JSON.stringify(company.benefits, null, 2)} />
              </Field>
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </>
  );
}
