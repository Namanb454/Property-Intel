"use client";

import { useMemo, useState } from "react";
import type { Article, ArticleTopicFilter } from "@/types";
import { PillGroup, type ChoiceOption } from "@/components/ui";
import { ArticleStack } from "./article-stack";

interface FilterableArticleListProps {
  articles: Article[];
  topics: ArticleTopicFilter[];
  /** Maximum cards shown for the selected topic. */
  limit?: number;
  initialTopic?: ArticleTopicFilter;
  emptyMessage?: string;
}

/** Story cards with a row of topic filter pills above them. */
export function FilterableArticleList({
  articles,
  topics,
  limit,
  initialTopic = "All",
  emptyMessage = "No stories in this topic yet.",
}: FilterableArticleListProps) {
  const [topic, setTopic] = useState<ArticleTopicFilter>(initialTopic);

  const visible = useMemo(() => {
    const matching = articles.filter((a) => topic === "All" || a.topic === topic);
    return limit ? matching.slice(0, limit) : matching;
  }, [articles, topic, limit]);

  const options: ChoiceOption<ArticleTopicFilter>[] = topics.map((t) => ({ value: t, label: t }));

  return (
    <>
      <PillGroup
        options={options}
        value={topic}
        onChange={setTopic}
        label="Filter stories by topic"
        className="mb-0.5"
      />
      <ArticleStack key={topic} articles={visible} label="Latest stories" />
      {visible.length === 0 && (
        <p className="rounded-panel border border-dashed border-line-strong px-6 py-10 text-center text-[0.9375rem] text-text-muted">
          {emptyMessage}
        </p>
      )}
    </>
  );
}
