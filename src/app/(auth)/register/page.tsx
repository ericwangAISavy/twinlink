import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";

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
    <>
      <Link href="/" className="flex items-center gap-2 text-[#e8d5a3]">
        <TwinlinkMark className="size-8" />
        <span className="font-serif text-3xl tracking-wide">Twinlink</span>
      </Link>
      <h2 className="mt-6 font-serif text-3xl text-white">
        {invite ? "Welcome to the team" : "Create your candidate account"}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {invite
          ? "Employee accounts are invitation only. Complete registration with the invited email."
          : "Create your candidate account. Employee accounts are invitation only."}
      </p>
      <RegisterForm invite={invite} />
    </>
  );
}
