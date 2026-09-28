import type { LucideIcon } from "lucide-react";

export function AdminStatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number;
  hint?: string;
  icon?: LucideIcon;
}) {
  return (
    <article className="rounded-2xl border border-[#eadfcd] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(28,25,22,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="grid size-9 place-items-center rounded-xl bg-[#f7f1e8] text-[#c4a574]">
            <Icon className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p className="mt-4 font-serif text-4xl tabular-nums text-[#1c1916]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </article>
  );
}
