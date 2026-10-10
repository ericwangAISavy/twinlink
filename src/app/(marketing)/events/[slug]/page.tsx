import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedResources } from "@/server/queries/editorial";
import { ResourceDetail } from "@/components/resources/resource-detail";
import { getCompanyProfile } from "@/server/queries/company";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resources = await getPublishedResources();
  const item = resources.find((r) => r.kind === "events" && r.slug === slug);
  return { title: item?.title ?? "Not found", description: item?.summary };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const resources = await getPublishedResources();
  const item = resources.find((r) => r.kind === "events" && r.slug === slug);
  if (!item) notFound();
  const company = await getCompanyProfile();
  return (
    <ResourceDetail item={item} email={company.email || "hello@twinlink.com"} />
  );
}
