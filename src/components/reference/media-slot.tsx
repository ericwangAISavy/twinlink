/** Stands in for reference videos and images until real product media exists. */
export function MediaSlot({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} flex min-h-24 items-center justify-center bg-grey-200 text-[12px] font-medium text-grey-500`}>
      [Add product media]
    </div>
  );
}
