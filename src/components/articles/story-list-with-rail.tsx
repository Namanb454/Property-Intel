import type { ReactNode } from "react";
import type { Article } from "@/types";
import { Container } from "@/components/ui";
import { ArticleRail, ArticleStack } from "./article-stack";

interface StoryListWithRailProps {
  articles: Article[];
  railArticles?: Article[];
  railTitle?: string;
  /** Rendered above the story cards, e.g. filters or a results summary. */
  header?: ReactNode;
  emptyMessage?: string;
}

/** A column of story cards with a "Market updates"-style rail, used by topic and listing pages. */
export function StoryListWithRail({
  articles,
  railArticles = [],
  railTitle = "Market updates",
  header,
  emptyMessage = "No stories here yet.",
}: StoryListWithRailProps) {
  return (
    <Container as="section" className="pb-[5.5rem]">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="flex flex-col gap-[1.125rem]">
          {header}
          <ArticleStack articles={articles} />
          {articles.length === 0 && (
            <p className="m-0 rounded-panel border border-dashed border-line-strong px-6 py-10 text-center text-[0.9375rem] text-text-muted">
              {emptyMessage}
            </p>
          )}
        </div>
        {railArticles.length > 0 && (
          <aside aria-label={railTitle}>
            <ArticleRail title={railTitle} articles={railArticles} />
          </aside>
        )}
      </div>
    </Container>
  );
}
