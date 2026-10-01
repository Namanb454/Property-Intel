export interface ImageCredit {
  name: string;
  url: string;
}

/** An image with the alt text and the colour shown behind it while it loads. */
export interface ImageAsset {
  src: string;
  alt: string;
  placeholderColor?: string;
  credit?: ImageCredit;
}

export interface LinkItem {
  label: string;
  href: string;
}

/** Semantic colour intent, mapped to theme tokens by the UI layer. */
export type Tone = "neutral" | "accent" | "positive" | "negative" | "warning";

/** A value that moved year on year, as a signed percentage. */
export interface YoYValue {
  value: number;
  yoyPct: number;
}

/** ISO-8601 date string, e.g. "2026-10-01". */
export type ISODate = string;
