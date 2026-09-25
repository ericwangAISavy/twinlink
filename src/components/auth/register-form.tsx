"use client";

import { useRouter } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { createAccount } from "@/server/actions/auth";

export function RegisterForm({ invite }: { invite?: string }) {
  const router = useRouter();

  return (
    <ActionForm
      action={createAccount}
      submitLabel={invite ? "Create employee account" : "Create candidate account"}
      onSuccess={() => router.push("/login?registered=1")}
    >
      {invite ? <input type="hidden" name="invite" value={invite} /> : null}
      <div className="space-y-4">
        <Field htmlFor="name" label="Full name">
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field htmlFor="email" label="Work email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field htmlFor="password" label="Password" hint="At least 8 characters.">
          <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </Field>
        <Field htmlFor="confirmPassword" label="Confirm password">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </Field>
      </div>
    </ActionForm>
  );
}
