import { ActionForm } from "@/components/action-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { PasswordForm } from "@/components/dashboard/password-form";
import { Field } from "@/components/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createEmployeeInvite } from "@/server/actions/settings";
import { requireRole } from "@/server/authorization";
import { prisma } from "@/lib/db";

export default async function EmployeeSettingsPage() {
  const user = await requireRole("EMPLOYEE");
  const invites = await prisma.employeeInvite.findMany({
    where: { createdById: user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <>
      <PageHeader title="Settings" description="Password and invite-only employee onboarding." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invite an employee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Public registration cannot create employee accounts. Share the generated invite URL with the teammate.
            </p>
            <ActionForm action={createEmployeeInvite} submitLabel="Generate invite link">
              <Field htmlFor="email" label="Teammate email">
                <Input id="email" name="email" type="email" required />
              </Field>
            </ActionForm>
            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              {invites.map((invite) => (
                <li key={invite.id}>
                  {invite.email} · {invite.usedAt ? "used" : "open"} · expires {invite.expiresAt.toLocaleDateString()}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
