import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** "page" is the 80rem (1280px at 16px) content width; "narrow" is for centred copy like the newsletter. */
  width?: "page" | "narrow";
}

/** Centres content at the site's content width with the responsive side gutter. */
export function Container({ as: Tag = "div", width = "page", className, ...props }: ContainerProps) {
  return <Tag className={cn(width === "page" ? "container-page" : "container-narrow", className)} {...props} />;
}
