import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { stageMeta } from "@/config/projects";
import { formatINRShort } from "@/lib/utils";
import type { Project } from "@/types";
import { ButtonLink, Icon } from "@/components/ui";
import { ProjectStatus, StageBadge, TierBadge } from "./project-badges";

/** Formats a project's headline price; pre-launch prices are indicative so carry a "+". */
export function formatProjectPrice(project: Project): string {
  const price = formatINRShort(project.priceFrom);
  return project.stage === "pre-launch" ? `${price}+` : price;
}

interface ProjectCardProps {
  project: Project;
  /**
   * Where "How to buy" points. Defaults to the "How buying works" block on the same page;
   * use "guides" where that block isn't rendered.
   */
  guideLink?: "in-page" | "guides";
}

/** Listing card used in the projects grid. */
export function ProjectCard({ project, guideLink = "in-page" }: ProjectCardProps) {
  const href = routes.project(project.slug);
  const stage = stageMeta[project.stage];

  return (
    <article className="lift flex flex-col overflow-hidden rounded-card bg-surface text-ink">
      <div className="relative">
        <Link
          href={href}
          aria-label={`View ${project.name}`}
          className="zoom relative block aspect-video overflow-hidden"
          style={{ background: project.image.placeholderColor }}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1101px) 400px, (min-width: 721px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
        <span className="absolute left-3 top-3 flex">
          <StageBadge stage={project.stage} />
        </span>
        <span className="absolute bottom-3 left-3 flex">
          <TierBadge tier={project.tier} />
        </span>
        <button
          type="button"
          aria-label={`Save ${project.name}`}
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full bg-white/94 text-ink"
        >
          <Icon name="bookmark" size={17} />
        </button>
      </div>
      <div className="flex grow flex-col gap-2.5 px-[1.125rem] pb-[1.125rem] pt-4">
        <div className="flex items-baseline justify-between gap-2.5">
          <Link href={href} className="uline block min-w-0">
            <span className="t font-serif text-[1.3125rem] font-semibold leading-[1.15] tracking-[-0.015em]">
              {project.name}
            </span>
          </Link>
          <ProjectStatus project={project} />
        </div>
        <div className="-mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-text-soft">
          <span className="flex items-center gap-[0.3125rem]">
            <Icon name="map-pin" size={14} />
            {project.locality}, {project.city}
          </span>
          <span className="text-text-muted">by {project.developer}</span>
        </div>
        <dl className="m-0 grid grid-cols-3 gap-2 border-y border-line-soft py-2.5">
          <ProjectFact label="Config" value={project.configuration} />
          <ProjectFact label="Size" value={project.sizeRange} />
          <ProjectFact label="Possession" value={project.possession} />
        </dl>
        <div className="mt-auto flex items-center justify-between gap-2.5">
          <div className="flex flex-col">
            <span className="text-[0.6875rem] text-text-muted">{stage.priceLabel}</span>
            <span className="font-serif text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.01em]">
              {formatProjectPrice(project)}
            </span>
          </div>
          <ButtonLink href={href} size="sm">
            {stage.cta}
          </ButtonLink>
        </div>
        <Link
          href={guideLink === "in-page" ? "#how-to-buy" : `${routes.guides}#buying-${project.stage}`}
          className="text-xs font-semibold text-accent-strong"
        >
          {stage.guideLink} →
        </Link>
      </div>
    </article>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[.07em] text-text-muted">{label}</dt>
      <dd className="m-0 mt-0.5 text-[0.8125rem] font-semibold">{value}</dd>
    </div>
  );
}
