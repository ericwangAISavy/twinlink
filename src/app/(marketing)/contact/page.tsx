import type { Metadata } from "next";
import { ResourceLinks } from "@/components/resources/resource-shell";
import { ContactForm } from "@/components/resources/contact-form";
import { getCompanyProfile } from "@/server/queries/company";
import { SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
export const metadata: Metadata = { title: "Contact", description: "Talk with Twinlink about technology consulting, engineering teams, hiring, or careers." };
export default async function ContactPage() {
  const company = await getCompanyProfile();
  const email = company.email || "hello@twinlink.com";
  return <SubPage className="sub-contact">
    <WaveBanner title="Contact us" />
    <section className="sub-section"><div className="foundation-container sub-contact-grid">
      <div>
        <div className="sub-contact-card"><h2>Let&apos;s talk</h2><p>We connect engineering expertise with the people and organizations ready to put it to work. Reach out about a project, a hiring need, a partnership, or a career at Twinlink.</p></div>
        {company.address ? <div className="sub-contact-card"><h2>Office</h2><p className="whitespace-pre-line">{company.address}</p>{company.phone && <p><a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a></p>}</div> : null}
        <div className="sub-contact-card"><h2>Meetings</h2><p>Available by video call, or in person by appointment.</p></div>
        <div className="sub-contact-card"><h2>Email us</h2><a href={`mailto:${email}`} className="break-all">{email}</a></div>
      </div>
      <div className="sub-contact-card"><div className="sub-form-heading"><h2>What are you working on?</h2></div><div className="sub-functional"><ContactForm email={email} /></div></div>
    </div></section>
    <ResourceLinks />
  </SubPage>;
}
