import { Fade } from "./fade";

export function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white py-12 sm:py-20">
      <div className={`mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 ${className}`}>{children}</div>
    </section>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Fade delay={0.05}><h2 className="t36 max-w-xl tracking-tight">{children}</h2></Fade>;
}

/** Title on the left, supporting paragraph bottom-aligned on the right from lg up. */
export function SplitHeading({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
      <SectionTitle>{title}</SectionTitle>
      <Fade delay={0.08}><p className="t16 text-grey-600">{children}</p></Fade>
    </div>
  );
}
