import Link from "next/link";
import { routes } from "@/config/navigation";
import type { Analyst, Article, Project } from "@/types";
import { ArticleRail } from "@/components/articles";
import { ProjectListItem } from "@/components/projects";
import { EmiCalculator } from "@/components/tools";
import { ButtonLink, Carousel, Icon, RailHeading } from "@/components/ui";

interface HomeRailProps {
  marketUpdates: Article[];
  trendingProjects: Project[];
  analysts: Analyst[];
}

/** Right-hand rail beside "Latest insights". */
export function HomeRail({ marketUpdates, trendingProjects, analysts }: HomeRailProps) {
  return (
    <aside aria-label="More from the site" className="flex flex-col gap-9">
      <ArticleRail title="Market updates" articles={marketUpdates} />

      <div className="rounded-card border border-line bg-surface p-5">
        <div className="mb-1 flex items-center justify-between">
          <RailHeading>Trending projects</RailHeading>
          <span className="text-[0.6875rem] text-text-muted">Sample listings</span>
        </div>
        <Carousel label="Trending projects" bleed={false} className="flex flex-col">
          {trendingProjects.map((project, i) => (
            <ProjectListItem key={project.slug} project={project} last={i === trendingProjects.length - 1} />
          ))}
        </Carousel>
        <ButtonLink href={routes.projects} block icon="arrow-right" className="mt-2">
          Browse all projects
        </ButtonLink>
      </div>

      <div className="flex flex-col">
        <RailHeading className="mb-1 max-sm:mb-3">Our analysts</RailHeading>
        <Carousel label="Our analysts" className="flex flex-col" itemWidth="max-sm:w-[80%]">
          {analysts.map((analyst) => (
            <Link
              key={analyst.id}
              href={routes.page("about")}
              className="uline flex items-center gap-3.5 py-3 max-sm:rounded-tile max-sm:border max-sm:border-line max-sm:bg-surface max-sm:px-4"
            >
              <span className="flex size-[2.875rem] shrink-0 items-center justify-center rounded-full bg-fill text-text-strong">
                <Icon name="user" size={20} />
              </span>
              <span className="flex grow flex-col gap-0.5">
                <span className="t text-[0.9375rem] font-semibold">{analyst.name}</span>
                <span className="text-[0.8125rem] text-text-muted">
                  {analyst.role} · {analyst.focus}
                </span>
              </span>
            </Link>
          ))}
        </Carousel>
      </div>

      <EmiCalculator />
    </aside>
  );
}
