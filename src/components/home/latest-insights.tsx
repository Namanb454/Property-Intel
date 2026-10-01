import type { ReactNode } from "react";
import { routes } from "@/config/navigation";
import type { Article, ArticleTopicFilter } from "@/types";
import { FilterableArticleList } from "@/components/articles";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";

const TOPICS: ArticleTopicFilter[] = ["All", "Trends", "Investing", "Policy", "NRI", "Living"];

/** "Latest insights": filterable story cards beside a rail. */
export function LatestInsights({ articles, rail }: { articles: Article[]; rail: ReactNode }) {
  return (
    <Container as="section" id="stories" aria-labelledby="stories-h" className="pb-[5.5rem]">
      <SectionHeading
        id="stories-h"
        title="Latest insights"
        action={{ label: "View all", href: routes.insights }}
        className="mb-7"
      />
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="flex flex-col gap-[1.125rem]">
          <FilterableArticleList articles={articles} topics={TOPICS} limit={5} />
          <div className="flex justify-center pt-2.5">
            <ButtonLink href={routes.insights} variant="outline" size="tall" shape="pill" icon="arrow-down">
              Show more stories
            </ButtonLink>
          </div>
        </div>
        {rail}
      </div>
    </Container>
  );
}
