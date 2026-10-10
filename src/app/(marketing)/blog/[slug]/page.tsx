import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resources } from "@/lib/resources";
import { ResourceDetail } from "@/components/resources/resource-detail";
import { getCompanyProfile } from "@/server/queries/company";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resources.find((r) => r.kind === "blog" && r.slug === slug);
  return { title: item?.title ?? "Not found", description: item?.summary };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = resources.find((r) => r.kind === "blog" && r.slug === slug);
  if (!item) notFound();
  const company = await getCompanyProfile();
  return (
    <ResourceDetail item={item} email={company.email || "hello@twinlink.com"} />
  );
}
