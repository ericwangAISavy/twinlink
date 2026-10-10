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
  title: "The Twinlink Journal",
  description:
    "Practical guides to industrial AI, secure agents, knowledge search, and the business decisions behind dependable technology. Written for people building and operating real systems.",
};
export default async function Page() {
  const resources = await getPublishedResources();
  return (
    <>
      <ResourceHero
        eyebrow={"The Twinlink Journal"}
        title={"Good thinking. Better engineering."}
        description={
          "Practical guides to industrial AI, secure agents, knowledge search, and the business decisions behind dependable technology. Written for people building and operating real systems."
        }
        image={"/images/how-we-help-architecture.jpg"}
      />
      <ResourceLinks />
      <ResourceList
        items={resources
          .filter((r) => r.kind === "blog")
          .map(withResourceImage)}
      />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
