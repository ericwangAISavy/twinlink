import Link from "next/link";
import { BriefcaseBusiness, ClipboardCheck, Eye, Rocket, Search, UsersRound, Workflow, Wrench, type LucideIcon } from "lucide-react";
import { SERVICE_LINKS } from "./service-links";
import { Reveal } from "./reveal";

type Topic = { title: string; blurb: string; Icon: LucideIcon; href: string; cta: string };

/** Five core technology services, each linking to its dedicated service page. */
export const TECH_TOPICS: readonly Topic[] = SERVICE_LINKS.map(service => ({
  title: service.label,
  blurb: service.summary,
  Icon: service.Icon,
  href: `/services/${service.slug}`,
  cta: "Learn more",
}));

/** Five talent offerings (Executive + Retained Search merged; payroll removed). */
export const HR_TOPICS: readonly Topic[] = [
  { title: "Technical Recruiting", Icon: Search, href: "/contact", cta: "Hire with us",
    blurb: "Full-cycle hiring for software, data, cloud, and security roles." },
  { title: "Executive Search", Icon: BriefcaseBusiness, href: "/contact", cta: "Start a search",
    blurb: "Retained, research-led searches for technology and business leaders." },
  { title: "Contract & Managed Teams", Icon: UsersRound, href: "/contact", cta: "Build a team",
    blurb: "Contract specialists or a dedicated team, with delivery managed end to end." },
  { title: "Recruitment Process Outsourcing", Icon: Workflow, href: "/contact", cta: "Learn more",
    blurb: "We run all or part of your recruiting process as an extension of your team." },
  { title: "HR Consulting", Icon: ClipboardCheck, href: "/contact", cta: "Get started",
    blurb: "Hiring plans, role design, interview processes, and onboarding that scale." },
];

export function HomeHeading({ children, large = false }: { children: React.ReactNode; large?: boolean }) {
  return <h2 className={`home-heading${large ? " home-heading-large" : ""}`}>{children}</h2>;
}

export function HomeTopicGrid({ kind }: { kind: "tech" | "hr" }) {
  const topics = kind === "tech" ? TECH_TOPICS : HR_TOPICS;
  return <div className="home-topic-grid" data-topic-grid={kind}>
    {topics.map(topic => <article key={topic.title} className="home-topic-card" data-variant="icon">
      <Link href={topic.href} className="home-topic-link" aria-label={`${topic.title}: ${topic.cta}`}>
        <div className="home-topic-icon" aria-hidden="true"><topic.Icon size={24} strokeWidth={1.75} /></div>
        <h3 className="home-topic-title">{topic.title}</h3>
        <p className="home-topic-blurb">{topic.blurb}</p>
        <span className="home-topic-more">{topic.cta}<span aria-hidden="true"> →</span></span>
      </Link>
    </article>)}
  </div>;
}

/** Working principles, each with what it means in practice. */
const VALUES = [
  { title: "Engineers first", Icon: Wrench,
    body: "Engagements are scoped and led by people who build software for a living. From the first call, you talk with engineers who can review your architecture, not just a sales team." },
  { title: "Ship, then iterate", Icon: Rocket,
    body: "We deliver in small, reviewable increments instead of long plans. You see working software early, and every release is a chance to adjust scope with real evidence." },
  { title: "Transparency over comfort", Icon: Eye,
    body: "We tell clients and candidates what we actually think about scope, risk, timelines, and fit, even when it is not what they hoped to hear. Status is never a surprise." },
];
export function HomeValues() {
  return <section className="home-values home-section" aria-labelledby="home-values-heading">
    <div className="foundation-container">
      <HomeHeading><span id="home-values-heading">How we work</span></HomeHeading>
      <div className="home-three-grid">
        {VALUES.map((item, i) => <Reveal key={item.title} className="home-value reveal-copy" delay={(i + 1) * 100}>
          <div className="home-value-icon"><item.Icon size={24} strokeWidth={1.75} aria-hidden /></div>
          <h3>{item.title}</h3><p>{item.body}</p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
