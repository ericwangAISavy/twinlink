import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the TwinLink talent and employee portal.",
};

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Candidates and employees use the same portal.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/register" className="text-accent underline-offset-4 hover:underline">
            Create a candidate account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
