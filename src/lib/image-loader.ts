"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Resizes images on their own CDN instead of the Next.js optimizer.
 * Unsplash (imgix) takes width/quality/format as query params; local files are served as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
