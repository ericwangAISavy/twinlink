import { Capabilities } from "@/components/reference/capabilities";
import { ClosingCards } from "@/components/reference/closing-cards";
import { Hero } from "@/components/reference/hero";
import { News } from "@/components/reference/news";
import { Platform } from "@/components/reference/platform";
import { Research } from "@/components/reference/research";
import { Results } from "@/components/reference/results";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Platform />
      <Results />
      <Research />
      <News />
      <ClosingCards />
    </>
  );
}
