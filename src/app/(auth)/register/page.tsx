import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a TwinLink candidate account, or accept an employee invite.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{invite ? "Accept employee invite" : "Create a candidate account"}</CardTitle>
        <CardDescription>
          {invite
            ? "Employee access is invite-only. Complete registration with the invited email."
            : "Public registration is for candidates only. TwinLink employees are invited by the team."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm invite={invite} />
        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
