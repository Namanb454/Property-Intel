import { getProjectStatus, stageMeta, tierMeta } from "@/config/projects";
import { cn } from "@/lib/utils";
import type { BudgetTier, Project, ProjectStage } from "@/types";
import { Icon, type IconName } from "@/components/ui";

const STAGE_ICON: Record<ProjectStage, { icon: IconName; color: string }> = {
  "pre-launch": { icon: "clock", color: "text-accent-strong" },
  "new-launch": { icon: "sparkle", color: "text-ink" },
  "rera-registered": { icon: "shield-check", color: "text-positive" },
};

/** White pill overlaid on a project image naming its sales stage. */
export function StageBadge({ stage }: { stage: ProjectStage }) {
  const { icon, color } = STAGE_ICON[stage];
  return (
    <span className="pointer-events-none flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink">
      <Icon name={icon} size={13} strokeWidth={2.2} className={color} />
      {stageMeta[stage].label}
    </span>
  );
}

const TIER_STYLES: Record<BudgetTier, string> = {
  luxury: "bg-ink text-gold",
  premium: "bg-accent-tint text-accent-deep",
  affordable: "bg-positive-tint text-positive-deep",
};

export function TierBadge({ tier }: { tier: BudgetTier }) {
  return (
    <span
      className={cn(
        "pointer-events-none rounded-[0.4375rem] px-[0.5625rem] py-1 text-[0.6875rem] font-bold tracking-[.04em]",
        TIER_STYLES[tier],
      )}
    >
      {tierMeta[tier].label}
    </span>
  );
}

/** RERA / construction status beside a project's name. */
export function ProjectStatus({ project }: { project: Project }) {
  const status = getProjectStatus(project);
  const warning = status.tone === "warning";
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1 text-[0.6875rem] font-semibold",
        warning ? "text-warning" : "text-positive",
      )}
    >
      <Icon name={warning ? "clock" : "shield-check"} size={12} strokeWidth={2.2} />
      {status.label}
    </span>
  );
}
