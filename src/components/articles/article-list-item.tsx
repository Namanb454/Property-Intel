import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import type { Article } from "@/types";

/** Compact rail row: title and kicker on the left, a small square thumbnail on the right. */
export function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link
      href={routes.article(article.slug)}
      className="uline flex items-center gap-3.5 border-b border-line py-3.5 max-sm:h-full max-sm:rounded-tile max-sm:border max-sm:bg-surface max-sm:px-4"
    >
      <span className="flex grow flex-col gap-1.5">
        <span className="t text-[0.9375rem] font-semibold leading-[1.35]">{article.title}</span>
        <span className="text-xs text-text-muted">{article.kicker ?? article.topic}</span>
      </span>
      <span
        className="relative size-16 shrink-0 overflow-hidden rounded-tile"
        style={{ background: article.image.placeholderColor }}
      >
        <Image src={article.image.src} alt={article.image.alt} fill sizes="64px" className="object-cover" />
      </span>
    </Link>
  );
}
