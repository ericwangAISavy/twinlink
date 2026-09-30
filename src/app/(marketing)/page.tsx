import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Cloud, Cpu, Network } from "lucide-react";
import { HeroSlider } from "@/components/marketing/hero-slider";
import { Reveal } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
  { icon: Box, title: "Product Engineering", body: "End-to-end development from idea to scale." },
  { icon: Cloud, title: "Cloud & Infrastructure", body: "Scalable, secure, and future-ready systems." },
  { icon: Cpu, title: "AI & Automation", body: "Intelligent solutions for a smarter tomorrow." },
  { icon: Network, title: "Engineering Network", body: "Access top global talent on demand." },
] as const;

const STATS = [
  { value: "50+", label: "Engineering Specialists" },
  { value: "30+", label: "Projects Delivered" },
  { value: "15+", label: "Partner Companies" },
  { value: "5+", label: "Years of Experience" },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroSlider>
        <div className="max-w-xl">
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#e8d5a3]">
              Technology consulting
            </Reveal>
            <Reveal
              as="h1"
              className="reveal-title mt-5 font-serif text-[2.6rem] leading-[1.12] tracking-[-0.02em] text-pretty md:text-[3.55rem] md:leading-[1.08]"
              delay={60}
            >
              Engineering possibilities for a brighter tomorrow.
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg" delay={140}>
              Twinlink connects companies with world-class engineering teams and technology specialists to turn
              ambitious ideas into scalable, real-world products.
            </Reveal>
            <Reveal className="reveal-copy mt-8 flex flex-wrap gap-3" delay={220}>
              <Button asChild size="lg" variant="teal" className="rounded-full">
                <Link href="/#solutions">
                  Our solutions <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/35 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/careers">Explore careers</Link>
              </Button>
            </Reveal>
        </div>
      </HeroSlider>

      <section id="solutions" className="border-y border-white/10 bg-[#12110f]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((item, index) => (
            <Reveal key={item.title} className="reveal-copy flex gap-3" delay={index * 70}>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#c4a574]/40 text-[#c4a574]">
                <item.icon className="size-4" />
              </span>
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-snug text-white/50">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-we-help" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-16">
          <div className="max-w-md">
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.22em] text-[#c4a574]">
              How we help
            </Reveal>
            <Reveal as="h2" className="reveal-title reveal-rule mt-3 font-serif text-4xl leading-[1.15] md:text-[2.75rem]" delay={50}>
              From complex challenges to real impact.
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 leading-relaxed text-white/65" delay={120}>
              We bring together the right people, technology, and experience to help organizations solve their
              most critical problems and build what&apos;s next.
            </Reveal>
            <Reveal className="reveal-copy mt-6" delay={180}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-[#e8d5a3] hover:underline"
              >
                Learn more about our approach <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="relative min-w-0 overflow-hidden rounded-[10px]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/how-we-help-globe.jpg"
                alt="Global network of people, technology, innovation, and impact"
                fill
                quality={95}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="people" className="px-4 pb-6 md:pb-10">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[10px] lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <Image
              src="/images/our-people-handshake.jpg"
              alt="Twinlink consultants meeting outside a modern office"
              fill
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#14120e] px-8 py-12 md:px-14">
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.22em] text-[#c4a574]">
              Our people
            </Reveal>
            <Reveal as="h2" className="reveal-title reveal-rule mt-3 font-serif text-4xl leading-tight md:text-[2.7rem]" delay={90}>
              Great technology comes from great people.
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 leading-relaxed text-white/70" delay={180}>
              Twinlink brings together developers, architects, and technology specialists who are passionate
              about solving real-world problems and creating lasting impact.
            </Reveal>
            <Reveal className="reveal-copy mt-6" delay={260}>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-sm text-[#e8d5a3] hover:underline"
              >
                Meet our team <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} className="reveal-copy text-center" delay={index * 80}>
              <p className="font-serif text-5xl text-[#e8d5a3] md:text-6xl">{stat.value}</p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="insights" className="px-4 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.22em] text-[#c4a574]">
              Case study
            </Reveal>
            <Reveal as="h2" className="reveal-title reveal-rule mt-3 font-serif text-4xl leading-tight md:text-[2.7rem]" delay={80}>
              Building a global platform for a connected future.
            </Reveal>
            <Reveal as="p" className="reveal-copy mt-5 max-w-md leading-relaxed text-white/65" delay={160}>
              See how we partnered with a leading enterprise to design and build a secure, scalable platform
              that connects millions of users across markets.
            </Reveal>
            <Reveal className="reveal-copy mt-8" delay={220}>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#c4a574]/40 bg-transparent text-[#e8d5a3] hover:bg-[#c4a574]/10"
              >
                <Link href="/about">
                  Read case study <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-[12px] lg:min-h-[300px]">
            <Image
              src="/images/case-study-waterfront.jpg"
              alt="City skyline at dusk along the waterfront"
              fill
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8d5a3]">
                Enterprise solution
              </p>
              <h3 className="mt-2 font-serif text-2xl">Global Enterprise Platform</h3>
              <p className="mt-2 text-sm text-white/70">
                Scalable Infrastructure · AI-powered Insights · Global Deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/twinlink-lobby.jpg"
            alt="Twinlink lobby with the team walking through the headquarters"
            fill
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_45%]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-28 text-center md:py-32">
          <Reveal as="p" className="reveal-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#e8d5a3]">
            Careers
          </Reveal>
          <Reveal as="h2" className="reveal-title mt-4 font-serif text-4xl md:text-5xl" delay={80}>
            Join the Twinlink Network
          </Reveal>
          <Reveal as="p" className="reveal-copy mt-4 text-white/80" delay={150}>
            Work on meaningful projects with forward-thinking companies.
            <br />
            Grow your skills. Build the future together.
          </Reveal>
          <Reveal className="reveal-copy mt-8" delay={220}>
            <Button asChild size="lg" variant="teal" className="rounded-full">
              <Link href="/careers">
                Explore opportunities <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
