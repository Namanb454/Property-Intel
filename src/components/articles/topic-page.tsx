import { getMarketUpdates, getStories } from "@/lib/services";
import type { ArticleTopic } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { StoryListWithRail } from "./story-list-with-rail";

interface TopicPageProps {
  topic: ArticleTopic;
  eyebrow: string;
  title: string;
  description: string;
}

/** A landing page for one editorial topic: header, its stories, and the market-updates rail. */
export async function TopicPage({ topic, eyebrow, title, description }: TopicPageProps) {
  const [stories, updates] = await Promise.all([getStories({ topic }), getMarketUpdates()]);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <StoryListWithRail articles={stories} railArticles={updates} emptyMessage="No stories in this topic yet." />
    </>
  );
}
