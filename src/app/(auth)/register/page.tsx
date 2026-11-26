import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a Twinlink candidate account, or accept an employee invite.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams;

  return (
    <>
      <h2 className="font-serif text-3xl text-white">
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
