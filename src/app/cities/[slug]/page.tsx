import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes } from "@/config/navigation";
import { formatChange, formatIndianNumber, formatINR } from "@/lib/utils";
import { getCities, getCityBySlug, getCityMarketNotes, getCityProfile, getProjectsByCity } from "@/lib/services";
import type { CityScore, MarketStat } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StatGrid } from "@/components/market";
import { ProjectGrid } from "@/components/projects";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";

export async function generateStaticParams() {
  return (await getCities()).map((city) => ({ slug: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/cities/[slug]">): Promise<Metadata> {
  const city = await getCityBySlug((await params).slug);
  if (!city) return {};
  return { title: `${city.name} property market`, description: `Prices, sales and new projects in ${city.name}.` };
}

function scoreStat(id: string, label: string, score: CityScore): MarketStat {
  return {
    id,
    label,
    value: `#${score.rank}`,
    badge: { label: `${score.score} / 100`, tone: "neutral" },
    description: score.hotspots,
  };
}

export default async function CityPage({ params }: PageProps<"/cities/[slug]">) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const [{ market, invest, live }, projects, cityMarketNotes] = await Promise.all([
    getCityProfile(slug),
    getProjectsByCity(slug),
    getCityMarketNotes(),
  ]);

  const stats: MarketStat[] = [];
  if (market) {
    stats.push(
      {
        id: "sales",
        label: cityMarketNotes.sales.label,
        value: formatIndianNumber(market.sales.value),
        badge: {
          label: `${formatChange(market.sales.yoyPct)} YoY`,
          tone: market.sales.yoyPct >= 0 ? "positive" : "neutral",
        },
        description: cityMarketNotes.sales.note,
      },
      {
        id: "price",
        label: cityMarketNotes.price.label,
        value: formatINR(market.pricePerSqft.value),
        badge: {
          label: `${formatChange(market.pricePerSqft.yoyPct)} YoY`,
          tone: market.pricePerSqft.yoyPct >= 0 ? "positive" : "neutral",
        },
        description: cityMarketNotes.price.note,
      },
    );
  }
  if (invest) stats.push(scoreStat("invest", "Best to invest", invest));
  if (live) stats.push(scoreStat("live", "Best to live", live));

  return (
    <>
      <PageHeader
        back={{ label: "All cities", href: routes.cities }}
        eyebrow={city.state}
        title={city.name}
        description={`Sales, prices, scorecard rankings and the new projects we track in ${city.name}.`}
      />

      {stats.length > 0 && (
        <Container as="section" aria-label={`${city.name} at a glance`} className="pb-16">
          <div className="overflow-hidden rounded-panel border border-line bg-surface">
            <StatGrid stats={stats} label={`${city.name} figures`} />
          </div>
        </Container>
      )}

      <Container as="section" id="projects" aria-labelledby="city-projects-h" className="scroll-mt-24 pb-[5.5rem]">
        <SectionHeading
          id="city-projects-h"
          title={`New projects in ${city.name}`}
          action={{ label: "All projects", href: routes.projects }}
          className="mb-7"
        />
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} guideLink="guides" label={`New projects in ${city.name}`} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-panel border border-dashed border-line-strong px-6 py-10 text-center">
            <p className="m-0 text-[0.9375rem] text-text-muted">
              We aren&apos;t tracking any projects in {city.name} yet.
            </p>
            <ButtonLink href={routes.projects} variant="outline" icon="arrow-right">
              Browse all projects
            </ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}
