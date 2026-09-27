export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-serif text-lg text-[#1c1916]">{title}</h2>
      {action}
    </div>
  );
}
