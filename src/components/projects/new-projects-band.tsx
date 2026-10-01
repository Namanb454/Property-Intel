import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { BuyingStageGuide, Project, ProjectFilters } from "@/types";
import { ButtonLink, Container, SectionIntro } from "@/components/ui";
import { BuyingStages } from "./buying-stages";
import { ProjectExplorer } from "./project-explorer";

interface NewProjectsBandProps {
  projects: Project[];
  buyingGuides: BuyingStageGuide[];
  initialFilters?: Partial<ProjectFilters>;
  /** Hide the "Browse all projects" link when already on the projects page. */
  showBrowseAll?: boolean;
  headingAs?: "h1" | "h2";
}

/** Dark band: intro, filterable project grid and "how buying works". */
export function NewProjectsBand({
  projects,
  buyingGuides,
  initialFilters,
  showBrowseAll = true,
  headingAs = "h2",
}: NewProjectsBandProps) {
  return (
    <section id="projects" aria-labelledby="projects-h" className="scroll-mt-16 bg-band text-band-text">
      <Container className="py-[clamp(3.5rem,7vw,6rem)]">
        <SectionIntro
          tone="dark"
          eyebrow="New projects"
          title="Every new project, verified and explained."
          titleId="projects-h"
          titleAs={headingAs}
          asideWidth="max-w-[30rem]"
          description="Pre-launch, new-launch and RERA-registered projects across affordable, premium and luxury budgets. Every listing shows its RERA status, price, possession date and exactly how to buy."
        >
          <div className="flex flex-wrap gap-2.5">
            {showBrowseAll && (
              <ButtonLink href={routes.projects} variant="inverse" size="lg" icon="arrow-right">
                Browse all projects
              </ButtonLink>
            )}
            <a
              href="#how-to-buy"
              className="box-content flex h-[2.875rem] items-center rounded-control border border-band-border px-5 text-sm font-semibold text-band-text"
            >
              How buying works
            </a>
          </div>
        </SectionIntro>

        <ProjectExplorer projects={projects} initialFilters={initialFilters} />
        <BuyingStages guides={buyingGuides} notice={siteConfig.sampleDataNotices.projects} />
      </Container>
    </section>
  );
}
