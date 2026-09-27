"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthInput } from "@/components/auth/auth-input";
import { PortalToggle, type PortalRole } from "@/components/auth/portal-toggle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/form-field";
import { loginSchema } from "@/lib/validations";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { toAppRole } from "@/lib/supabase/mappers";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<PortalRole>("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const registered = params.get("registered") === "1";
  const callbackUrl = params.get("callbackUrl");

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim().toLowerCase();
        const password = String(formData.get("password") ?? "");
        startTransition(async () => {
          setError(null);
          const parsed = loginSchema.safeParse({ email, password });
          if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? "Enter a valid email and password.");
            return;
          }
          try {
            const supabase = createBrowserSupabaseClient();
            const { data, error: signError } = await supabase.auth.signInWithPassword({
              email: parsed.data.email,
              password: parsed.data.password,
            });
            if (signError || !data.user) {
              setError(signError?.message ?? "Invalid email or password.");
              return;
            }
            const { data: profile } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", data.user.id)
              .maybeSingle();
            const appRole = toAppRole(profile?.role);
            const home = appRole === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate";
            const safeCallback =
              callbackUrl &&
              callbackUrl.startsWith("/") &&
              !callbackUrl.startsWith("//") &&
              !callbackUrl.startsWith("/dashboard/");
            router.push(safeCallback ? callbackUrl : home);
            router.refresh();
          } catch {
            setError("Unable to sign in.");
          }
        });
      }}
    >
      <PortalToggle value={role} onChange={setRole} />
      {registered ? (
        <p className="rounded-full bg-[#c4a574]/15 px-4 py-2 text-sm text-[#e8d5a3]">
          Account created. Sign in to continue.
        </p>
      ) : null}
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
      <Field htmlFor="password" label="Password" className="[&_label]:text-white/80">
        <AuthInput
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          minLength={8}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((open) => !open)}
              className="grid size-8 place-items-center text-white/50 hover:text-[#e8d5a3]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
        />
      </Field>
      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-white/70">
          <Checkbox
            name="remember"
            className="border-[#c4a574]/60 data-[state=checked]:border-[#c4a574] data-[state=checked]:bg-[#c4a574] data-[state=checked]:text-[#1c1916]"
          />
          Remember me
        </label>
        <span className="text-[#c4a574]/90">Forgot password?</span>
      </div>
      {error ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="teal" size="lg" className="w-full rounded-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
        <ArrowRight />
      </Button>
      <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/35 uppercase">
        <span className="h-px flex-1 bg-white/15" />
        or
        <span className="h-px flex-1 bg-white/15" />
      </div>
      {role === "employee" ? (
        <p className="text-center text-sm text-white/55">
          Employees join by invite. Use this form with your employee email.
        </p>
      ) : (
        <p className="text-center text-sm text-white/55">
          New here?{" "}
          <Link href="/register" className="text-[#e8d5a3] hover:underline">
            Create a candidate account
          </Link>
        </p>
      )}
    </form>
  );
}
