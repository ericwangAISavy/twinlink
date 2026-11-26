import Link from "next/link";
import { BRAND } from "@/components/reference/brand";

export const metadata = { title: { absolute: `Coming soon | ${BRAND.name}` } };

export default function ComingSoonPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 pt-28">
      <h1 className="t36 tracking-tight">This page is coming soon.</h1>
      <p className="t16 text-grey-600">It has not been built yet.</p>
      <Link href="/" className="rounded-[8px] bg-iris-600 px-5 py-2.5 text-[14px] font-medium leading-5 text-white hover:bg-iris-700">Back to homepage</Link>
    </section>
  );
}
