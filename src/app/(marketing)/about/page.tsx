import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hexagon, Leaf, Users, Zap } from "lucide-react";
import { AboutFaq } from "@/components/marketing/about-faq";
import { Reveal } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "TwinLink builds software with long-term value. Learn how the firm works, what it believes, and who thrives here.",
};

const VALUES = [
  {
    icon: Users,
    title: "User value first",
    body: "We build for real people and real needs.",
  },
  {
    icon: Zap,
    title: "Ownership",
    body: "We take responsibility and see things through.",
  },
  {
    icon: Hexagon,
    title: "Clear thinking",
    body: "We prefer simple, practical solutions over unnecessary complexity.",
  },
  {
    icon: Leaf,
    title: "Long-term mindset",
    body: "We make decisions that remain valuable over time.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="px-4 pt-8 md:pt-10">
        <div className="relative mx-auto min-h-[460px] max-w-6xl overflow-hidden rounded-[22px] md:min-h-[520px]">
          <Image
            src="/images/about-hero-skyline.jpg"
            alt="TwinLink team working at a desk against a sunset skyline"
            fill
            priority
            quality={95}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a] via-[#0c0b0a]/78 to-[#0c0b0a]/10" />
          <div className="relative z-10 flex min-h-[460px] max-w-xl flex-col justify-center px-7 py-12 md:min-h-[520px] md:px-12">
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
              The firm
            </Reveal>
            <Reveal as="h1" className="reveal-title mt-4 font-serif text-5xl text-white md:text-6xl" delay={70}>
              TwinLink
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 font-serif text-2xl leading-snug text-white md:text-[1.85rem]" delay={130}>
              Building software with long-term value.
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 max-w-md text-sm leading-relaxed text-white/70" delay={190}>
              TwinLink is a technology company focused on building products, systems, and digital experiences that
              solve meaningful problems. We care about strong engineering, clear thinking, and products that remain
              useful long after their first release.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
              Mission
            </Reveal>
            <Reveal as="h2" className="reveal-title mt-3 font-serif text-4xl text-white md:text-5xl" delay={70}>
              Why does TwinLink exist?
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 max-w-md text-sm leading-relaxed text-white/65" delay={140}>
              We believe good technology should reduce complexity rather than create more of it. Our mission is to
              turn difficult technical and business problems into products that feel simple, dependable, and useful
              to the people who rely on them.
            </Reveal>
          </div>
          <Reveal className="reveal-copy relative min-h-[280px] overflow-hidden rounded-[18px] md:min-h-[340px]" delay={80}>
            <Image
              src="/images/about-mission-summit.jpg"
              alt="A person standing on a mountain summit above the clouds at sunset"
              fill
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_58%]"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="reveal-copy relative min-h-[260px] overflow-hidden rounded-[18px] md:min-h-[320px] lg:order-1" delay={80}>
            <Image
              src="/images/about-vision-ai.jpg"
              alt="Hands typing on a laptop with an AI interface over the screen"
              fill
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </Reveal>
          <div className="lg:order-2">
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
              Vision
            </Reveal>
            <Reveal as="h2" className="reveal-title mt-3 font-serif text-4xl text-white md:text-5xl" delay={70}>
              The long view
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 max-w-md text-sm leading-relaxed text-white/65" delay={140}>
              TwinLink is being built for the long term. We prefer durable decisions over temporary shortcuts, strong
              foundations over unnecessary complexity, and meaningful progress over activity for its own sake. The
              goal is not to be slow or fast. The goal is to be deliberate.
            </Reveal>
          </div>
        </div>
      </section>

      <section id="values" className="px-4 py-6 md:py-10">
        <div className="mx-auto max-w-6xl">
          <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
            Our values
          </Reveal>
          <Reveal as="h2" className="reveal-title mt-3 font-serif text-4xl text-white md:text-5xl" delay={70}>
            What we believe in
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                className="reveal-copy rounded-2xl border border-white/10 bg-[#171512] p-6"
                delay={index * 70}
              >
                <span className="grid size-11 place-items-center rounded-xl border border-[#c4a574]/35 text-[#e8d5a3]">
                  <value.icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-5 font-medium text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="culture" className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
              Culture
            </Reveal>
            <Reveal as="h2" className="reveal-title mt-3 font-serif text-4xl text-white md:text-5xl" delay={70}>
              How we work
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 max-w-md text-sm leading-relaxed text-white/65" delay={140}>
              Small teams. Direct communication. Clear responsibility. We give people the freedom to think
              independently, take ownership, and make a real impact.
            </Reveal>
            <Reveal className="reveal-copy mt-7" delay={200}>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#c4a574]/70 bg-transparent text-[#e8d5a3] hover:bg-[#c4a574]/10"
              >
                <Link href="/careers">
                  Learn more about our culture <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal className="reveal-copy relative min-h-[280px] overflow-hidden rounded-[18px] md:min-h-[360px]" delay={80}>
            <Image
              src="/images/about-culture-office.jpg"
              alt="TwinLink teammates reviewing work together at a desk"
              fill
              quality={95}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[center_22%]"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a574]">
                Joining TwinLink
              </Reveal>
              <Reveal as="h2" className="reveal-title mt-3 font-serif text-4xl text-white md:text-5xl" delay={70}>
                Questions you might have
              </Reveal>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#c4a574]/70 bg-transparent text-[#e8d5a3] hover:bg-[#c4a574]/10"
            >
              <Link href="/careers">
                See open roles <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <AboutFaq />
          </div>
        </div>
      </section>
    </div>
  );
}
