import Image from "next/image";
import { SERVICE_LINKS } from "./service-links";
import Link from "next/link";
import { Reveal } from "./reveal";

type Topic = { lines: readonly string[]; image: string };
export const TECH_TOPICS: readonly Topic[] = [
  { lines: ["Digital Strategy", "& Transformation"], image: "digital-transformation.jpg" },
  { lines: ["Managed", "Application"], image: "managed-application.jpg" },
  { lines: ["Cloud Services", "Solutions"], image: "cloud-services.jpg" },
  { lines: ["Enterprise", "Services"], image: "enterpraise-services.jpg" },
  { lines: ["SAP", "Services"], image: "sap-services.jpg" },
  { lines: ["Infrastructure", "Services"], image: "infra.png" },
  { lines: ["Cyber", "Security"], image: "cyber-security.jpg" },
  { lines: ["Big Data", "& Analytics"], image: "big-data.jpg" },
];
export const HR_TOPICS: readonly Topic[] = [
  { lines: ["Recruitment", "Services"], image: "recuriment-services.jpg" },
  { lines: ["Executive", "Recruitment"], image: "executive-recuriment.jpg" },
  { lines: ["Retained", "Search"], image: "retained-search.jpg" },
  { lines: ["Staffing", "Services"], image: "staffing-services.jpg" },
  { lines: ["RPO", "Services"], image: "rpo.jpg" },
  { lines: ["Managed Staffing", "Services"], image: "managed-staff.jpg" },
  { lines: ["HR", "Consultancy"], image: "HR-Consultancy.jpg" },
  { lines: ["Payroll", "Outsourcing"], image: "pay-roll.jpg" },
];
export function HomeHeading({ children, large = false }: { children: React.ReactNode; large?: boolean }) {
  return <h2 className={`home-heading${large ? " home-heading-large" : ""}`}>{children}</h2>;
}
export function HomeTopicGrid({ kind }: { kind: "tech" | "hr" }) {
  const topics = kind === "tech" ? TECH_TOPICS : HR_TOPICS;
  return <div className="home-topic-grid" data-topic-grid={kind}>
    {topics.map((topic, index) => <article key={topic.image} className="home-topic-card">
      <Link href={kind === "tech" ? `/services/${SERVICE_LINKS[index].slug}` : "/contact"} className="home-topic-link" aria-label={`Discuss ${topic.lines.join(" ")}`}>
        <div className="home-topic-photo">
          <Image src={`/images/reference/home/${kind}-services/${topic.image}`} alt="" width={270} height={300}
            sizes="(min-width: 1400px) 306px, (min-width: 992px) 25vw, (min-width: 768px) 33vw, (min-width: 576px) 50vw, 100vw" />
        </div>
        <div className="home-topic-label">
          <span className="home-cog" aria-hidden="true" />
          <h3>{topic.lines[0]}<br />{topic.lines[1]}</h3>
        </div>
      </Link>
    </article>)}
  </div>;
}
const VALUES = [
  { title: "Our Commitment", icon: "deal.png", body: "Taking ownership of our customers’ needs and being accountable for delivering friendly and professional service." },
  { title: "Our Integrity", icon: "distributed.png", body: "Being open and honest in all our dealings and maintaining the highest integrity at all times." },
  { title: "Service Excellence", icon: "24-7.png", body: "Always doing what we say we will and striving for excellence and quality in everything we do." },
];
export function HomeValues() {
  return <section className="home-values" aria-label="Our values">
    <div className="foundation-container home-three-grid">
      {VALUES.map((item, i) => <Reveal key={item.title} className="home-value home-zoom reveal-copy" delay={(i + 1) * 100}>
        <div className="home-value-icon"><Image src={`/images/reference/home/icons/${item.icon}`} alt="" width={64} height={64} /></div>
        <h3><Link href="/about#values">{item.title}</Link></h3><p>{item.body}</p>
      </Reveal>)}
    </div>
  </section>;
}
const CAREER_CARDS = [
  { title: "Job Search", image: "job-search.jpeg", href: "/careers", body: "Find work that puts your experience to good use. Browse TwinLink’s published roles, search by title or location, and filter opportunities to find a fit. Open a role to review the details and apply directly, with or without a candidate account." },
  { title: "Insights and Resources", image: "job-tips.jpg", href: "/blog", body: "Explore practical perspectives on engineering, technology and delivery in the TwinLink journal. Read case studies to see our approach to complex challenges, or discover events and conversations that connect our community." },
  { title: "Explore Opportunities", image: "register-cv.jpg", href: "/careers", body: "Take the next step in your professional life. Explore the roles currently open at TwinLink and apply for the opportunity that fits. You can apply without signing in, or create a candidate account to manage your profile and resume." },
];
export function HomeCareerCards() {
  return <section className="home-careers" aria-labelledby="home-careers-heading">
    <div className="foundation-container">
      <HomeHeading><span id="home-careers-heading">What We Do</span></HomeHeading>
      <div className="home-three-grid">
        {CAREER_CARDS.map((card, i) => <Reveal key={card.title} className="home-career-card home-zoom reveal-copy" delay={(i + 1) * 100}>
          <Link href={card.href} className="home-career-image" tabIndex={-1} aria-hidden="true"><Image src={`/images/reference/home/hrs-values/${card.image}`} alt="" width={400} height={200} sizes="(min-width: 992px) 400px, (min-width: 768px) 50vw, 100vw" /></Link>
          <h3><Link href={card.href}>{card.title}</Link></h3><p>{card.body}</p>
          {i === 2 && <p className="home-career-links"><Link href="/careers">View open roles</Link> · <Link href="/register">Create a candidate account</Link></p>}
          {i === 1 && <p className="home-career-links"><Link href="/case-studies">Case studies</Link> · <Link href="/events">Events</Link></p>}
        </Reveal>)}
      </div>
    </div>
  </section>;
}
