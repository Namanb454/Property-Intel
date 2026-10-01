import Link from "next/link";
import { routes } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { GuideStep } from "@/types";
import { Carousel } from "@/components/ui";

/** Numbered first-time buyer steps. */
export function GuideSteps({ steps, className }: { steps: GuideStep[]; className?: string }) {
  return (
    <Carousel
      as="ol"
      label="Buyer guide steps"
      itemClassName="flex"
      itemWidth="max-sm:w-[75%]"
      className={cn(
        "m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(13.125rem,100%),1fr))] gap-4 p-0",
        className,
      )}
    >
      {steps.map((step) => (
        <Link
          id={step.slug}
          key={step.slug}
          href={`${routes.guides}#${step.slug}`}
          className="lift uline box-border scroll-mt-24 flex w-full flex-col gap-3 rounded-card border border-line-card bg-surface p-6"
        >
          <span className="font-serif text-[2.5rem] font-semibold leading-none text-accent">
            {String(step.step).padStart(2, "0")}
          </span>
          <span className="t text-[1.0625rem] font-bold">{step.title}</span>
          <span className="text-sm leading-[1.55] text-text-soft">{step.description}</span>
        </Link>
      ))}
    </Carousel>
  );
}
