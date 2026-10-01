import type { ImageCredit } from "@/types";
import { cn } from "@/lib/utils";

/** "Photo: Name / Unsplash" attribution line under a photo. */
export function PhotoCredit({ credit, className }: { credit?: ImageCredit; className?: string }) {
  if (!credit) return null;
  return (
    <p className={cn("m-0 text-xs text-text-muted", className)}>
      Photo:{" "}
      <a href={credit.url} target="_blank" rel="noopener noreferrer" className="text-text-soft underline">
        {credit.name}
      </a>{" "}
      / Unsplash
    </p>
  );
}
