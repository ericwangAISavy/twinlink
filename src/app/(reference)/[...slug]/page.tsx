import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroWash } from "@/components/reference/hero-wash";
import { render, type ContentNode } from "@/components/reference/render";
import { Calculator, Scorecard, StorySearch } from "@/components/reference/tools";

type Page = { path: string; title: string; description: string; wash: boolean; tree: ContentNode[] };

const DIRECTORY = join(process.cwd(), "src/content/reference");
const names = () => readdirSync(DIRECTORY).map((file) => file.replace(/\.json$/, ""));

function load(slug: string[]): Page {
  const name = slug.map(decodeURIComponent).join("__");
  if (!names().includes(name)) notFound();
  return JSON.parse(readFileSync(join(DIRECTORY, `${name}.json`), "utf8")) as Page;
}

/** Pages with behaviour beyond their captured markup. */
const TOOLS: Record<string, React.ComponentType> = {
  "/bot-run-cost-calculator": Calculator,
  "/exception-queue-scorecard": Scorecard,
  "/newsroom": StorySearch,
  "/technical-blog": StorySearch,
  "/insights": StorySearch,
};

export function generateStaticParams() {
  return names().map((name) => ({ slug: name.split("__") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const page = load((await params).slug);
  const description = page.description || undefined;
  return {
    title: { absolute: page.title },
    description,
    openGraph: { type: "website", siteName: "H", title: page.title, description, url: page.path, images: ["/hc/opengraph-image.jpg"] },
    twitter: { card: "summary_large_image", title: page.title, description, images: ["/hc/opengraph-image.jpg"] },
  };
}

export default async function ReferencePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = load((await params).slug);
  const Tool = TOOLS[page.path];
  return (
    <>
      {Tool && <Tool key={`tool-${page.path}`} />}
      {page.wash && <HeroWash key={page.path} />}
      {page.tree.map(render)}
    </>
  );
}
