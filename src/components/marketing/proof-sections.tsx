import Image from "next/image";
import { CLIENT_LOGOS, HERO_OUTCOME, TEAM, TESTIMONIALS } from "@/content/company-proof";
import { ReferenceIcon } from "./reference-icon";

/**
 * Trust sections driven by src/content/company-proof.ts.
 *
 * Production: each section renders nothing until it has REAL entries — the site never
 * shows invented clients, quotes, or people.
 * Development: an empty section shows a dashed "slot" so the layout can be reviewed
 * locally. Slots are never rendered in a production build.
 */
const SHOW_SLOTS = process.env.NODE_ENV !== "production";

function Slot({ title, hint }: { title: string; hint: string }) {
  return <div className="home-slot" role="note">
    <strong>{title}</strong>
    <span>{hint} Add entries in <code>src/content/company-proof.ts</code>. Hidden on the live site until then.</span>
  </div>;
}

export function HeroOutcome() {
  return HERO_OUTCOME ? <p className="home-hero-outcome">{HERO_OUTCOME}</p> : null;
}

export function ClientLogos() {
  if (!CLIENT_LOGOS.length) {
    return SHOW_SLOTS ? <section className="home-logos-band" aria-label="Clients"><div className="foundation-container">
      <Slot title="Trusted-by logo bar (4–6 client logos)" hint="Use only clients who have agreed to be named." />
    </div></section> : null;
  }
  return <section className="home-logos-band" aria-label="Clients"><div className="foundation-container home-logos">
    <p className="home-logos-label">Trusted by teams at</p>
    <ul>{CLIENT_LOGOS.map(client => <li key={client.name}>
      <Image src={client.logo} alt={client.name} width={client.width ?? 140} height={client.height ?? 40} />
    </li>)}</ul>
  </div></section>;
}

export function Testimonials() {
  if (!TESTIMONIALS.length) {
    return SHOW_SLOTS ? <section className="home-testimonials home-section" aria-label="Client testimonials"><div className="foundation-container">
      <h2 className="home-heading">What clients say</h2>
      <Slot title="Client testimonials (2–3 quotes)" hint="Each needs a real quote, name, title, and company, with the person's permission." />
    </div></section> : null;
  }
  return <section className="home-testimonials home-section" aria-labelledby="home-testimonials-heading">
    <div className="foundation-container">
      <h2 id="home-testimonials-heading" className="home-heading">What clients say</h2>
      <div className="home-three-grid">{TESTIMONIALS.map(item => <figure key={item.name} className="home-quote">
        <blockquote>“{item.quote}”</blockquote>
        <figcaption><strong>{item.name}</strong><span>{item.title}, {item.company}</span></figcaption>
      </figure>)}</div>
    </div>
  </section>;
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]!.toUpperCase()).join("");
}
export function TeamSection() {
  if (!TEAM.length) {
    return SHOW_SLOTS ? <section className="home-team home-section" aria-label="Leadership"><div className="foundation-container">
      <h2 className="home-heading">Leadership</h2>
      <Slot title="Leadership team (3–4 people)" hint="Name, title, LinkedIn URL, and an optional headshot (initials are shown without one)." />
    </div></section> : null;
  }
  return <section className="home-team home-section" aria-labelledby="home-team-heading">
    <div className="foundation-container">
      <h2 id="home-team-heading" className="home-heading">Leadership</h2>
      <ul className="home-team-grid">{TEAM.map(person => <li key={person.name} className="home-person">
        {person.photo
          ? <Image src={person.photo} alt={person.name} width={160} height={160} className="home-person-photo" />
          : <span className="home-person-avatar" aria-hidden="true">{initials(person.name)}</span>}
        <h3>{person.name}</h3>
        <p>{person.title}</p>
        {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}><ReferenceIcon name="linkedin" /> LinkedIn</a>}
      </li>)}</ul>
    </div>
  </section>;
}
