"use client";

import { useState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { AuthInput } from "@/components/auth/auth-input";
import { PortalToggle, type PortalRole } from "@/components/auth/portal-toggle";
import { Field } from "@/components/form-field";
import { createAccount } from "@/server/actions/auth";

export function RegisterForm({ invite }: { invite?: string }) {
  const router = useRouter();
  const [role, setRole] = useState<PortalRole>(invite ? "employee" : "candidate");
  const showEmployeeGate = role === "employee" && !invite;

  return (
    <div className="mt-6 space-y-4">
      <PortalToggle value={role} onChange={setRole} />
      {showEmployeeGate ? (
        <p className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65">
          Employee accounts are invitation only.
        </p>
      ) : (
        <ActionForm
          action={createAccount}
          submitLabel={invite ? "Create employee account" : "Create candidate account"}
          submitClassName="w-full rounded-full bg-[#c4a574] text-[#1c1916] hover:bg-[#d4b484]"
          onSuccess={() => router.push("/login?registered=1")}
        >
          {invite ? <input type="hidden" name="invite" value={invite} /> : null}
          <div className="space-y-4">
            <Field htmlFor="name" label="Full name" className="[&_label]:text-white/80">
              <AuthInput id="name" name="name" icon={User} autoComplete="name" placeholder="Your name" required />
            </Field>
            <Field htmlFor="email" label="Email" className="[&_label]:text-white/80">
              <AuthInput
                id="email"
                name="email"
                type="email"
                icon={Mail}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </Field>
            <Field htmlFor="password" label="Password" hint="At least 8 characters." className="[&_label]:text-white/80 [&_p]:text-white/40">
              <AuthInput
                id="password"
                name="password"
                type="password"
                icon={Lock}
                autoComplete="new-password"
                placeholder="Create a password"
                required
                minLength={8}
              />
            </Field>
            <Field htmlFor="confirmPassword" label="Confirm password" className="[&_label]:text-white/80">
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                icon={Lock}
                autoComplete="new-password"
                placeholder="Repeat your password"
                required
                minLength={8}
              />
            </Field>
          </div>
        </ActionForm>
      )}
      <div className="flex items-center gap-3 pt-2 text-xs tracking-[0.2em] text-white/35 uppercase">
        <span className="h-px flex-1 bg-white/15" />
        or
        <span className="h-px flex-1 bg-white/15" />
      </div>
      <p className="text-center text-sm text-white/55">
        Already have an account?{" "}
        <Link href="/login" className="inline-flex items-center gap-1 text-[#e8d5a3] hover:underline">
          Sign in <ArrowRight className="size-3.5" />
        </Link>
      </p>
    </div>
  );
}
