import Link from "next/link";

export const metadata = { title: { absolute: "Coming soon | H" } };

export default function ComingSoonPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 pt-28">
      <h1 className="text-[36px] font-medium leading-10 tracking-tight">This page is coming soon.</h1>
      <p className="text-grey-600">It is part of a separate application that is not reproduced here.</p>
      <Link href="/" className="rounded-[8px] bg-iris-600 px-5 py-2.5 text-[14px] font-medium leading-5 text-white hover:bg-iris-700">Back to homepage</Link>
    </section>
  );
}
