import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  dark = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        dark ? "border-y border-[#c4a574]/20 bg-navy text-primary-foreground" : "bg-background",
        "px-4 py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow ? (
          <Reveal
            as="p"
            className={cn(
              "reveal-copy text-xs font-semibold uppercase tracking-[0.2em]",
              dark ? "text-teal-200" : "text-accent",
            )}
          >
            {eyebrow}
          </Reveal>
        ) : null}
        {title ? (
          <Reveal
            as="h2"
            className="reveal-title reveal-rule mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-4xl"
            delay={70}
          >
            {title}
          </Reveal>
        ) : null}
        <div className={cn(title || eyebrow ? "mt-8" : undefined)}>{children}</div>
      </div>
    </section>
  );
}
