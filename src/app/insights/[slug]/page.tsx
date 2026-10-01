import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "@/config/navigation";
import { formatDate } from "@/lib/utils";
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from "@/lib/services";
import { ArticleStack } from "@/components/articles";
import { Avatar, Chip, Container, PhotoCredit, SectionHeading, TagLink } from "@/components/ui";

export async function generateStaticParams() {
  return (await getAllArticleSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = await getArticleBySlug((await params).slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);

  return (
    <>
      <Container as="article" className="pb-16 pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="mx-auto flex max-w-[47.5rem] flex-col gap-[1.125rem]">
          <Link href={routes.insights} className="text-sm font-semibold text-text-soft">
            ← All insights
          </Link>
          <Chip variant="muted" dot="accent" size="md" className="self-start">
            {article.topic}
          </Chip>
          <h1 className="m-0 text-balance font-serif text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {article.title}
          </h1>
          <p className="m-0 text-lg leading-[1.6] text-text">{article.excerpt}</p>
          <div className="flex items-center justify-between gap-3 border-y border-line py-4 text-[0.8125rem]">
            <span className="flex items-center gap-2.5">
              <Avatar initials={article.desk.initials} />
              <span className="flex flex-col">
                <strong className="font-semibold">{article.desk.name}</strong>
                <span className="text-text-muted">{article.readMinutes} min read</span>
              </span>
            </span>
            <span className="text-text-muted">{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        <figure className="mx-auto my-10 flex max-w-[65rem] flex-col gap-2.5">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-hero"
            style={{ background: article.image.placeholderColor }}
          >
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              preload
              sizes="(min-width: 1101px) 1040px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <PhotoCredit credit={article.image.credit} />
          </figcaption>
        </figure>

        <div className="mx-auto flex max-w-[42.5rem] flex-col gap-5 text-[1.0625rem] leading-[1.75] text-text-strong">
          {article.body?.length ? (
            article.body.map((paragraph, i) => (
              <p key={i} className="m-0">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="m-0 rounded-card border border-dashed border-line-strong px-6 py-8 text-center text-[0.9375rem] leading-[1.6] text-text-muted">
              The full article body will be loaded from the CMS.
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {article.tags.map((tag) => (
              <TagLink key={tag} href={`${routes.insights}?tag=${encodeURIComponent(tag)}`}>
                {tag}
              </TagLink>
            ))}
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container as="section" aria-labelledby="related-h" className="pb-[5.5rem]">
          <SectionHeading id="related-h" title={`More on ${article.topic}`} className="mb-7" />
          <ArticleStack articles={related} label="Related stories" />
        </Container>
      )}
    </>
  );
}
