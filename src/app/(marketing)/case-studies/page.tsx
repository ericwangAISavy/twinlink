import type { Metadata } from "next";
import { getPublishedResources } from "@/server/queries/editorial";
import { withResourceImage } from "@/lib/resource-images";
import {
  ResourceHero,
  ResourceLinks,
  ResourceCta,
} from "@/components/resources/resource-shell";
import { ResourceList } from "@/components/resources/resource-list";
export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore eight detailed engagement scenarios across autonomous systems, industrial AI, knowledge platforms, and business operations. Each case explains the design decisions and modeled outcomes.",
};
export default async function Page() {
  const resources = await getPublishedResources();
  return (
    <>
      <ResourceHero
        eyebrow={"Case Studies"}
        title={"Ideas put into practice."}
        description={
          "Explore eight detailed engagement scenarios across autonomous systems, industrial AI, knowledge platforms, and business operations. Each case explains the design decisions and modeled outcomes."
        }
        image={"/images/case-study-skyline.jpg"}
      />
      <ResourceLinks />
      <ResourceList
        items={resources
          .filter((r) => r.kind === "case-studies")
          .map(withResourceImage)}
      />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
