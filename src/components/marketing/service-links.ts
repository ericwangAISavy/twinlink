import { BrainCircuit, Cloud, Compass, Layers, ShieldCheck } from "lucide-react";

/** The five core technology services: names, one-line outcomes, and icons used by cards, nav, and footer. */
export const SERVICE_LINKS = [
  { label: "Digital Strategy & Transformation", slug: "digital-strategy-transformation", Icon: Compass,
    summary: "Turn business goals into a sequenced technology roadmap your teams can actually deliver." },
  { label: "Cloud & Infrastructure", slug: "cloud-infrastructure", Icon: Cloud,
    summary: "Migrate, modernize, and operate reliable infrastructure on AWS, Azure, or Google Cloud." },
  { label: "Data & AI", slug: "data-ai", Icon: BrainCircuit,
    summary: "Build trustworthy data platforms and practical AI that holds up in production." },
  { label: "Cybersecurity & Risk", slug: "cybersecurity-risk", Icon: ShieldCheck,
    summary: "Find and fix the security risks that matter most, from identity to incident response." },
  { label: "Enterprise Applications", slug: "enterprise-applications", Icon: Layers,
    summary: "Implement, integrate, and support ERP and core business systems, including SAP." },
] as const;
