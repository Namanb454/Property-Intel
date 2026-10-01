import type { Metadata } from "next";
import {
  getCityMarket,
  getCityMarketNotes,
  getMarketPulse,
  getMarketUpdates,
  getQuarterFacts,
  getStories,
} from "@/lib/services";
import { StoryListWithRail } from "@/components/articles";
import { PageHeader } from "@/components/layout/page-header";
import { CityExplorer, MarketPulse } from "@/components/market";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Market trends",
  description: "Quarterly sales, launches and prices across India's top seven housing markets.",
};

export default async function MarketTrendsPage() {
  const [pulse, rows, facts, notes, updates, stories] = await Promise.all([
    getMarketPulse(),
    getCityMarket(),
    getQuarterFacts(),
    getCityMarketNotes(),
    getMarketUpdates(),
    getStories({ topic: "Trends" }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={`Research · ${pulse.period}`}
        title="Market trends"
        description="Sales, new supply, prices and rates across India's top seven housing markets — updated every quarter."
      />
      <MarketPulse pulse={pulse} />
      <CityExplorer rows={rows} facts={facts} notes={notes} />
      <Container className="pt-8">
        <SectionHeading title="Trend analysis" className="mb-7" />
      </Container>
      <StoryListWithRail articles={stories} railArticles={updates} />
    </>
  );
}
