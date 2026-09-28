import { cn } from "@/lib/utils";

export function AdminTable({
  headers,
  children,
  className,
}: {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-[#eadfcd] bg-white", className)}>
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#eadfcd] bg-[#faf7f1] text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eadfcd]">{children}</tbody>
      </table>
    </div>
  );
}
