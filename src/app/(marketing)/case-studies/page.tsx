import type { Metadata } from "next";
import { resources } from "@/lib/resources";
import {
  ResourceHero,
  ResourceLinks,
  ResourceCta,
} from "@/components/resources/resource-shell";
import { ResourceList } from "@/components/resources/resource-list";
export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore our approach to platform, data, and delivery challenges through illustrative engagement blueprints.",
};
export default function Page() {
  return (
    <>
      <ResourceHero
        eyebrow={"Case Studies"}
        title={"Ideas put into practice."}
        description={
          "Explore our approach to platform, data, and delivery challenges through illustrative engagement blueprints."
        }
        image={"/images/case-study-skyline.jpg"}
      />
      <ResourceLinks />
      <ResourceList
        items={resources.filter((r) => r.kind === "case-studies")}
      />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
