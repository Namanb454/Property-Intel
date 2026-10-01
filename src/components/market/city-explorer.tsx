"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { routes } from "@/config/navigation";
import { cn, formatChange, formatIndianNumber, formatINR } from "@/lib/utils";
import type { CityMarketMetric, CityMarketRow, MarketFact } from "@/types";
import { Container, RailHeading, SectionHeading, SegmentedControl, type ChoiceOption } from "@/components/ui";

const METRIC_OPTIONS: ChoiceOption<CityMarketMetric>[] = [
  { value: "sales", label: "Homes sold" },
  { value: "price", label: "Price / sq ft" },
];

interface CityExplorerProps {
  rows: CityMarketRow[];
  facts: MarketFact[];
  notes: Record<CityMarketMetric, { label: string; note: string }>;
  id?: string;
}

const ROW_GRID = "grid grid-cols-[1.2fr_2fr_0.8fr] gap-4";

/** Seven-city comparison: a metric toggle and quarter facts beside a bar table. */
export function CityExplorer({ rows, facts, notes, id }: CityExplorerProps) {
  const [metric, setMetric] = useState<CityMarketMetric>("sales");

  const table = useMemo(() => {
    const pick = (row: CityMarketRow) => (metric === "sales" ? row.sales : row.pricePerSqft);
    const sorted = [...rows].sort((a, b) => pick(b).value - pick(a).value);
    const max = Math.max(1, ...sorted.map((r) => pick(r).value));
    return sorted.map((row) => {
      const { value, yoyPct } = pick(row);
      return {
        ...row,
        display: metric === "sales" ? formatIndianNumber(value) : formatINR(value),
        pct: Math.max(4, Math.round((value / max) * 100)),
        yoyPct,
      };
    });
  }, [rows, metric]);

  return (
    <Container
      as="section"
      id={id}
      aria-labelledby="cities-h"
      className="scroll-mt-16 pb-14 pt-[clamp(3.5rem,7vw,5.5rem)]"
    >
      <SectionHeading
        title="City explorer"
        action={{ label: "Compare cities", href: routes.cities }}
        className="mb-8"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(21.25rem,100%),1fr))] items-start gap-12">
        <div className="flex flex-col gap-[1.125rem]">
          <h3
            id="cities-h"
            className="m-0 font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.025em]"
          >
            How India&apos;s seven biggest housing markets are moving
          </h3>
          <p className="m-0 text-base leading-[1.6] text-text">
            Compare home sales and average prices city by city. Open any city for locality-level prices, rental yields
            and new launches.
          </p>
          <SegmentedControl track="muted" label="Metric" options={METRIC_OPTIONS} value={metric} onChange={setMetric} />
          <div className="flex flex-wrap gap-[1.125rem] text-[0.8125rem] text-text">
            <span>
              <strong className="text-positive">▲</strong> Up vs last year
            </span>
            <span>
              <strong className="text-accent-strong">▼</strong> Down vs last year
            </span>
          </div>
          <div className="mt-1.5 rounded-card border border-line bg-surface px-[1.375rem] py-1">
            <RailHeading as="h4" className="pb-1 pt-4">
              Q3 2026 at a glance
            </RailHeading>
            {facts.map((fact, i) => (
              <div
                key={fact.value}
                className={cn(
                  "flex items-center gap-[1.125rem]",
                  i === facts.length - 1 ? "pb-[1.125rem] pt-3.5" : "border-b border-line-soft py-3.5",
                )}
              >
                <span
                  className={cn(
                    "min-w-24 shrink-0 font-serif text-[2.125rem] font-semibold leading-none tracking-[-0.02em]",
                    fact.tone === "positive" && "text-positive",
                    fact.tone === "negative" && "text-accent-strong",
                  )}
                >
                  {fact.value}
                </span>
                <span className="text-sm leading-normal text-text">{fact.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-panel border border-line bg-surface px-[1.625rem] pb-[1.125rem] pt-2.5">
          <div
            className={cn(
              ROW_GRID,
              "border-b border-ink pb-2.5 pt-3.5 text-[0.6875rem] font-bold uppercase tracking-[.1em] text-text-soft",
            )}
          >
            <span>City</span>
            <span>{notes[metric].label}</span>
            <span className="text-right">YoY</span>
          </div>
          {table.map((row) => (
            <Link
              key={row.citySlug}
              href={routes.city(row.citySlug)}
              className={cn(ROW_GRID, "items-center border-b border-fill py-[0.9375rem]")}
            >
              <span className="text-[0.9375rem] font-semibold">{row.cityName}</span>
              <span className="flex items-center gap-3">
                <span className="flex h-2 grow overflow-hidden rounded-full bg-fill">
                  <span className="h-2 rounded-full bg-bar" style={{ width: `${row.pct}%` }} />
                </span>
                <span className="min-w-16 text-right text-sm font-semibold tabular-nums">{row.display}</span>
              </span>
              <span
                className={cn(
                  "text-right text-sm font-bold tabular-nums",
                  row.yoyPct >= 0 ? "text-positive" : "text-accent-strong",
                )}
              >
                {formatChange(row.yoyPct)}
              </span>
            </Link>
          ))}
          <span className="block pt-3.5 text-xs text-text-muted">{notes[metric].note}</span>
        </div>
      </div>
    </Container>
  );
}
