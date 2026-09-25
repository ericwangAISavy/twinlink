"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/form-field";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const registered = params.get("registered") === "1";
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          setError(null);
          const result = await signIn("credentials", {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            redirect: false,
          });
          if (result?.error) {
            setError("Invalid email or password.");
            return;
          }
          router.push(callbackUrl);
          router.refresh();
        });
      }}
    >
      {registered ? (
        <p className="rounded-md bg-secondary px-3 py-2 text-sm">
          Account created. Sign in to continue.
        </p>
      ) : null}
      <Field htmlFor="email" label="Email">
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </Field>
      <Field htmlFor="password" label="Password">
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
