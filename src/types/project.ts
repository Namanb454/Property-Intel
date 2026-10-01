import type { ImageAsset } from "./common";

export const PROJECT_STAGES = ["pre-launch", "new-launch", "rera-registered"] as const;
export type ProjectStage = (typeof PROJECT_STAGES)[number];

export const BUDGET_TIERS = ["affordable", "premium", "luxury"] as const;
export type BudgetTier = (typeof BUDGET_TIERS)[number];

export type ReraStatus = "awaited" | "registered";

export type ConstructionStatus = "under-construction" | "nearing-possession";

export interface Project {
  slug: string;
  name: string;
  developer: string;
  locality: string;
  city: string;
  citySlug: string;
  stage: ProjectStage;
  tier: BudgetTier;
  reraStatus: ReraStatus;
  /** Only meaningful once a project is RERA registered and selling. */
  constructionStatus?: ConstructionStatus;
  configuration: string;
  sizeRange: string;
  /** "TBA" until the developer files a date. */
  possession: string;
  /** Starting (or expected, for pre-launch) price in rupees. */
  priceFrom: number;
  image: ImageAsset;
  /** Position in the "Trending projects" rail; unset projects are not featured. */
  trendingRank?: number;
}

export interface ProjectFilters {
  stage: ProjectStage | "all";
  tier: BudgetTier | "all";
}
