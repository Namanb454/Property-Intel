import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";
import { Avatar, Chip } from "@/components/ui";

/** Horizontal story card: image on the left, topic, title, excerpt and byline on the right. */
export function ArticleCard({ article }: { article: Article }) {
  const href = routes.article(article.slug);
  return (
    <article className="lift grid overflow-hidden rounded-card border border-line-card bg-surface sm:grid-cols-[18.75rem_minmax(0,1fr)]">
      <Link
        href={href}
        aria-label={`Read: ${article.title}`}
        className="zoom relative block min-h-[12.5rem] overflow-hidden sm:min-h-[14.75rem]"
        style={{ background: article.image.placeholderColor }}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 721px) 300px, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col gap-3 px-[1.625rem] py-6">
        <Chip variant="subtle" dot="accent" className="self-start">
          {article.topic}
        </Chip>
        <Link href={href} className="uline block">
          <span className="t font-serif text-[1.5625rem] font-semibold leading-[1.16] tracking-[-0.015em]">
            {article.title}
          </span>
        </Link>
        <p className="m-0 text-[0.9375rem] leading-[1.6] text-text-soft">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-3.5 text-[0.8125rem]">
          <span className="flex items-center gap-2 font-semibold">
            <Avatar initials={article.desk.initials} size="sm" />
            {article.desk.name}
          </span>
          <span className="text-text-muted">
            {formatDate(article.publishedAt, "short")} · {article.readMinutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}
