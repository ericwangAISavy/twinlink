"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { AuthInput } from "@/components/auth/auth-input";
import { PortalToggle, type PortalRole } from "@/components/auth/portal-toggle";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/form-field";
import { Spinner } from "@/components/loading-spinner";
import { authErrorMessage } from "@/lib/roles";
import { registerSchema } from "@/lib/validations";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function RegisterForm({ invite }: { invite?: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
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
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            startTransition(async () => {
              setError(null);
              const parsed = registerSchema.safeParse({
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
                invite: invite || formData.get("invite") || undefined,
              });
              if (!parsed.success) {
                setError(parsed.error.issues[0]?.message ?? "Invalid registration details");
                return;
              }

              try {
                const supabase = createBrowserSupabaseClient();
                const origin = window.location.origin;
                const { data, error: signUpError } = await supabase.auth.signUp({
                  email: parsed.data.email.toLowerCase(),
                  password: parsed.data.password,
                  options: {
                    data: {
                      full_name: parsed.data.name,
                      ...(parsed.data.invite ? { invite_token: parsed.data.invite } : {}),
                    },
                    emailRedirectTo: `${origin}/auth/callback`,
                  },
                });

                if (signUpError) {
                  setError(authErrorMessage(signUpError));
                  return;
                }

                if (!data.user) {
                  setError("Unable to create your account. Try again.");
                  return;
                }

                if ((data.user.identities?.length ?? 0) === 0) {
                  setError("An account with this email already exists. Sign in instead.");
                  return;
                }

                if (parsed.data.invite && data.session) {
                  const { error: inviteError } = await supabase.rpc("accept_employee_invite", {
                    invite_token: parsed.data.invite,
                  });
                  if (inviteError) {
                    await supabase.auth.signOut();
                    setError(inviteError.message);
                    return;
                  }
                }

                window.location.assign("/auth/sign-out?registered=1");
              } catch (caught) {
                setError(caught instanceof Error ? authErrorMessage(caught) : "Unable to create your account.");
              }
            });
          }}
        >
          {invite ? <input type="hidden" name="invite" value={invite} /> : null}
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
          <Field
            htmlFor="password"
            label="Password"
            hint="At least 8 characters."
            className="[&_label]:text-white/80 [&_p]:text-white/40"
          >
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
          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            variant="teal"
            size="lg"
            className="w-full rounded-full"
            disabled={pending}
          >
            {pending ? <Spinner className="text-current" /> : null}
            {pending ? "Creating account…" : invite ? "Create employee account" : "Create candidate account"}
          </Button>
        </form>
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
