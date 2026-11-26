import Link from "next/link";
import { SERVICE_LINKS } from "./service-links";
import type { CompanyContent } from "@/lib/constants";
import { SOCIAL_LINKS } from "@/content/company-proof";
import { ReferenceIcon } from "./reference-icon";
import { BrandLogo } from "./brand-logo";

const LINKS = [
  ["About us", "/about"], ["Life at Twinlink", "/about#culture"], ["Careers", "/careers"],
  ["Contact us", "/contact"],
];
const TECH = [
  ...SERVICE_LINKS.map(item => [item.label, `/services/${item.slug}`]),
];
const PEOPLE = [
  ["Talent solutions", "/#people"], ["Open roles", "/careers"], ["Hire talent", "/contact"],
  ["Case studies", "/case-studies"], ["Blog", "/blog"], ["Events", "/events"],
];
function FooterLinks({ items }: { items: string[][] }) {
  return <ul className="foundation-footer-links">{items.map(([label, href]) => (
    <li key={label}><ReferenceIcon name="chevron-right" /><Link href={href}>{label}</Link></li>
  ))}</ul>;
}
export function SiteFooter({ company }: { company: CompanyContent }) {
  const email = company.email || "hello@twinlink.com";
  const socials = [
    SOCIAL_LINKS.linkedin && { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: true },
    SOCIAL_LINKS.x && { label: "X", href: SOCIAL_LINKS.x, icon: false },
    SOCIAL_LINKS.github && { label: "GitHub", href: SOCIAL_LINKS.github, icon: false },
  ].filter((item): item is { label: string; href: string; icon: boolean } => Boolean(item));
  return (
    <footer id="site-footer" className="foundation-footer">
      <div className="foundation-footer-top">
        <div className="foundation-container foundation-footer-grid">
          <section className="foundation-footer-contact">
            <h2 className="sr-only">Contact us</h2>
            <Link href="/" className="foundation-footer-brand" aria-label="Twinlink home"><BrandLogo height={36} /></Link>
            <p>Technology Consulting · AI · Engineering · Digital Marketing</p>
            {company.address && <p className="foundation-address"><ReferenceIcon name="geo-alt" /> {company.address}</p>}
            {company.phone && <p className="foundation-contact-line"><ReferenceIcon name="telephone" /><a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a></p>}
            <p className="foundation-contact-line"><ReferenceIcon name="envelope" /><a href={`mailto:${email}`}>{email}</a></p>
            {socials.length > 0 && <div className="foundation-socials">{socials.map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Twinlink on ${item.label}`}>
                {item.icon && <ReferenceIcon name="linkedin" />}{item.label}
              </a>
            ))}</div>}
          </section>
          <section><h2>Company</h2><FooterLinks items={LINKS} /></section>
          <section><h2>Technology services</h2><FooterLinks items={TECH} /></section>
          <section><h2>Talent &amp; resources</h2><FooterLinks items={PEOPLE} /></section>
        </div>
      </div>
      <div className="foundation-copyright"><div className="foundation-container">
        <p>© {new Date().getFullYear()} Twinlink. All rights reserved.</p>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
        <Link href="/privacy#preferences">Privacy settings</Link>
      </div></div>
    </footer>
  );
}
