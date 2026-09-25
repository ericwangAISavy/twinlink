import { PageHeader } from "@/components/dashboard/page-header";
import { PasswordForm } from "@/components/dashboard/password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/server/authorization";

export default async function CandidateSettingsPage() {
  const user = await requireRole("CANDIDATE");

  return (
    <>
      <PageHeader title="Settings" description="Account security for your candidate profile." />
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">Signed in as {user.email}</p>
          <PasswordForm />
        </CardContent>
      </Card>
    </>
  );
}
