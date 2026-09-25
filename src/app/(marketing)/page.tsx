import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyProfile } from "@/server/queries/company";
import { getPublishedJobs } from "@/server/queries/jobs";

export default async function HomePage() {
  const [company, jobs] = await Promise.all([getCompanyProfile(), getPublishedJobs()]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.28),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">Technology consulting</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{company.tagline}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">{company.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="teal">
                <Link href="/careers">
                  View open roles <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href="/about">Our firm</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-widest text-teal-200">At a glance</p>
            <ul className="mt-4 space-y-4 text-sm text-white/80">
              <li>Senior-only delivery pods</li>
              <li>Architecture through production support</li>
              <li>Knowledge transfer as the default</li>
              <li>Built for operators, not spectators</li>
            </ul>
          </div>
        </div>
      </section>

      <Section eyebrow="Introduction" title={`Why teams choose ${company.name}`}>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{company.intro}</p>
      </Section>

      <div className="h-24 bg-[linear-gradient(135deg,#0b1f3a_0%,#0f766e_55%,#f6f3ee_55%)]" />

      <Section eyebrow="Mission" title="What we exist to do">
        <p className="max-w-3xl text-lg text-muted-foreground">{company.mission}</p>
      </Section>

      <Section eyebrow="Vision" title="Where we are going" dark>
        <p className="max-w-3xl text-lg text-white/75">{company.vision}</p>
      </Section>

      <Section eyebrow="Values" title="How we show up">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {company.values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{value.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="capabilities" eyebrow="Capabilities" title="Where we create leverage" className="bg-secondary/40">
        <div className="grid gap-4 md:grid-cols-2">
          {company.capabilities.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Developer partnership" title="We work inside your system, not around it" dark>
        <p className="max-w-3xl text-lg text-white/75">{company.partnership}</p>
      </Section>

      <Section eyebrow="Benefits of working with TwinLink" title="What engagement feels like">
        <div className="grid gap-4 md:grid-cols-2">
          {company.benefits.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-navy px-4 py-20 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">Careers</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Build with operators who care about craft.</h2>
            <p className="mt-3 max-w-xl text-white/70">
              {jobs.length > 0
                ? `${jobs.length} open role${jobs.length === 1 ? "" : "s"} right now.`
                : "We hire in cycles. Create a candidate profile so we can reach you."}
            </p>
          </div>
          <Button asChild size="lg" variant="teal">
            <Link href="/careers">Explore careers</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
