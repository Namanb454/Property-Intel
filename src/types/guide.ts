import type { IconName } from "@/components/ui/icons";
import type { ProjectStage } from "./project";

export interface GuideStep {
  step: number;
  slug: string;
  title: string;
  description: string;
}

export interface ToolLink {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface BuyingStageGuide {
  stage: ProjectStage;
  title: string;
  status: string;
  description: string;
  guideLabel: string;
}
