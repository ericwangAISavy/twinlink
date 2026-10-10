import type { Metadata } from "next";
import { resources } from "@/lib/resources";
import {
  ResourceHero,
  ResourceLinks,
  ResourceCta,
} from "@/components/resources/resource-shell";
import { ResourceList } from "@/components/resources/resource-list";
export const metadata: Metadata = {
  title: "Conversations & Community",
  description:
    "Explore our proposed program of engineering conversations and workshops. Dates are tentative; express interest to help shape what comes next.",
};
export default function Page() {
  return (
    <>
      <ResourceHero
        eyebrow={"Conversations & Community"}
        title={"Great ideas start in conversation."}
        description={
          "Explore our proposed program of engineering conversations and workshops. Dates are tentative; express interest to help shape what comes next."
        }
        image={"/images/about-culture-office.jpg"}
      />
      <ResourceLinks />
      <ResourceList items={resources.filter((r) => r.kind === "events")} />
      <div className="px-4">
        <ResourceCta />
      </div>
    </>
  );
}
