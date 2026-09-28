import { cn } from "@/lib/utils";

export function AdminEmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-dashed border-[#eadfcd] bg-white px-6 py-10", className)}>
      <p className="font-medium text-[#1c1916]">{title}</p>
      <p className="mt-1 max-w-lg text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
