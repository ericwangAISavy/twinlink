import Image from "next/image";

/**
 * Official Twinlink logo: gold emblem twin stripes with the metallic serif "Twinlink"
 * wordmark (from "Twinlink Gold Emblem Logo.png", cropped with its original transparency).
 * The same mark is used on light and navy backgrounds.
 */
const LOGO = { src: "/images/brand/twinlink-logo.png", width: 1329, height: 200 } as const;

export function BrandLogo({ height = 34, className, priority = false }: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <Image src={LOGO.src} alt="Twinlink" width={width} height={height} priority={priority}
      className={className} style={{ width, height, maxWidth: "none" }} />
  );
}
