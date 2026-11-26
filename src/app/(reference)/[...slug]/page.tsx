import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroWash } from "@/components/reference/hero-wash";
import { render, type ContentNode } from "@/components/reference/render";

type Page = { path: string; title: string; description: string; wash: boolean; tree: ContentNode[] };

const DIRECTORY = join(process.cwd(), "src/content/reference");
const names = () => readdirSync(DIRECTORY).map((file) => file.replace(/\.json$/, ""));

function load(slug: string[]): Page {
  const name = slug.map(decodeURIComponent).join("__");
  if (!names().includes(name)) notFound();
  return JSON.parse(readFileSync(join(DIRECTORY, `${name}.json`), "utf8")) as Page;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return names().map((name) => ({ slug: name.split("__") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const page = load((await params).slug);
  return { title: { absolute: page.title }, description: page.description || undefined };
}

export default async function ReferencePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = load((await params).slug);
  return (
    <>
      {page.wash && <HeroWash key={page.path} />}
      {page.tree.map(render)}
    </>
  );
}
