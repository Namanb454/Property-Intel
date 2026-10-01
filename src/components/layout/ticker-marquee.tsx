import type { CSSProperties } from "react";
import { cn, formatChange } from "@/lib/utils";
import type { TickerItem } from "@/types";

/** Seconds each item stays in view; the loop length scales with the number of items. */
const SECONDS_PER_ITEM = 5;

function TickerList({ items, hidden }: { items: TickerItem[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex shrink-0 list-none items-center gap-[1.375rem] p-0 pr-[1.375rem]"
    >
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span className="text-chrome-muted">{item.label}</span>
          <strong className="font-semibold text-white">{item.value}</strong>
          <span className={cn("font-semibold", item.changePct >= 0 ? "text-positive-soft" : "text-accent-muted")}>
            {formatChange(item.changePct)}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuously scrolling ticker. The list is rendered twice and the track slides by half its
 * width, so the loop is seamless. Pauses on hover/focus; stops for reduced-motion users.
 */
export function TickerMarquee({ items, label }: { items: TickerItem[]; label: string }) {
  const style = { "--marquee-duration": `${items.length * SECONDS_PER_ITEM}s` } as CSSProperties;
  return (
    <div
      role="marquee"
      aria-label={label}
      className="group min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)] motion-reduce:overflow-x-auto"
    >
      <div
        style={style}
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <TickerList items={items} />
        <TickerList items={items} hidden />
      </div>
    </div>
  );
}
