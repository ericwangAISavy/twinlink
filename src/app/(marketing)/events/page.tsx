import type { Metadata } from "next";
import { resources } from "@/lib/resources";
import { withResourceImage } from "@/lib/resource-images";
import {
  ResourceHero,
  ResourceLinks,
  ResourceCta,
} from "@/components/resources/resource-shell";
import { ResourceList } from "@/components/resources/resource-list";
export const metadata: Metadata = {
  title: "Conversations & Community",
  description:
    "Practical program guides for industrial AI, secure agents, technical communication, and AI investment. Explore the material and express interest in a future session.",
};
export default function Page() {
  return (
    <>
      <ResourceHero
        eyebrow={"Conversations & Community"}
        title={"Learn together. Build with confidence."}
        description={
          "Practical program guides for industrial AI, secure agents, technical communication, and AI investment. Explore the material and express interest in a future session."
        }
        image={"/images/about-culture-office.jpg"}
      />
      <ResourceLinks />
      <ResourceList
        items={resources
          .filter((r) => r.kind === "events")
          .map(withResourceImage)}
      />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
