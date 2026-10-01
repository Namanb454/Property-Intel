import type { Metadata } from "next";
import { getBuyingStageGuides, getProjects } from "@/lib/services";
import { firstParam } from "@/lib/utils/search-params";
import { BUDGET_TIERS, PROJECT_STAGES, type ProjectFilters } from "@/types";
import { NewProjectsBand } from "@/components/projects";

export const metadata: Metadata = {
  title: "New projects",
  description: "Pre-launch, new-launch and RERA-registered projects with RERA status, price and possession dates.",
};

export default async function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  const params = await searchParams;
  const stage = PROJECT_STAGES.find((s) => s === firstParam(params.stage));
  const tier = BUDGET_TIERS.find((t) => t === firstParam(params.tier));
  const initialFilters: Partial<ProjectFilters> = { stage, tier };

  const [projects, buyingGuides] = await Promise.all([getProjects(), getBuyingStageGuides()]);

  return (
    <NewProjectsBand
      key={`${stage}-${tier}`}
      projects={projects}
      buyingGuides={buyingGuides}
      initialFilters={initialFilters}
      showBrowseAll={false}
      headingAs="h1"
    />
  );
}
