import type { Metadata } from "next";
import { ResourceLinks } from "@/components/resources/resource-shell";
import { ContactForm } from "@/components/resources/contact-form";
import { getCompanyProfile } from "@/server/queries/company";
import { SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
export const metadata: Metadata = { title: "Contact", description: "Connect with Twinlink, a China-headquartered technology company working with global teams." };
export default async function ContactPage() {
  const company = await getCompanyProfile();
  const email = company.email || "hello@twinlink.com";
  return <SubPage className="sub-contact">
    <WaveBanner title="Contact Us" />
    <section className="sub-section"><div className="foundation-container sub-contact-grid">
      <div>
        <div className="sub-contact-card"><h2>Headquarters</h2><p>China</p><p>For an in-person meeting, contact us to arrange the location.</p><p>We connect engineering expertise with the people and organizations ready to put it to work. Get in touch about partnerships, careers, or our community program.</p></div>
        <div className="sub-contact-card"><h2>Our time zone</h2><p>China Standard Time · UTC+8</p></div>
        <div className="sub-contact-card"><h2>Write to us</h2><a href={`mailto:${email}`} className="break-all">{email}</a></div>
      </div>
      <div className="sub-contact-card"><div className="sub-form-heading"><h2>What are you working on?</h2></div><div className="sub-functional"><ContactForm email={email} /></div></div>
    </div></section>
    <ResourceLinks />
  </SubPage>;
}
