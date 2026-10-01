import Link from "next/link";
import { routes } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { BuyingStageGuide, ProjectStage } from "@/types";
import { Carousel, Icon, type IconName } from "@/components/ui";

const STAGE_STYLES: Record<ProjectStage, { icon: IconName; iconBox: string; status: string }> = {
  "pre-launch": {
    icon: "clock",
    iconBox: "bg-accent-night text-accent-pale",
    status: "bg-accent-night text-accent-paler",
  },
  "new-launch": {
    icon: "sparkle",
    iconBox: "bg-band-fill text-band-text",
    status: "bg-positive-night text-positive-soft",
  },
  "rera-registered": {
    icon: "shield-check",
    iconBox: "bg-positive-night text-positive-soft",
    status: "bg-band-fill text-band-label",
  },
};

interface BuyingStagesProps {
  guides: BuyingStageGuide[];
  notice?: string | null;
}

/** "How buying works at each stage" — three explainer cards on the dark band. */
export function BuyingStages({ guides, notice }: BuyingStagesProps) {
  return (
    <div id="how-to-buy" className="mt-14 scroll-mt-24">
      <div className="mb-[1.375rem] flex items-center gap-4">
        <h3 className="m-0 whitespace-nowrap text-xl font-bold text-white">How buying works at each stage</h3>
        <span className="h-px grow bg-band-line" />
      </div>
      <Carousel
        label="Buying stages"
        tone="dark"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-4"
      >
        {guides.map((guide) => {
          const style = STAGE_STYLES[guide.stage];
          return (
            <div
              key={guide.stage}
              id={`buying-${guide.stage}`}
              className="flex flex-col gap-3 rounded-card border border-band-line bg-band-raised p-6"
            >
              <div className="flex items-center justify-between">
                <span className={cn("flex size-[2.625rem] items-center justify-center rounded-control", style.iconBox)}>
                  <Icon name={style.icon} size={20} />
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", style.status)}>
                  {guide.status}
                </span>
              </div>
              <span className="text-lg font-bold text-white">{guide.title}</span>
              <p className="m-0 text-sm leading-[1.6] text-band-text-soft">{guide.description}</p>
              <Link
                href={`${routes.guides}#buying-${guide.stage}`}
                className="mt-auto text-sm font-semibold text-accent-soft"
              >
                {guide.guideLabel} →
              </Link>
            </div>
          );
        })}
      </Carousel>
      {notice && <p className="mb-0 mt-[1.375rem] text-xs text-band-text-muted">{notice}</p>}
    </div>
  );
}
