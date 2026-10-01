import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types";

type ChipVariant = "dark" | "muted" | "subtle";

const CHIP_VARIANTS: Record<ChipVariant, string> = {
  dark: "bg-ink text-white",
  muted: "bg-fill-chip text-text-strong",
  subtle: "bg-fill-tag text-text-strong",
};

interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  size?: "sm" | "md";
  /** Coloured dot before the label. */
  dot?: "accent" | "accent-soft";
  className?: string;
}

/** Rounded label for topics and story types. */
export function Chip({ children, variant = "muted", size = "sm", dot, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full text-xs font-semibold",
        size === "md" ? "px-[0.6875rem] py-1.5" : "px-2.5 py-[0.3125rem]",
        CHIP_VARIANTS[variant],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dot === "accent" ? "bg-accent" : "bg-accent-soft")} />}
      {children}
    </span>
  );
}

/** Outlined keyword link, e.g. a story's tags. */
export function TagLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-line-strong px-[0.6875rem] py-[0.3125rem] text-xs text-text-subtle"
    >
      {children}
    </Link>
  );
}

const BADGE_TONES: Record<Extract<Tone, "positive" | "neutral">, string> = {
  positive: "bg-positive-tint text-positive",
  neutral: "bg-fill text-text-strong",
};

/** Bold pill for a figure's change, e.g. "▲ 3% YoY". */
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "positive" | "neutral" }) {
  return (
    <span className={cn("rounded-full px-[0.5625rem] py-1 text-[0.8125rem] font-bold", BADGE_TONES[tone])}>
      {children}
    </span>
  );
}
