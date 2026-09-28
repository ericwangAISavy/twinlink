export function AdminFilterBar({ children }: { children: React.ReactNode }) {
  return (
    <form className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-[#eadfcd] bg-white p-4" method="get">
      {children}
    </form>
  );
}
