import Link from "next/link";
import { EmptyState } from "@/components/dashboard/candidate/empty-state";
import { SectionHeader } from "@/components/dashboard/candidate/section-header";
import { Button } from "@/components/ui/button";

export type MessagePreview = {
  id: string;
  title: string;
  body: string;
  href: string;
};

export function MessagesCard({ items }: { items: MessagePreview[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-5 shadow-[0_8px_30px_rgba(28,25,22,0.04)]">
      <SectionHeader
        title="Messages"
        action={
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/dashboard/candidate/messages">Inbox</Link>
          </Button>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          className="border-0 bg-transparent px-0 py-4"
          title="No unread messages"
          description="Application conversations with Twinlink will show here."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="block rounded-xl border border-[#eadfcd] px-3 py-2 hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
