import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { cn, formatChange, formatIndianNumber, formatINR } from "@/lib/utils";
import { getCities, getCityMarket, getCityMarketNotes, getQuarterFacts } from "@/lib/services";
import { PageHeader } from "@/components/layout/page-header";
import { CityExplorer } from "@/components/market";
import { Carousel, Container, Icon } from "@/components/ui";

export const metadata: Metadata = {
  title: "City guides",
  description: "Prices, sales and new projects for India's major housing markets, city by city.",
};

export default async function CitiesPage() {
  const [cities, market, facts, notes] = await Promise.all([
    getCities(),
    getCityMarket(),
    getQuarterFacts(),
    getCityMarketNotes(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="City guides"
        title="Every major market, city by city"
        description="Open a city for its sales trend, price per sq ft, scorecard ranking and the new projects we track there."
      />
      <Container as="section" aria-label="Cities">
        <Carousel
          as="ul"
          label="Cities"
          itemClassName="flex"
          itemWidth="max-sm:w-[80%]"
          className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(16.25rem,100%),1fr))] gap-3 p-0"
        >
          {cities.map((city) => {
            const row = market.find((r) => r.citySlug === city.slug);
            return (
              <Link
                key={city.slug}
                href={routes.city(city.slug)}
                className="lift uline flex w-full flex-col gap-3 rounded-card border border-line-card bg-surface p-6"
              >
                <span className="flex items-center justify-between">
                  <span className="t font-serif text-[1.625rem] font-semibold tracking-[-0.015em]">{city.name}</span>
                  <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                </span>
                <span className="text-[0.8125rem] text-text-muted">{city.state}</span>
                {row && (
                  <span className="grid grid-cols-2 gap-3 border-t border-line-soft pt-3">
                    <CityFigure
                      label="Homes sold, Q3"
                      value={formatIndianNumber(row.sales.value)}
                      change={row.sales.yoyPct}
                    />
                    <CityFigure
                      label="Price / sq ft"
                      value={formatINR(row.pricePerSqft.value)}
                      change={row.pricePerSqft.yoyPct}
                    />
                  </span>
                )}
              </Link>
            );
          })}
        </Carousel>
      </Container>
      <CityExplorer rows={market} facts={facts} notes={notes} />
    </>
  );
}

function CityFigure({ label, value, change }: { label: string; value: string; change: number }) {
  return (
    <span className="flex flex-col gap-[0.1875rem]">
      <span className="text-xs text-text-muted">{label}</span>
      <strong className="text-base font-semibold">{value}</strong>
      <span className={cn("text-xs font-bold", change >= 0 ? "text-positive" : "text-accent-strong")}>
        {formatChange(change)}
      </span>
    </span>
  );
}
