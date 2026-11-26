export type NavLink = { label: string; to: string; external?: boolean };
export type NavMenu = { label: string; groups: { title?: string; links: NavLink[] }[] };

const SECTORS = [
  ["Financial services", "financial-services"],
  ["Manufacturing", "manufacturing"],
  ["Retail & CPG", "retail-cpg"],
  ["Transportation & logistics", "transportation-logistics"],
  ["Sales & marketing", "sales-marketing"],
  ["HR & finance", "hr-finance"],
];

const PRODUCTS: NavMenu = { label: "Products", groups: [
  { title: "For enterprises", links: [{ label: "Enterprise", to: "/enterprise" }, { label: "Security & Trust", to: "https://trust.hcompany.ai/", external: true }] },
  { title: "For builders", links: [{ label: "Agents API", to: "/agents-api" }, { label: "Models API", to: "/models-api" }, { label: "Showcase", to: "https://showcase.hcompany.ai/", external: true }] },
  { title: "For everyone", links: [{ label: "HoloTab", to: "/holotab" }] },
] };

const RESEARCH: NavLink[] = [{ label: "Models", to: "/research/models" }, { label: "Publications", to: "/research/publications" }, { label: "Technical blog", to: "/technical-blog" }];
const RESOURCES: NavLink[] = [{ label: "Events & webinars", to: "/events" }, { label: "Blog", to: "/newsroom" }, { label: "Press pack", to: "/press" }];
const COMPANY: NavLink[] = [{ label: "About", to: "/about" }, { label: "Team", to: "/team" }, { label: "Careers", to: "/careers" }, { label: "Contact us", to: "/contact" }];

export const MENUS: NavMenu[] = [
  PRODUCTS,
  { label: "Research", groups: [{ links: RESEARCH }] },
  { label: "Solutions", groups: [
    { title: "Use cases", links: [...SECTORS.map(([label, sector]) => ({ label, to: `/use-cases?sector=${sector}#explorer` })), { label: "All use cases", to: "/use-cases" }] },
    { title: "Systems", links: [{ label: "SolidWorks", to: "/solutions/systems/solidworks" }] },
  ] },
  { label: "Resources", groups: [{ links: RESOURCES }] },
  { label: "Company", groups: [{ links: COMPANY }] },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: [
    ...PRODUCTS.groups.flatMap(group => group.links),
    { label: "H Platform", to: "/h-platform" }, { label: "Pricing", to: "/pricing" }, { label: "Docs", to: "https://hub.hcompany.ai/", external: true },
  ] },
  { title: "Research", links: [{ label: "Overview", to: "/research" }, ...RESEARCH] },
  { title: "Solutions", links: [{ label: "All use cases", to: "/use-cases" }, { label: "SolidWorks", to: "/solutions/systems/solidworks" }] },
  { title: "Resources", links: RESOURCES },
  { title: "Company", links: COMPANY },
];

export const ANNOUNCEMENT = {
  to: "/newsroom/h-company-aws-european-sovereign-cloud-press-release",
  short: "Twinlink on the AWS European Sovereign Cloud",
  long: "Twinlink launches its NVIDIA-powered agentic AI on the AWS European Sovereign Cloud",
};
