import type { Article } from "@/types";
import { Carousel, RailHeading } from "@/components/ui";
import { ArticleCard } from "./article-card";
import { ArticleListItem } from "./article-list-item";

/** A column of story cards; a swipe carousel on phones. */
export function ArticleStack({ articles, label = "Stories" }: { articles: Article[]; label?: string }) {
  return (
    <Carousel label={label} className="flex flex-col gap-[1.125rem]">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </Carousel>
  );
}

/** A titled rail of compact story rows; a swipe carousel of small cards on phones. */
export function ArticleRail({ title, articles }: { title: string; articles: Article[] }) {
  return (
    <div className="flex flex-col">
      <RailHeading className="mb-1 max-sm:mb-3">{title}</RailHeading>
      <Carousel label={title} className="flex flex-col" itemWidth="max-sm:w-[80%]">
        {articles.map((article) => (
          <ArticleListItem key={article.slug} article={article} />
        ))}
      </Carousel>
    </div>
  );
}
