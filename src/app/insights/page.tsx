import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { getMarketUpdates, getStories } from "@/lib/services";
import { firstParam } from "@/lib/utils/search-params";
import { ARTICLE_TOPICS, type ArticleTopicFilter } from "@/types";
import { ArticleRail, FilterableArticleList } from "@/components/articles";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Insights",
  description: "Analysis and plain-English guides on India's housing market.",
};

const TOPICS: ArticleTopicFilter[] = ["All", ...ARTICLE_TOPICS];

export default async function InsightsPage({ searchParams }: PageProps<"/insights">) {
  const params = await searchParams;
  const tag = firstParam(params.tag);
  const query = firstParam(params.q)?.trim();
  const topicParam = firstParam(params.topic);
  const initialTopic = TOPICS.find((t) => t.toLowerCase() === topicParam?.toLowerCase()) ?? "All";

  const [stories, updates] = await Promise.all([getStories({ tag, query }), getMarketUpdates()]);

  const filterLabel = query ? `Results for “${query}”` : tag ? `Stories tagged “${tag}”` : null;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Analysis and guides"
        description="Independent research on prices, cities and policy — and plain-English guides for every step of buying a home."
      />
      <Container as="section" className="pb-[5.5rem]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22.5rem]">
          <div className="flex flex-col gap-[1.125rem]">
            {filterLabel && (
              <p className="m-0 flex flex-wrap items-center gap-3 text-[0.9375rem] text-text">
                <strong className="font-semibold text-ink">{filterLabel}</strong>· {stories.length} found
                <Link href={routes.insights} className="text-sm font-semibold text-accent-strong">
                  Clear
                </Link>
              </p>
            )}
            <FilterableArticleList
              key={`${tag}-${query}`}
              articles={stories}
              topics={TOPICS}
              initialTopic={initialTopic}
              emptyMessage="No stories match. Try another topic or search."
            />
          </div>
          <aside aria-label="Market updates">
            <ArticleRail title="Market updates" articles={updates} />
          </aside>
        </div>
      </Container>
    </>
  );
}
