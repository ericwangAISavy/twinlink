import { ActionForm } from "@/components/action-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Field } from "@/components/form-field";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateEmployeeProfile } from "@/server/actions/profiles";
import { requireRole } from "@/server/authorization";
import { getEmployeeProfile } from "@/server/queries/profiles";

export default async function EmployeeProfilePage() {
  const user = await requireRole("EMPLOYEE");
  const record = await getEmployeeProfile(user.id);

  return (
    <>
      <PageHeader title="Your profile" description="Visible to TwinLink colleagues when they review staffing." />
      <Card>
        <CardContent className="pt-6">
          <ActionForm action={updateEmployeeProfile} submitLabel="Save profile">
            <div className="grid gap-4">
              <Field htmlFor="name" label="Name">
                <Input id="name" name="name" required defaultValue={record?.name ?? ""} />
              </Field>
              <Field htmlFor="title" label="Title">
                <Input id="title" name="title" defaultValue={record?.employeeProfile?.title ?? ""} />
              </Field>
              <Field htmlFor="phone" label="Phone">
                <Input id="phone" name="phone" defaultValue={record?.employeeProfile?.phone ?? ""} />
              </Field>
              <Field htmlFor="linkedIn" label="LinkedIn">
                <Input id="linkedIn" name="linkedIn" type="url" defaultValue={record?.employeeProfile?.linkedIn ?? ""} />
              </Field>
              <Field htmlFor="bio" label="Bio">
                <Textarea id="bio" name="bio" defaultValue={record?.employeeProfile?.bio ?? ""} />
              </Field>
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </>
  );
}
