import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Compass, Gem, Target } from "lucide-react";
import { AboutFaq } from "@/components/marketing/about-faq";
import { Reveal } from "@/components/marketing/reveal";
import { SubHeading, SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
export const metadata: Metadata = { title: "About", description: "Twinlink builds software with long-term value. Learn how the firm works, what it believes, and who thrives here." };
const VALUES = [
  { title: "Engineers first", body: "Engagements are scoped and led by people who build software for a living." },
  { title: "Ship, then iterate", body: "Small, reviewable releases instead of long plans, so progress is visible early." },
  { title: "Transparency over comfort", body: "Honest views on scope, risk, timelines, and fit, even when they are unwelcome." },
  { title: "Built to last", body: "Documented systems and clean handoffs that your team can run after we leave." },
];
const PRINCIPLES = [
  { title: "Our mission", Icon: Target, anchor: "mission", body: "Turn difficult technical and business problems into products that feel simple and dependable." },
  { title: "Our vision", Icon: Compass, anchor: "vision", body: "Build for the long term, with durable decisions and strong engineering foundations." },
  { title: "Our values", Icon: Gem, anchor: "values", body: "Engineers first, ship then iterate, transparency over comfort, and work that is built to last." },
];
const CULTURE = ["Small teams with clear ownership", "Direct, honest communication", "Room to learn and grow", "Work that has real impact"];
export default function AboutPage() {
  return <SubPage className="sub-about">
    <WaveBanner title="About Twinlink" />
    <section className="sub-section"><div className="foundation-container sub-two-column">
      <Image src="/images/reference/home/about-hrs.jpg" alt="Professionals meeting and welcoming a colleague" width={1279} height={853} sizes="(min-width: 992px) 50vw, 100vw" />
      <div><SubHeading>Who we are</SubHeading>
        <p>Twinlink is a technology company focused on building products, systems, and digital experiences that solve meaningful problems. We care about strong engineering, clear thinking, and products that remain useful long after their first release.</p>
        <p>We believe good technology should reduce complexity rather than create more of it. Our mission is to turn difficult technical and business problems into products that feel simple, dependable, and useful to the people who rely on them.</p>
        <p>Twinlink is being built for the long term. We prefer durable decisions over temporary shortcuts, strong foundations over unnecessary complexity, and meaningful progress over activity for its own sake.</p>
      </div>
    </div></section>
    <section className="sub-section sub-principles"><div className="foundation-container"><SubHeading>What guides us</SubHeading>
      <div className="sub-principle-grid">{PRINCIPLES.map((item, i) => <Reveal className="sub-principle-card reveal-copy" key={item.title} delay={i * 100}>
        <Link href={`#${item.anchor}`}><span className="sub-principle-icon" aria-hidden="true"><item.Icon size={24} strokeWidth={1.75} /></span><h3>{item.title}</h3><p>{item.body}</p></Link>
      </Reveal>)}</div>
    </div></section>
    <section className="sub-section"><div className="foundation-container sub-two-column">
      <div id="mission"><SubHeading>Why does Twinlink exist?</SubHeading><p>We believe good technology should reduce complexity rather than create more of it. Our mission is to turn difficult technical and business problems into products that feel simple, dependable, and useful to the people who rely on them.</p></div>
      <div id="vision"><SubHeading>The long view</SubHeading><p>Twinlink is being built for the long term. We prefer durable decisions over temporary shortcuts, strong foundations over unnecessary complexity, and meaningful progress over activity for its own sake. The goal is not to be slow or fast. The goal is to be deliberate.</p></div>
    </div></section>
    <section id="values" className="sub-section sub-principles"><div className="foundation-container"><SubHeading>Our values</SubHeading><div className="sub-values-grid">{VALUES.map((value, i) => <Reveal className="reveal-copy" key={value.title} delay={i * 100}><h3>{value.title}</h3><p>{value.body}</p></Reveal>)}</div></div></section>
    <section id="culture" className="sub-section" aria-label="Life at Twinlink">
      <div className="foundation-container sub-two-column">
        <div className="sub-culture-panel"><p className="sub-culture-eyebrow">How we work</p><ul>{CULTURE.map(item => <li key={item}><Check size={18} strokeWidth={2.25} aria-hidden="true" />{item}</li>)}</ul></div>
        <div><SubHeading>Life at Twinlink</SubHeading><p>Small teams. Direct communication. Clear responsibility. We give people the freedom to think independently, take ownership, and make a real impact.</p><p>We value thoughtful work, practical collaboration and long-term development. Our culture brings curiosity and accountability together, with the space to learn and contribute to work that matters.</p><Link href="/careers">Explore careers and learn more about our culture</Link></div>
      </div>
    </section>
    <section className="sub-section"><div className="foundation-container"><SubHeading>Questions you might have</SubHeading><div className="sub-functional"><AboutFaq /></div><p className="mt-6"><Link href="/careers">See open roles</Link></p></div></section>
  </SubPage>;
}
