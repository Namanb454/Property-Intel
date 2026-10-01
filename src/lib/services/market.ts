import { cities, cityMarket, cityMarketNotes, cityScores, marketPulse, quarterFacts, ticker } from "@/data/market";
import type { City, CityLens, CityMarketRow, CityScore, MarketFact, MarketPulse, Ticker } from "@/types";

export async function getTicker(): Promise<Ticker> {
  return ticker;
}

export async function getMarketPulse(): Promise<MarketPulse> {
  return marketPulse;
}

export async function getCityScores(): Promise<Record<CityLens, CityScore[]>> {
  return cityScores;
}

export async function getCityMarket(): Promise<CityMarketRow[]> {
  return cityMarket;
}

export async function getCityMarketNotes() {
  return cityMarketNotes;
}

export async function getQuarterFacts(): Promise<MarketFact[]> {
  return quarterFacts;
}

export async function getCities(): Promise<City[]> {
  return cities;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  return cities.find((c) => c.slug === slug);
}

/** Everything known about one city, for its guide page. */
export async function getCityProfile(slug: string) {
  return {
    market: cityMarket.find((r) => r.citySlug === slug),
    invest: cityScores.invest.find((s) => s.citySlug === slug),
    live: cityScores.live.find((s) => s.citySlug === slug),
  };
}
