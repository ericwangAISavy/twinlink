import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { searchAdmin } from "@/server/queries/admin";

export default async function AdminSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = await searchAdmin(query);
  const empty =
    results.jobs.length + results.candidates.length + results.applications.length + results.employees.length === 0;

  return (
    <>
      <AdminPageHeader title="Search" description={query ? `Results for “${query}”` : "Search candidates, jobs, applications, and employees."} />
      {!query ? (
        <AdminEmptyState title="Enter a search term." description="Use the top bar to search Twinlink records. Results come from live data only." />
      ) : empty ? (
        <AdminEmptyState title="No matching records." description="Nothing in jobs, candidates, applications, or employees matched that query." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <ResultList title="Jobs" items={results.jobs.map((item) => ({ href: `/admin/jobs/${item.id}`, label: item.title }))} />
          <ResultList
            title="Candidates"
            items={results.candidates.map((item) => ({
              href: `/admin/candidates/${item.id}`,
              label: item.name ?? item.email,
            }))}
          />
          <ResultList
            title="Applications"
            items={results.applications.map((item) => ({ href: `/admin/applications/${item.id}`, label: item.label }))}
          />
          <ResultList
            title="Employees"
            items={results.employees.map((item) => ({
              href: `/admin/employees/${item.id}`,
              label: item.name ?? item.email,
            }))}
          />
        </div>
      )}
    </>
  );
}

function ResultList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white p-6">
      <h2 className="font-serif text-xl">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No matches.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <Link className="hover:underline" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
