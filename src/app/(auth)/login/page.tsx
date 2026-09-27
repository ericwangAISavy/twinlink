import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the TwinLink talent and employee portal.",
};

export default function LoginPage() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 text-[#e8d5a3]">
        <TwinlinkMark className="size-8" />
        <span className="font-serif text-3xl tracking-wide">Twinlink</span>
      </Link>
      <h2 className="mt-6 font-serif text-3xl text-white">Welcome back</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Sign in to your Twinlink account.
        <br />
        Candidates and employees use the same portal.
      </p>
      <Suspense fallback={<p className="mt-6 text-sm text-white/50">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
