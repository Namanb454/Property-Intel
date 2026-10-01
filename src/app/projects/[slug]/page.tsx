import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "@/config/navigation";
import { getProjectStatus, stageMeta, tierMeta } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { getAllProjectSlugs, getBuyingStageGuides, getProjectBySlug, getProjectsByCity } from "@/lib/services";
import {
  BuyingStages,
  formatProjectPrice,
  ProjectGrid,
  ProjectStatus,
  StageBadge,
  TierBadge,
} from "@/components/projects";
import { ButtonLink, Container, Icon, PhotoCredit, SectionHeading } from "@/components/ui";

export async function generateStaticParams() {
  return (await getAllProjectSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name}, ${project.locality}`,
    description: `${project.configuration} in ${project.locality}, ${project.city}. ${stageMeta[project.stage].priceLabel} ${formatProjectPrice(project)}.`,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();

  const [cityProjects, buyingGuides] = await Promise.all([getProjectsByCity(project.citySlug), getBuyingStageGuides()]);
  const nearby = cityProjects.filter((p) => p.slug !== project.slug);
  const stage = stageMeta[project.stage];

  const facts = [
    { label: "Configuration", value: project.configuration },
    { label: "Size", value: project.sizeRange },
    { label: "Possession", value: project.possession },
    { label: "RERA status", value: getProjectStatus(project).label },
    { label: "Budget", value: tierMeta[project.tier].label },
    { label: "Developer", value: project.developer },
  ];

  return (
    <>
      <Container className="pb-16 pt-[clamp(2rem,5vw,3.5rem)]">
        <Link href={routes.projects} className="text-sm font-semibold text-text-soft">
          ← All projects
        </Link>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <figure className="m-0 flex flex-col gap-2.5">
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-hero"
              style={{ background: project.image.placeholderColor }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                preload
                sizes="(min-width: 1101px) 760px, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 flex">
                <StageBadge stage={project.stage} />
              </span>
              <span className="absolute bottom-4 left-4 flex">
                <TierBadge tier={project.tier} />
              </span>
            </div>
            <figcaption>
              <PhotoCredit credit={project.image.credit} />
            </figcaption>
          </figure>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <ProjectStatus project={project} />
              <h1 className="m-0 font-serif text-[clamp(2.125rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                {project.name}
              </h1>
              <span className="flex items-center gap-1.5 text-[0.9375rem] text-text-soft">
                <Icon name="map-pin" size={16} />
                {project.locality}, {project.city} · by {project.developer}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-tile bg-accent-tint px-5 py-4">
              <span className="text-xs font-semibold text-accent-deep">{stage.priceLabel}</span>
              <span className="font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em]">
                {formatProjectPrice(project)}
              </span>
            </div>
            <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-3.5 rounded-card border border-line bg-surface p-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[.07em] text-text-muted">
                    {fact.label}
                  </dt>
                  <dd className="m-0 mt-1 text-[0.9375rem] font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href={routes.page("contact")} size="lg" icon="arrow-right">
                {stage.cta}
              </ButtonLink>
              <ButtonLink href="#how-to-buy" variant="outline" size="lg">
                {stage.guideLink}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <section aria-label="How buying works" className="bg-band text-band-text">
        <Container className="pb-[clamp(3.5rem,7vw,5.5rem)] pt-1">
          <BuyingStages guides={buyingGuides} notice={siteConfig.sampleDataNotices.projects} />
        </Container>
      </section>

      {nearby.length > 0 && (
        <Container as="section" aria-labelledby="nearby-h" className="py-[clamp(3.5rem,7vw,5.5rem)]">
          <SectionHeading
            id="nearby-h"
            title={`More projects in ${project.city}`}
            action={{ label: `${project.city} guide`, href: routes.city(project.citySlug) }}
            className="mb-7"
          />
          <ProjectGrid projects={nearby} label={`More projects in ${project.city}`} />
        </Container>
      )}
    </>
  );
}
