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
      className={cn(dark ? "bg-navy text-primary-foreground" : "bg-background", "px-4 py-20", className)}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow ? (
          <p className={cn("text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-teal-200" : "text-accent")}>
            {eyebrow}
          </p>
        ) : null}
        {title ? <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-4xl">{title}</h2> : null}
        <div className={cn(title || eyebrow ? "mt-8" : undefined)}>{children}</div>
      </div>
    </section>
  );
}
