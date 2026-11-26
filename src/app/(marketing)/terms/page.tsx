import type { Metadata } from "next";
import Link from "next/link";
import { SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
import { getCompanyProfile } from "@/server/queries/company";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms that apply to your use of the Twinlink website." };

/* Standard website terms. Have counsel review before launch and add a governing-law
   clause for the state where Twinlink is organized. */
const SECTIONS: { title: string; body: string[] }[] = [
  { title: "Acceptance of these terms", body: [
    "By accessing or using this website, you agree to these Terms of Use and to our Privacy Policy. If you do not agree, please do not use the site.",
  ] },
  { title: "Use of the site", body: [
    "You may use this site for lawful purposes, including learning about our services, reading our published content, and applying for open roles. You agree not to interfere with the site’s operation, attempt to gain unauthorized access to any system, scrape the site at a volume that degrades service, or submit content that is unlawful, misleading, or infringes another person’s rights.",
  ] },
  { title: "Intellectual property", body: [
    "The Twinlink name, logo, and the content on this site, including text, graphics, and design, are owned by Twinlink or its licensors and are protected by intellectual property laws. You may view and share links to our content for personal or internal business purposes, but you may not copy, modify, or republish it without our written permission.",
  ] },
  { title: "Job applications and accounts", body: [
    "If you apply for a role or create a candidate account, you agree to provide accurate information and to keep your sign-in credentials secure. Submitting an application does not create an offer or guarantee of employment. Employment decisions are made at Twinlink’s discretion and in accordance with applicable law.",
  ] },
  { title: "No professional advice", body: [
    "Articles, case studies, and other materials on this site are provided for general information only. They are not professional, legal, or financial advice for your specific situation. Any engagement with Twinlink is governed by a separate written agreement.",
  ] },
  { title: "Third-party links", body: [
    "This site may link to websites operated by others. We do not control and are not responsible for their content, policies, or practices.",
  ] },
  { title: "Disclaimer of warranties", body: [
    "The site and its content are provided “as is” and “as available,” without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.",
  ] },
  { title: "Limitation of liability", body: [
    "To the fullest extent permitted by law, Twinlink will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this site.",
  ] },
  { title: "Changes to these terms", body: [
    "We may update these terms from time to time. The updated version will be posted on this page, and your continued use of the site after changes are posted means you accept the revised terms.",
  ] },
];

export default async function TermsPage() {
  const company = await getCompanyProfile();
  const email = company.email || "hello@twinlink.com";
  return (
    <SubPage className="sub-privacy">
      <WaveBanner title="Terms of Use" />
      <article className="foundation-container sub-privacy-body">
        {SECTIONS.map(section => <section key={section.title} className="mt-8 space-y-3">
          <h2 className="font-serif text-2xl">{section.title}</h2>
          {section.body.map(paragraph => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
        </section>)}
        <section className="mt-8 space-y-3">
          <h2 className="font-serif text-2xl">Contact</h2>
          <p>Questions about these terms can be sent to <a className="underline" href={`mailto:${email}`}>{email}</a>. See our <Link href="/privacy">Privacy Policy</Link> for how we handle personal information.</p>
        </section>
      </article>
    </SubPage>
  );
}
