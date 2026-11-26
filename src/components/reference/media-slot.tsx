/** Stands where a product demo video or image will go. */
export function MediaSlot({ className = "", label = "" }: { className?: string; label?: string }) {
  // Only give the slot its own size when the layout has not already sized it.
  const size = /(^| )(absolute|aspect-)/.test(className) ? "" : "aspect-video w-full";
  return (
    <div className={`${className} ${size} flex flex-col items-center justify-center gap-1 bg-grey-900 px-4 text-center text-white`}>
      <span className="text-[24px] font-medium tracking-tight">Orin</span>
      <span className="text-[12px] text-white/60">{label ? `${label} (coming soon)` : "Demo video coming soon"}</span>
    </div>
  );
}
