import type { BudgetTier, Project, ProjectFilters, ProjectStage, Tone } from "@/types";

export interface StageMeta {
  label: string;
  /** Primary call to action on a listing card. */
  cta: string;
  /** Label above the price: pre-launch prices are indicative. */
  priceLabel: string;
  guideLink: string;
}

export const stageMeta: Record<ProjectStage, StageMeta> = {
  "pre-launch": {
    label: "Pre-launch",
    cta: "Register interest",
    priceLabel: "Expected price",
    guideLink: "How to buy a pre-launch",
  },
  "new-launch": {
    label: "New launch",
    cta: "View project",
    priceLabel: "Starting price",
    guideLink: "How to buy a new launch",
  },
  "rera-registered": {
    label: "RERA registered",
    cta: "View project",
    priceLabel: "Starting price",
    guideLink: "How to buy a RERA project",
  },
};

export const tierMeta: Record<BudgetTier, { label: string }> = {
  affordable: { label: "Affordable" },
  premium: { label: "Premium" },
  luxury: { label: "Luxury" },
};

export const stageFilterOptions: Array<{ value: ProjectStage | "all"; label: string }> = [
  { value: "all", label: "All stages" },
  { value: "pre-launch", label: "Pre-launch" },
  { value: "new-launch", label: "New launch" },
  { value: "rera-registered", label: "RERA registered" },
];

export const tierFilterOptions: Array<{ value: BudgetTier | "all"; label: string }> = [
  { value: "all", label: "All budgets" },
  { value: "affordable", label: "Affordable" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

/** The compliance status shown beside a project's name. */
export function getProjectStatus(project: Project): { label: string; tone: Extract<Tone, "positive" | "warning"> } {
  if (project.reraStatus === "awaited") return { label: "RERA awaited", tone: "warning" };
  if (project.constructionStatus === "under-construction") return { label: "Under construction", tone: "positive" };
  if (project.constructionStatus === "nearing-possession") return { label: "Nearing possession", tone: "positive" };
  return { label: "RERA registered", tone: "positive" };
}

export function matchesProjectFilters(project: Project, { stage, tier }: ProjectFilters): boolean {
  return (stage === "all" || project.stage === stage) && (tier === "all" || project.tier === tier);
}
