import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Resource } from "@/lib/resources";

// The original chat attachments are resolved when their files become available.
// Until then, use retained local photography rather than broken image URLs.
export function withResourceImage(item: Resource): Resource {
  const present =
    item.image.startsWith("https://") ||
    existsSync(join(process.cwd(), "public", item.image.replace(/^\/+/, "")));
  return present || !item.fallbackImage
    ? item
    : {
        ...item,
        image: item.fallbackImage,
        imageAlt: "Twinlink engineering and technology editorial illustration",
      };
}
export function resolveEditorialImage(image: {
  image: string;
  fallbackImage: string;
  imageAlt: string;
}) {
  const present =
    image.image.startsWith("https://") ||
    existsSync(join(process.cwd(), "public", image.image.replace(/^\/+/, "")));
  return {
    image: present ? image.image : image.fallbackImage,
    imageAlt: present
      ? image.imageAlt
      : "Twinlink engineering and technology editorial illustration",
  };
}
