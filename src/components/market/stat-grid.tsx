import type { MarketStat } from "@/types";
import { Carousel } from "@/components/ui";
import { StatTile } from "./market-pulse";

/** Bordered grid of stat tiles for use inside a panel; a swipe carousel on phones. */
export function StatGrid({ stats, label }: { stats: MarketStat[]; label: string }) {
  return (
    <Carousel
      label={label}
      bleed={false}
      itemWidth="max-sm:w-[80%]"
      mobileGap="max-sm:gap-0"
      className="-mb-px -mr-px grid grid-cols-[repeat(auto-fit,minmax(min(15.625rem,100%),1fr))]"
    >
      {stats.map((stat) => (
        <StatTile key={stat.id} stat={stat} />
      ))}
    </Carousel>
  );
}
