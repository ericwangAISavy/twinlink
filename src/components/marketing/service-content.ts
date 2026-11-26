import type { LucideIcon } from "lucide-react";
import { SERVICE_LINKS } from "./service-links";

/**
 * Core technology services. Five consolidated offerings; legacy service URLs
 * (cloud-services, sap-services, erp, …) redirect here via next.config.ts.
 * Copy describes how Twinlink approaches the work — it does not claim vendor
 * partnerships, certifications, or client results.
 */
export type ServiceContent = {
  slug: string;
  title: string;
  /** One-line outcome used on cards and as the page lede. */
  summary: string;
  Icon: LucideIcon;
  intro: readonly string[];
  capabilities: readonly { title: string; body: string }[];
  related: readonly string[];
};

type ServiceDetail = Omit<ServiceContent, "title" | "summary" | "Icon">;
const DETAILS: readonly ServiceDetail[] = [
  {
    slug: "digital-strategy-transformation",
    intro: [
      "Digital strategy connects technology decisions with business goals. We start with how people work today, where systems create friction, and which changes can deliver measurable value, then turn that into a roadmap with clear owners, budgets, and milestones.",
      "Transformation is delivered in stages. Each release is reviewed with the people who use it, and the evidence guides the next investment.",
    ],
    capabilities: [
      { title: "Current-state assessment", body: "Review systems, processes, costs, and constraints to establish an honest baseline." },
      { title: "Roadmap and business case", body: "Prioritize initiatives with explicit outcomes, timelines, budgets, and accountable owners." },
      { title: "Technology selection", body: "Evaluate platforms against real requirements, integration needs, security, and total cost." },
      { title: "Delivery and adoption", body: "Implement in manageable stages with testing, observability, and a plan for change management." },
    ],
    related: ["cloud-infrastructure", "data-ai", "enterprise-applications"],
  },
  {
    slug: "cloud-infrastructure",
    intro: [
      "A useful cloud strategy starts with workload requirements, security obligations, and the skills of the team that will operate it, not with a platform trend. We help you compare cloud, hybrid, and on-premises options and choose what fits.",
      "We design environments that are reproducible, observable, and reviewable, and we can take on day-to-day operations of the applications that run on them.",
    ],
    capabilities: [
      { title: "Cloud migration", body: "Assess applications and data, plan dependencies and rollback, and move in stages that minimize disruption." },
      { title: "Infrastructure as code", body: "Provision environments consistently with reviewable changes and useful alerting." },
      { title: "Backup and recovery", body: "Set recovery objectives per workload and prove them with regular recovery exercises." },
      { title: "Managed applications", body: "Monitoring, patching, upgrades, and support for business applications with clear service levels." },
    ],
    related: ["cybersecurity-risk", "data-ai", "digital-strategy-transformation"],
  },
  {
    slug: "data-ai",
    intro: [
      "Useful analytics and AI begin with a clear business question and trustworthy information. We design the data foundations first — ownership, quality, and governance — so reports and models can be relied on.",
      "For AI, we focus on practical applications such as retrieval, workflow automation, and decision support, evaluated against a meaningful baseline and monitored after release.",
    ],
    capabilities: [
      { title: "Data platforms", body: "Pipelines, warehouses, and lakehouses with clear definitions, quality checks, and access controls." },
      { title: "Business intelligence", body: "Dashboards and reporting designed around the decisions people need to make." },
      { title: "Applied AI", body: "Retrieval, assistants, and automation with evaluation, guardrails, and human oversight." },
      { title: "Machine learning", body: "Models that are explainable, monitored, and maintained after deployment." },
    ],
    related: ["cloud-infrastructure", "cybersecurity-risk", "digital-strategy-transformation"],
  },
  {
    slug: "cybersecurity-risk",
    intro: [
      "Managing cyber risk starts with knowing which information and services matter most. We combine technical controls, clear responsibilities, and everyday habits that help people recognize and respond to threats.",
      "Recommendations are prioritized by business impact, so you know what to fix first and who owns each remaining risk.",
    ],
    capabilities: [
      { title: "Risk assessment", body: "Identify critical assets, likely threats, and the weaknesses that could disrupt operations." },
      { title: "Cloud and network security", body: "Review identity, access, encryption, and network boundaries across environments." },
      { title: "Data protection", body: "Map where sensitive data lives and apply encryption, retention, and access policies." },
      { title: "Security awareness", body: "Practical training that helps people spot and report suspicious activity." },
    ],
    related: ["cloud-infrastructure", "data-ai", "enterprise-applications"],
  },
  {
    slug: "enterprise-applications",
    intro: [
      "Enterprise systems connect finance, operations, and people processes. Improving them requires understanding the hand-offs between teams, the quality of shared data, and the controls needed to manage risk.",
      "We help with ERP and SAP programs from requirements through integration and support. Platform-specific availability is confirmed during scoping; no vendor partnership or certification is implied.",
    ],
    capabilities: [
      { title: "ERP and SAP implementation", body: "Define the processes a platform must support and plan stages, testing, and cut-over." },
      { title: "Integration", body: "Connect core systems with agreed data definitions, validation rules, and failure handling." },
      { title: "Configuration over customization", body: "Meet requirements with configuration first and document every extension." },
      { title: "Support and maintenance", body: "Operational ownership, access reviews, patching, and a clear escalation path." },
    ],
    related: ["digital-strategy-transformation", "cloud-infrastructure", "data-ai"],
  },
];

export const SERVICES: readonly ServiceContent[] = DETAILS.map(detail => {
  const link = SERVICE_LINKS.find(item => item.slug === detail.slug)!;
  return { ...detail, title: link.label, summary: link.summary, Icon: link.Icon };
});

const BY_SLUG = new Map(SERVICES.map(service => [service.slug, service]));
export function getService(slug: string) { return BY_SLUG.get(slug); }

/** Old service URLs → consolidated service, used for permanent redirects. */
export const LEGACY_SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "cloud-services": "cloud-infrastructure",
  "infrastructure-services": "cloud-infrastructure",
  "managed-application": "cloud-infrastructure",
  "big-data-analytics": "data-ai",
  "enterprise-services": "enterprise-applications",
  "sap-services": "enterprise-applications",
  erp: "enterprise-applications",
};
