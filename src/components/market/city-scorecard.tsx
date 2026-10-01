"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/navigation";
import type { CityLens, CityScore } from "@/types";
import { Carousel, Container, Icon, SectionIntro, SegmentedControl, type ChoiceOption } from "@/components/ui";

const LENS_OPTIONS: ChoiceOption<CityLens>[] = [
  { value: "invest", label: "Best to invest" },
  { value: "live", label: "Best to live" },
];

interface CityScorecardProps {
  scores: Record<CityLens, CityScore[]>;
  initialLens?: CityLens;
  notice?: string | null;
  id?: string;
}

/** "Where to invest / where to live" ranking with a lens toggle. */
export function CityScorecard({ scores, initialLens = "invest", notice, id }: CityScorecardProps) {
  const [lens, setLens] = useState<CityLens>(initialLens);

  return (
    <section id={id} aria-labelledby="where-h" className="scroll-mt-16 border-y border-line bg-surface">
      <Container className="py-[clamp(3.5rem,7vw,5.5rem)]">
        <SectionIntro
          eyebrow="City scorecard 2026"
          title="Where to invest. Where to live. Rarely the same city."
          titleId="where-h"
          description="Investors rank cities on price growth and rental yield. Families rank them on commute, schools and clean air. Switch the lens to see how the ranking changes."
        >
          <SegmentedControl label="Ranking lens" options={LENS_OPTIONS} value={lens} onChange={setLens} />
        </SectionIntro>
        <div className="overflow-hidden border-b border-t-2 border-b-line border-t-ink">
          <Carousel
            key={lens}
            label="City scores"
            bleed={false}
            itemWidth="max-sm:w-[80%]"
            mobileGap="max-sm:gap-0"
            className="-mb-px -mr-px grid grid-cols-[repeat(auto-fit,minmax(min(16.25rem,100%),1fr))]"
          >
            {scores[lens].map((city) => (
              <CityScoreCard key={city.citySlug} city={city} />
            ))}
          </Carousel>
        </div>
        {notice && <p className="mb-0 mt-[1.125rem] text-xs text-text-muted">{notice}</p>}
      </Container>
    </section>
  );
}

function CityScoreCard({ city }: { city: CityScore }) {
  return (
    <div className="flex flex-col gap-3.5 border-b border-r border-line bg-surface px-6 pb-6 pt-[1.625rem]">
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-5xl font-semibold leading-none text-rank">
          {String(city.rank).padStart(2, "0")}
        </span>
        <span className="text-[0.8125rem] text-text-muted">
          <strong className="text-[1.375rem] font-bold text-ink">{city.score}</strong> / 100
        </span>
      </div>
      <Link href={routes.city(city.citySlug)} className="uline block">
        <span className="t font-serif text-[1.75rem] font-semibold tracking-[-0.015em]">{city.cityName}</span>
      </Link>
      <span className="min-h-[2.625rem] text-sm leading-normal text-text-soft">{city.hotspots}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-fill">
        <div className="h-1.5 rounded-full bg-accent" style={{ width: `${city.score}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {city.metrics.map((metric) => (
          <span key={metric.label} className="flex flex-col gap-[0.1875rem]">
            <span className="text-xs text-text-muted">{metric.label}</span>
            <strong className="text-base font-semibold">{metric.value}</strong>
          </span>
        ))}
      </div>
      <Link
        href={`${routes.city(city.citySlug)}#projects`}
        className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-accent-strong"
      >
        Projects in {city.cityName}
        <Icon name="arrow-right" size={14} strokeWidth={2.4} />
      </Link>
    </div>
  );
}
