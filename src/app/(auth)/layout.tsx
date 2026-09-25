import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#0b1f3a_0%,#134e4a_48%,#f6f3ee_48%)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <Link href="/" className="mb-8 text-center font-serif text-3xl text-white">
          TwinLink
        </Link>
        {children}
      </div>
    </div>
  );
}
