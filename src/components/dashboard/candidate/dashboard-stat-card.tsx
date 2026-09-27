import type { LucideIcon } from "lucide-react";

export function DashboardStatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid size-9 place-items-center rounded-full bg-[#f4efe6] text-[#c4a574]">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 font-serif text-3xl tabular-nums text-[#1c1916]">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}
