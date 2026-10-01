import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";
import { Avatar, Chip, Container, Icon, TagLink } from "@/components/ui";

interface TopStoriesProps {
  cover: Article;
  secondary?: Article;
}

/** Hero trio: cover story text, the cover image, and a secondary story. */
export function TopStories({ cover, secondary }: TopStoriesProps) {
  return (
    <Container as="section" aria-label="Top stories" className="pb-16">
      <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)_minmax(0,1fr)]">
        <CoverStory article={cover} />
        <CoverImage article={cover} />
        {secondary && <SecondaryStory article={secondary} />}
      </div>
    </Container>
  );
}

function CoverStory({ article }: { article: Article }) {
  return (
    <article className="flex flex-col gap-[1.125rem] pt-1">
      <div className="flex flex-wrap gap-2">
        <Chip variant="dark" size="md" dot="accent-soft">
          Cover story
        </Chip>
        <Chip variant="muted" size="md">
          {article.topic}
        </Chip>
      </div>
      <Link href={routes.article(article.slug)} className="uline block">
        <span className="t text-balance font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          {article.title}
        </span>
      </Link>
      <p className="m-0 text-[0.9375rem] leading-[1.65] text-text">{article.excerpt}</p>
      <div className="mt-auto flex flex-col gap-3.5 border-t border-line pt-4">
        <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
          <span className="flex items-center gap-2.5">
            <Avatar initials={article.desk.initials} />
            <span className="flex flex-col">
              <strong className="font-semibold">{article.desk.name}</strong>
              <span className="text-text-muted">{article.readMinutes} min read</span>
            </span>
          </span>
          <span className="text-text-muted">{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <TagLink key={tag} href={`${routes.insights}?tag=${encodeURIComponent(tag)}`}>
              {tag}
            </TagLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function CoverImage({ article }: { article: Article }) {
  return (
    <Link
      href={routes.article(article.slug)}
      aria-label={`Read the cover story: ${article.title.split(":")[0]}`}
      className="zoom relative order-first block min-h-[17.5rem] overflow-hidden rounded-hero sm:col-span-2 sm:min-h-[25rem] lg:order-none lg:col-span-1 lg:min-h-[32.5rem]"
      style={{ background: article.image.placeholderColor }}
    >
      <Image
        src={article.image.src}
        alt={article.image.alt}
        fill
        preload
        sizes="(min-width: 1101px) 560px, 100vw"
        className="object-cover"
      />
      {article.coverLabel && (
        <span className="absolute bottom-[1.125rem] left-[1.125rem] flex items-center gap-2 rounded-full bg-white/94 px-3.5 py-2 text-[0.8125rem] font-semibold text-ink">
          {article.coverLabel}
        </span>
      )}
      <span className="absolute bottom-[1.125rem] right-[1.125rem] flex size-12 items-center justify-center rounded-full bg-ink text-white">
        <Icon name="arrow-up-right" size={18} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

function SecondaryStory({ article }: { article: Article }) {
  const href = routes.article(article.slug);
  return (
    <article className="flex flex-col gap-3.5">
      <Link
        href={href}
        aria-label={`Read: ${article.title.split(":")[0]}`}
        className="zoom relative block aspect-[4/3] overflow-hidden rounded-media"
        style={{ background: article.image.placeholderColor }}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1101px) 320px, (min-width: 721px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <Chip variant="muted" dot="accent" className="self-start">
        {article.topic}
      </Chip>
      <Link href={href} className="uline block">
        <span className="t font-serif text-[1.4375rem] font-semibold leading-[1.18] tracking-[-0.015em]">
          {article.title}
        </span>
      </Link>
      <p className="m-0 text-sm leading-[1.6] text-text">{article.excerpt}</p>
      <div className="mt-auto flex items-center gap-3 text-[0.8125rem] text-text-muted">
        <span>
          {article.desk.name} · {article.readMinutes} min
        </span>
        <span className="h-px grow bg-line" />
      </div>
    </article>
  );
}
