import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutFaq } from "@/components/marketing/about-faq";
import { Reveal } from "@/components/marketing/reveal";
import { PhotoBanner, SubHeading, SubPage } from "@/components/marketing/subpage-shell";
export const metadata: Metadata = { title: "About", description: "TwinLink builds software with long-term value. Learn how the firm works, what it believes, and who thrives here." };
const VALUES = [
  { title: "User value first", body: "We build for real people and real needs." },
  { title: "Ownership", body: "We take responsibility and see things through." },
  { title: "Clear thinking", body: "We prefer simple, practical solutions over unnecessary complexity." },
  { title: "Long-term mindset", body: "We make decisions that remain valuable over time." },
];
const PRINCIPLES = [
  { title: "Our Mission", image: "our-mission.jpg", anchor: "mission" },
  { title: "Our Vision", image: "our-vision.jpg", anchor: "vision" },
  { title: "Our Goal", image: "our-goal.jpg", anchor: "values" },
];
export default function AboutPage() {
  return <SubPage className="sub-about">
    <PhotoBanner title="About TwinLink" image="/images/reference/subpages/banner-images/about-us-new.jpg" />
    <section className="sub-section"><div className="foundation-container sub-two-column">
      <Image src="/images/reference/home/about-hrs.jpg" alt="Professionals meeting and welcoming a colleague" width={1279} height={853} sizes="(min-width: 992px) 50vw, 100vw" />
      <div><SubHeading>About TwinLink</SubHeading>
        <p>TwinLink is a technology company focused on building products, systems, and digital experiences that solve meaningful problems. We care about strong engineering, clear thinking, and products that remain useful long after their first release.</p>
        <p>We believe good technology should reduce complexity rather than create more of it. Our mission is to turn difficult technical and business problems into products that feel simple, dependable, and useful to the people who rely on them.</p>
        <p>TwinLink is being built for the long term. We prefer durable decisions over temporary shortcuts, strong foundations over unnecessary complexity, and meaningful progress over activity for its own sake.</p>
      </div>
    </div></section>
    <section className="sub-section sub-principles"><div className="foundation-container"><SubHeading>Tech Services</SubHeading>
      <div className="sub-principle-grid">{PRINCIPLES.map((item, i) => <Reveal className="sub-principle-card reveal-copy" key={item.title} delay={i * 100}>
        <Link href={`#${item.anchor}`}><Image src={`/images/reference/subpages/hrs-values/${item.image}`} alt="" width={270} height={300} sizes="(min-width: 992px) 306px, (min-width: 576px) 33vw, 100vw" /><h3>{item.title}</h3></Link>
      </Reveal>)}</div>
    </div></section>
    <section className="sub-section"><div className="foundation-container sub-two-column">
      <div id="mission"><SubHeading>Why does TwinLink exist?</SubHeading><p>We believe good technology should reduce complexity rather than create more of it. Our mission is to turn difficult technical and business problems into products that feel simple, dependable, and useful to the people who rely on them.</p></div>
      <div id="vision"><SubHeading>The long view</SubHeading><p>TwinLink is being built for the long term. We prefer durable decisions over temporary shortcuts, strong foundations over unnecessary complexity, and meaningful progress over activity for its own sake. The goal is not to be slow or fast. The goal is to be deliberate.</p></div>
    </div></section>
    <section id="values" className="sub-section sub-principles"><div className="foundation-container"><SubHeading>What we believe in</SubHeading><div className="sub-values-grid">{VALUES.map((value, i) => <Reveal className="reveal-copy" key={value.title} delay={i * 100}><h3>{value.title}</h3><p>{value.body}</p></Reveal>)}</div></div></section>
    <section id="culture" aria-label="Life at TwinLink">
      <div className="sub-culture-banner"><Image src="/images/reference/subpages/banner-images/life-at-trinity-1.jpg" alt="Colleagues working together in an office" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center bottom" }} /></div>
      <div className="foundation-container sub-two-column">
        <Image src="/images/reference/subpages/work-life-balance.jpg" alt="Work and personal life in balance" width={1280} height={800} sizes="(min-width: 992px) 50vw, 100vw" />
        <div><SubHeading>Life at TwinLink</SubHeading><p>Small teams. Direct communication. Clear responsibility. We give people the freedom to think independently, take ownership, and make a real impact.</p><p>We value thoughtful work, practical collaboration and long-term development. Our culture brings curiosity and accountability together, with the space to learn and contribute to work that matters.</p><Link href="/careers">Explore careers and learn more about our culture</Link></div>
      </div>
    </section>
    <section className="sub-section"><div className="foundation-container"><SubHeading>Questions you might have</SubHeading><div className="sub-functional"><AboutFaq /></div><p className="mt-6"><Link href="/careers">See open roles</Link></p></div></section>
  </SubPage>;
}
