import type { Metadata } from "next";
import { PrivacyPreference } from "@/components/marketing/privacy-preference";
import { getCompanyProfile } from "@/server/queries/company";
export const metadata: Metadata = { title: "Privacy and visitor information" };
export default async function PrivacyPage() {
  const company = await getCompanyProfile();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 text-white/80">
      <h1 className="font-serif text-4xl text-[#e8d5a3]">
        Privacy and visitor information
      </h1>
      <section className="mt-8 space-y-3">
        <h2 className="font-serif text-2xl">Job applications</h2>
        <p>
          Applications include your name, email, phone number, address, and any
          resume, professional profile link, or cover letter you choose to
          provide. Twinlink administrators use these details to review
          applications and contact applicants. Guest applications do not create
          an account.
        </p>
      </section>
      <section className="mt-8 space-y-3">
        <h2 className="font-serif text-2xl">Website visits</h2>
        <p>
          When visitor monitoring is enabled, Twinlink records the public page
          visited, visit time, browser information, IP address, and approximate
          country, region and city when available from the hosting platform.
          IP-based location may reflect a VPN, mobile network or proxy; it does
          not identify a precise address or a person. We do not request GPS
          access or record URL query strings.
        </p>
        <p>
          Visitor records are visible only to administrators. Records older than
          90 days are removed when new visits are recorded. Do Not Track, Global
          Privacy Control, and the preference below disable future monitoring.
        </p>
      </section>
      <PrivacyPreference />
      <p className="mt-8">
        For questions about your information or a deletion request, contact{" "}
        <a
          className="underline"
          href={`mailto:${company.email || "hello@twinlink.com"}`}
        >
          {company.email || "hello@twinlink.com"}
        </a>
        .
      </p>
    </article>
  );
}
