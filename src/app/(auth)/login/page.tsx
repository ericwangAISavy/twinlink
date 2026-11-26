import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSpinner } from "@/components/loading-spinner";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Twinlink talent and employee portal.",
};

export default function LoginPage() {
  return (
    <>
      <h2 className="font-serif text-3xl text-white">Welcome back</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Sign in to your Twinlink account.
        <br />
        Candidates and employees use the same portal.
      </p>
      <Suspense fallback={<PageSpinner className="min-h-[12rem]" />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
