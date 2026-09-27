import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProfileCompletionItem } from "@/lib/candidate-profile";
import { cn } from "@/lib/utils";

export function ProfileCompletionCard({
  percent,
  items,
}: {
  percent: number;
  items: ProfileCompletionItem[];
}) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-lg text-[#1c1916]">Profile completion</h2>
          <p className="mt-1 text-sm text-muted-foreground">Complete these items before you apply.</p>
        </div>
        <p className="font-serif text-2xl tabular-nums text-[#c4a574]">{percent}%</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f4efe6]" aria-hidden>
        <div className="h-full rounded-full bg-[#c4a574]" style={{ width: `${percent}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-1 py-1 text-sm hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.done ? (
                <Check className="size-4 text-[#c4a574]" aria-hidden />
              ) : (
                <Circle className="size-4 text-[#d4c4a8]" aria-hidden />
              )}
              <span className={cn(item.done && "text-muted-foreground line-through")}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Button asChild variant="teal" className="mt-5 w-full rounded-full">
        <Link href="/dashboard/candidate/profile">Edit profile</Link>
      </Button>
    </section>
  );
}
