import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { getCompanyProfile } from "@/server/queries/company";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how TwinLink partners with engineering organizations to ship software that lasts.",
};

export default async function AboutPage() {
  const company = await getCompanyProfile();

  return (
    <>
      <Section eyebrow="The firm" title={company.name}>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{company.about}</p>
      </Section>
      <Section eyebrow="Mission" title="Our charge">
        <p className="max-w-3xl text-lg text-muted-foreground">{company.mission}</p>
      </Section>
      <Section eyebrow="Vision" title="The long view" dark>
        <p className="max-w-3xl text-lg text-white/75">{company.vision}</p>
      </Section>
      <Section eyebrow="Contact" title="Start a conversation">
        <div className="max-w-xl space-y-2 text-muted-foreground">
          {company.email ? <p>{company.email}</p> : null}
          {company.phone ? <p>{company.phone}</p> : null}
          {company.address ? <p>{company.address}</p> : null}
        </div>
      </Section>
    </>
  );
}
