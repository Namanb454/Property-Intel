import type { Project } from "@/types";
import { Carousel } from "@/components/ui";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
  label?: string;
  guideLink?: "in-page" | "guides";
  /** "dark" when the grid sits on the black band. */
  tone?: "light" | "dark";
}

/** Responsive grid of project cards; a swipe carousel on phones. */
export function ProjectGrid({ projects, label = "Projects", guideLink, tone }: ProjectGridProps) {
  return (
    <Carousel
      label={label}
      tone={tone}
      className="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-5"
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} guideLink={guideLink} />
      ))}
    </Carousel>
  );
}
