import Image from "next/image";

/** Official Twinlink logo. Use `onDark` on navy or other dark backgrounds. */
export function BrandLogo({ height = 34, className, priority = false, onDark = false }: {
  height?: number;
  className?: string;
  priority?: boolean;
  onDark?: boolean;
}) {
  const width = Math.round((960 / 225) * height);
  return (
    <Image src={onDark ? "/images/brand/twinlink-light.png" : "/images/brand/twinlink.png"} alt="Twinlink" width={width} height={height}
      priority={priority} className={className} style={{ width, height, maxWidth: "none" }} />
  );
}
