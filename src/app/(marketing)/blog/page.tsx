import type { Metadata } from "next";
import { resources } from "@/lib/resources";
import {
  ResourceHero,
  ResourceLinks,
  ResourceCta,
} from "@/components/resources/resource-shell";
import { ResourceList } from "@/components/resources/resource-list";
export const metadata: Metadata = {
  title: "The Twinlink Journal",
  description:
    "Practical perspectives on building reliable products, working across borders, and turning emerging technology into lasting value.",
};
export default function Page() {
  return (
    <>
      <ResourceHero
        eyebrow={"The Twinlink Journal"}
        title={"Good thinking. Better engineering."}
        description={
          "Practical perspectives on building reliable products, working across borders, and turning emerging technology into lasting value."
        }
        image={"/images/how-we-help-architecture.jpg"}
      />
      <ResourceLinks />
      <ResourceList items={resources.filter((r) => r.kind === "blog")} />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
