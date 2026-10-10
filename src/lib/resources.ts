export type Resource = {
  slug: string;
  kind: "case-studies" | "blog" | "events";
  category: string;
  title: string;
  summary: string;
  image: string;
  label: string;
  sections: { title: string; body: string }[];
  date?: string;
  end?: string;
  location?: string;
};
export const resources: Resource[] = [
  {
    slug: "a-platform-built-to-grow",
    kind: "case-studies",
    category: "Platform engineering",
    title: "A platform built to grow.",
    summary:
      "An illustrative blueprint for helping a regional commerce platform expand without multiplying operational complexity.",
    image: "/images/case-study-waterfront.jpg",
    label: "Illustrative engagement",
    sections: [
      {
        title: "The challenge",
        body: "A commerce team preparing to serve new markets needs more than extra infrastructure. Orders, inventory, and customer experiences must remain consistent as regional integrations and traffic patterns change. This example explores how we would approach that transition.",
      },
      {
        title: "The approach",
        body: "Start with a map of critical customer journeys and the services behind them. Separate market-specific integrations from core business capabilities. Introduce observable service boundaries, contract tests, and incremental deployment so the team can migrate one workflow at a time.",
      },
      {
        title: "What we would measure",
        body: "Track order completion, recovery time, and deployment lead time against a baseline. Validate capacity with realistic traffic before expansion. A successful handover includes runbooks, ownership boundaries, and an internal team able to operate the platform independently.",
      },
    ],
  },
  {
    slug: "from-data-to-decisions",
    kind: "case-studies",
    category: "Data & AI",
    title: "From fragmented data to clearer decisions.",
    summary:
      "An illustrative approach to making operational reporting consistent, traceable, and useful across distributed teams.",
    image: "/images/about-vision-ai.jpg",
    label: "Illustrative engagement",
    sections: [
      {
        title: "The challenge",
        body: "When business units define the same metric differently, a dashboard can create disagreement instead of clarity. This example considers a growing organization with inconsistent reporting and manual reconciliation.",
      },
      {
        title: "The approach",
        body: "Agree on definitions with the people who use the data. Build source-to-report lineage, incremental pipelines, and quality checks at ingestion. Give each dataset an owner and document how corrections propagate through the reporting layer.",
      },
      {
        title: "A foundation for practical AI",
        body: "Only add AI once access controls and data quality are dependable. Evaluate retrieval against representative questions, show source material, and keep a human review path for consequential decisions. Measure usefulness and error rates rather than the volume of generated output.",
      },
    ],
  },
  {
    slug: "delivery-across-borders",
    kind: "case-studies",
    category: "Delivery transformation",
    title: "One team. Across borders.",
    summary:
      "An illustrative operating model connecting a China-based engineering team with global product partners.",
    image: "/images/our-people-handshake.jpg",
    label: "Illustrative engagement",
    sections: [
      {
        title: "The challenge",
        body: "Distributed teams often lose time to unclear handoffs rather than difficult engineering. This example explores a product organization working across China and overseas markets, with different time zones and local requirements.",
      },
      {
        title: "The approach",
        body: "Use shared acceptance criteria, short written decision records, and a small daily overlap window. Assign owners to complete outcomes instead of isolated tasks. Keep product discovery close to engineers so trade-offs are resolved before implementation.",
      },
      {
        title: "Making collaboration durable",
        body: "Publish a release calendar, make dependencies visible, and record important decisions in accessible language. Review lead time and rework together. The goal is a team that can make good decisions without relying on a single coordinator.",
      },
    ],
  },
  {
    slug: "architecture-that-earns-its-complexity",
    kind: "blog",
    category: "Engineering",
    title: "Architecture should earn its complexity.",
    summary:
      "Before adding another service, ask which problem it solves—and who will operate it.",
    image: "/images/how-we-help-architecture.jpg",
    label: "6 min read",
    sections: [
      {
        title: "Start with the constraint",
        body: "A new architecture is useful when it addresses a constraint the team can name. That might be a deployment bottleneck, a security boundary, or a workload that needs independent scaling. Draw the current system and mark where the constraint appears before selecting a pattern.",
      },
      {
        title: "Count the operating cost",
        body: "Every new service introduces deployment, monitoring, access management, and failure modes. Include those responsibilities in the design review. If no team can own the service on a difficult day, the boundary is probably premature.",
      },
      {
        title: "Make the next step reversible",
        body: "Favor changes that can be tested with a narrow workflow. A modular application with clear internal interfaces can be a better starting point than a distributed system. Record the evidence that would justify a future split, and revisit the decision when that evidence arrives.",
      },
    ],
  },
  {
    slug: "practical-ai-starts-with-evaluation",
    kind: "blog",
    category: "Data & AI",
    title: "Practical AI starts with evaluation.",
    summary:
      "A small, representative evaluation set is more valuable than a convincing demo.",
    image: "/images/our-people-hologram.jpg",
    label: "5 min read",
    sections: [
      {
        title: "Define a useful answer",
        body: "Ask the people doing the work to describe what a correct answer looks like. Collect ordinary questions, ambiguous requests, and cases where the system should decline to answer. Keep examples free of unnecessary personal data.",
      },
      {
        title: "Test the whole workflow",
        body: "Measure retrieval, generation, and the final human action separately. A fluent answer can still cite the wrong source. Show evidence, test permission boundaries, and include cases where information is missing or out of date.",
      },
      {
        title: "Ship a feedback loop",
        body: "Release to a small group with a clear escalation path. Review failures, label useful feedback, and rerun the evaluation set when prompts or models change. Expansion should follow observed reliability, not the novelty of the technology.",
      },
    ],
  },
  {
    slug: "working-well-across-time-zones",
    kind: "blog",
    category: "People & delivery",
    title: "Working well across time zones.",
    summary:
      "How written decisions, thoughtful handoffs, and shared ownership keep distributed teams moving.",
    image: "/images/about-culture-office.jpg",
    label: "4 min read",
    sections: [
      {
        title: "Write for the next person",
        body: "A useful handoff states what changed, what remains uncertain, and what action comes next. Link to the relevant work and explain decisions in plain language. The reader should not need to reconstruct a conversation to continue.",
      },
      {
        title: "Protect overlap time",
        body: "Use shared working hours for decisions and collaboration, not routine updates. Publish status asynchronously and bring a short agenda to discussions. Rotate inconvenient meeting times when teams work across regions.",
      },
      {
        title: "Share the outcome",
        body: "Agree on what successful delivery means before distributing the work. A team in China and a partner overseas should be able to point to the same acceptance criteria. Review what slowed the last handoff and improve one habit at a time.",
      },
    ],
  },
  {
    slug: "engineering-across-borders",
    kind: "events",
    category: "Roundtable",
    title: "Engineering across borders.",
    summary:
      "A proposed conversation about connecting China-based engineering teams with global product organizations.",
    image: "/images/our-people-handshake.jpg",
    label: "Proposed program · not confirmed",
    date: "2026-11-19T06:00:00Z",
    end: "2026-11-19T07:00:00Z",
    location: "Online · proposed",
    sections: [
      {
        title: "The conversation",
        body: "Explore practical ways to build shared ownership across locations: decision records, discovery habits, and handoffs that keep momentum without adding meetings. This is a proposed event concept; the date and program are not confirmed.",
      },
      {
        title: "Proposed agenda",
        body: "14:00 China Standard Time: welcome and context. 14:10: distributed delivery patterns. 14:35: a facilitated discussion of collaboration challenges. 14:50: questions and closing takeaways.",
      },
      {
        title: "Who it is for",
        body: "Engineering leaders, product managers, and practitioners working across regional teams. Express interest by email to help shape the program. An interest email is not a confirmed registration.",
      },
    ],
  },
  {
    slug: "responsible-ai-in-practice",
    kind: "events",
    category: "Workshop",
    title: "From AI prototype to dependable product.",
    summary:
      "A proposed hands-on session on evaluation, evidence, and the path to a useful first release.",
    image: "/images/about-vision-ai.jpg",
    label: "Proposed program · not confirmed",
    date: "2026-12-03T07:00:00Z",
    end: "2026-12-03T08:30:00Z",
    location: "Online · proposed",
    sections: [
      {
        title: "The workshop",
        body: "Work through a simple evaluation plan for an AI-assisted workflow. Discuss representative questions, source attribution, and human review. This is a proposed event concept, with no confirmed speaker or registration program.",
      },
      {
        title: "Proposed agenda",
        body: "15:00 China Standard Time: define the problem. 15:15: build an evaluation set. 15:45: review failure cases and permission boundaries. 16:15: discuss a staged release plan.",
      },
      {
        title: "Before attending",
        body: "Bring a workflow you want to improve and a few non-sensitive example questions. No customer records or credentials are needed. Email your interest; attendance and final scheduling will need separate confirmation.",
      },
    ],
  },
];
export function resourceHref(item: Resource) {
  return `/${item.kind}/${item.slug}`;
}
export function chinaDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}
