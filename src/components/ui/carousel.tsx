"use client";

import { Children, useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode;
  /** Accessible name for the carousel region. */
  label: string;
  /** Layout from 721px up (e.g. a grid or column). Below that, items become a swipeable row. */
  className?: string;
  /** Classes for each slide wrapper. Defaults to `sm:contents`, so slides join the desktop layout directly. */
  itemClassName?: string;
  /** Slide width on phones. */
  itemWidth?: string;
  /** Gap between slides on phones. */
  mobileGap?: string;
  /** Let the row run edge to edge on phones (use when the carousel sits directly in the page gutter). */
  bleed?: boolean;
  as?: "div" | "ul" | "ol";
  /** Dot colours: light pages or the dark band. */
  tone?: "light" | "dark";
}

/**
 * Renders a normal list layout on tablet and desktop, and a swipeable,
 * scroll-snapping carousel with position dots on phones.
 */
export function Carousel({
  children,
  label,
  className,
  itemClassName = "sm:contents",
  itemWidth = "max-sm:w-[85%]",
  mobileGap = "max-sm:gap-3",
  bleed = true,
  as: Track = "div",
  tone = "light",
}: CarouselProps) {
  const slides = Children.toArray(children);
  const Slide = Track === "div" ? "div" : "li";
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    const [first, second] = Array.from(track?.children ?? []) as HTMLElement[];
    if (!track || !first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    if (step > 0) setActive(Math.round(track.scrollLeft / step));
  }, []);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="min-w-0">
      <Track
        ref={trackRef as never}
        onScroll={handleScroll}
        className={cn(
          className,
          "noscroll max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:flex-row max-sm:flex-nowrap max-sm:items-stretch max-sm:overflow-x-auto",
          mobileGap,
          bleed && "max-sm:-mx-4 max-sm:scroll-px-4 max-sm:px-4",
        )}
      >
        {slides.map((slide, i) => (
          <Slide
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={cn("max-sm:grid max-sm:shrink-0 max-sm:snap-start", itemWidth, itemClassName)}
          >
            {slide}
          </Slide>
        ))}
      </Track>
      {slides.length > 1 && (
        <div aria-hidden="true" className="mt-3.5 flex justify-center gap-1.5 sm:hidden">
          {slides.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-5 bg-accent" : cn("w-1.5", tone === "dark" ? "bg-band-border" : "bg-line-strong"),
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
