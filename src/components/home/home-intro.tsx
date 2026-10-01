import Link from "next/link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { ButtonLink, Eyebrow, PlayIcon } from "@/components/ui";

/** Page title block: edition label, display headline and the weekly-brief call to action. */
export function HomeIntro() {
  const { edition } = siteConfig;
  return (
    <section className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(28.75rem,100%),1fr))] items-end gap-8 pb-10 pt-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="flex flex-col gap-[1.375rem]">
        <Eyebrow>Weekly edition · {formatDate(edition.date, "long")}</Eyebrow>
        <h1 className="m-0 text-balance font-serif text-[clamp(3.25rem,6.8vw,6.25rem)] font-semibold leading-[.94] tracking-[-0.04em]">
          The Market, Explained.
        </h1>
        <div aria-hidden="true" className="flex w-[min(100%,35rem)] gap-1.5">
          <span className="h-1.5 w-24 rounded-full bg-accent" />
          <span className="h-1.5 grow rounded-full bg-track" />
        </div>
      </div>
      <div className="flex max-w-[27.5rem] flex-col gap-[1.125rem] lg:justify-self-end">
        <p className="m-0 text-[1.0625rem] leading-[1.6] text-text">
          Independent analysis of where India&apos;s property prices are heading, which cities reward investors, which
          neighbourhoods are best to live in — and every new project, verified.
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <ButtonLink href={routes.newsletter} variant="outline" icon="arrow-right">
            Get the weekly brief
          </ButtonLink>
          <Link
            href={edition.podcast.href}
            aria-label="Play this week's market podcast"
            className="flex size-11 items-center justify-center rounded-full bg-ink text-white hover:text-white"
          >
            <PlayIcon />
          </Link>
          <span className="text-[0.8125rem] text-text-muted">Podcast · {edition.podcast.durationMinutes} min</span>
        </div>
      </div>
    </section>
  );
}
