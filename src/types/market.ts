import type { Tone, YoYValue } from "./common";

export interface City {
  slug: string;
  name: string;
  state: string;
}

export interface TickerItem {
  label: string;
  value: string;
  changePct: number;
}

export interface Ticker {
  title: string;
  items: TickerItem[];
}

export interface MarketStat {
  id: string;
  label: string;
  value: string;
  badge: { label: string; tone: Extract<Tone, "positive" | "neutral"> };
  description: string;
}

export interface MarketPulse {
  period: string;
  scope: string;
  report: { label: string; href: string };
  stats: MarketStat[];
  sources: string;
}

/** The lens the city scorecard ranks by. */
export type CityLens = "invest" | "live";

export interface CityMetric {
  label: string;
  value: string;
}

export interface CityScore {
  rank: number;
  citySlug: string;
  cityName: string;
  /** Composite score out of 100. */
  score: number;
  hotspots: string;
  metrics: [CityMetric, CityMetric];
}

export type CityMarketMetric = "sales" | "price";

export interface CityMarketRow {
  citySlug: string;
  cityName: string;
  /** Homes sold in the quarter. */
  sales: YoYValue;
  /** Average price per sq ft, in rupees. */
  pricePerSqft: YoYValue;
}

export interface MarketFact {
  value: string;
  text: string;
  tone?: Extract<Tone, "positive" | "negative">;
}
