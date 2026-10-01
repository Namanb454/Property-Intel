import Link from "next/link";
import type { MarketPulse as MarketPulseData, MarketStat } from "@/types";
import { Badge, Container, Icon } from "@/components/ui";
import { StatGrid } from "./stat-grid";

/** Headline quarterly numbers in a bordered grid of stat tiles. */
export function MarketPulse({ pulse, id }: { pulse: MarketPulseData; id?: string }) {
  return (
    <Container as="section" id={id} aria-labelledby="pulse-h" className="scroll-mt-24 pb-20">
      <div className="overflow-hidden rounded-panel border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-[1.625rem] py-[1.125rem]">
          <h2 id="pulse-h" className="m-0 flex items-center gap-2.5 text-[0.9375rem] font-bold">
            <span className="size-2 rounded-full bg-accent shadow-[0_0_0_0.25rem_var(--color-accent-tint)]" />
            Market pulse
            <span className="font-medium text-text-muted">
              · {pulse.period}, {pulse.scope}
            </span>
          </h2>
          <Link href={pulse.report.href} className="flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
            {pulse.report.label}
            <Icon name="arrow-right" size={14} strokeWidth={2.4} />
          </Link>
        </div>
        <StatGrid stats={pulse.stats} label="Market pulse figures" />
        <div className="px-[1.625rem] py-3 text-xs text-text-muted">{pulse.sources}</div>
      </div>
    </Container>
  );
}

export function StatTile({ stat }: { stat: MarketStat }) {
  return (
    <div className="flex flex-col gap-3 border-b border-r border-line-soft bg-surface p-[1.625rem]">
      <span className="text-xs font-bold uppercase tracking-[.1em] text-text-soft">{stat.label}</span>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-serif text-[2.875rem] font-semibold leading-none tracking-[-0.025em]">{stat.value}</span>
        <Badge tone={stat.badge.tone}>{stat.badge.label}</Badge>
      </div>
      <span className="text-sm leading-normal text-text-soft">{stat.description}</span>
    </div>
  );
}
