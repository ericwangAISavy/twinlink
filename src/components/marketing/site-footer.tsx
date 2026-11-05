import Link from "next/link";
import { SERVICE_LINKS } from "./service-links";
import type { CompanyContent } from "@/lib/constants";
import { ReferenceIcon } from "./reference-icon";

const LINKS = [
  ["Home", "/"], ["About us", "/about"], ["Life at TwinLink", "/about#culture"],
  ["Careers", "/careers"], ["Contact us", "/contact"], ["Privacy policy", "/privacy"],
];
const TECH = [
  ...SERVICE_LINKS.map(item => [item.label, `/services/${item.slug}`]),
  ["ERP Software", "/services/erp"], ["Our solutions", "/#solutions"],
];
const PEOPLE = [
  ["Engineering Network", "/#people"], ["Open roles", "/careers"], ["Talent enquiry", "/contact"],
  ["Case studies", "/case-studies"], ["Blog", "/blog"], ["Events", "/events"], ["Insights", "/#insights"],
];
function FooterLinks({ items }: { items: string[][] }) {
  return <ul className="foundation-footer-links">{items.map(([label, href]) => (
    <li key={label}><ReferenceIcon name="chevron-right" /><Link href={href}>{label}</Link></li>
  ))}</ul>;
}
export function SiteFooter({ company }: { company: CompanyContent }) {
  const email = company.email || "hello@twinlink.com";
  return (
    <footer id="site-footer" className="foundation-footer">
      <div className="foundation-footer-top">
        <div className="foundation-container foundation-footer-grid">
          <section><h2>Links</h2><FooterLinks items={LINKS} /></section>
          <section><h2>Tech services</h2><FooterLinks items={TECH} /></section>
          <section><h2>People & resources</h2><FooterLinks items={PEOPLE} /></section>
          <section className="foundation-footer-contact">
            <h2>Contact us</h2>
            <h3>TwinLink</h3>
            <p>Headquartered in China</p>
            {company.address && <p className="foundation-address">{company.address}</p>}
            <p>China Standard Time · UTC+8</p>
            {company.phone && <p className="foundation-contact-line"><ReferenceIcon name="telephone" /><a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a></p>}
            <p className="foundation-contact-line"><ReferenceIcon name="envelope" /><a href={`mailto:${email}`}>{email}</a></p>
            <div className="foundation-socials" aria-label="Social profiles unavailable">
              {(["linkedin", "youtube", "instagram"] as const).map(name => <button key={name} type="button" disabled aria-label={`${name} unavailable`} title={`${name} unavailable`}><ReferenceIcon name={name} /></button>)}
            </div>
          </section>
        </div>
      </div>
      <div className="foundation-copyright"><div className="foundation-container">
        <p>© {new Date().getFullYear()} Copyright <Link href="/">TwinLink</Link>. All rights reserved.</p>
        <Link href="/privacy#preferences">Privacy settings</Link>
      </div></div>
    </footer>
  );
}
