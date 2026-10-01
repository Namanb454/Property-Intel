import { buyerGuideSteps, buyingStageGuides, tools } from "@/data/guides";
import type { BuyingStageGuide, GuideStep, ToolLink } from "@/types";

export async function getBuyerGuideSteps(): Promise<GuideStep[]> {
  return buyerGuideSteps;
}

export async function getTools(): Promise<ToolLink[]> {
  return tools;
}

export async function getToolBySlug(slug: string): Promise<ToolLink | undefined> {
  return tools.find((t) => t.slug === slug);
}

export async function getBuyingStageGuides(): Promise<BuyingStageGuide[]> {
  return buyingStageGuides;
}
