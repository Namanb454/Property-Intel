import { analysts, articles } from "@/data/articles";
import type { Analyst, Article, ArticleFormat, ArticleTopic } from "@/types";

/*
 * Content access for articles. Pages and components only talk to these
 * functions, so swapping the in-repo data for a CMS or API is a change here.
 */

const STORY_FORMATS: ArticleFormat[] = ["analysis", "guide"];
const UPDATE_FORMATS: ArticleFormat[] = ["report", "reference", "data"];

const byNewest = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);

export interface ArticleQuery {
  topic?: ArticleTopic;
  tag?: string;
  /** Free-text search over title, excerpt and tags. */
  query?: string;
  formats?: ArticleFormat[];
  limit?: number;
}

function matchesQuery(article: Article, query: string): boolean {
  const needle = query.toLowerCase();
  return [article.title, article.excerpt, ...article.tags].some((field) => field.toLowerCase().includes(needle));
}

export async function getArticles({ topic, tag, query, formats, limit }: ArticleQuery = {}): Promise<Article[]> {
  const result = articles
    .filter((a) => !topic || a.topic === topic)
    .filter((a) => !tag || a.tags.includes(tag))
    .filter((a) => !query || matchesQuery(a, query))
    .filter((a) => !formats || formats.includes(a.format))
    .sort(byNewest);
  return limit ? result.slice(0, limit) : result;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find((a) => a.slug === slug);
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return articles.map((a) => a.slug);
}

export async function getCoverStory(): Promise<Article> {
  const cover = articles.find((a) => a.placement === "cover");
  if (!cover) throw new Error("No cover story is set");
  return cover;
}

export async function getSecondaryStory(): Promise<Article | undefined> {
  return articles.find((a) => a.placement === "secondary");
}

/** Long-form stories (analysis and guides), newest first. */
export async function getStories(query: Omit<ArticleQuery, "formats"> = {}): Promise<Article[]> {
  return getArticles({ ...query, formats: STORY_FORMATS });
}

/** Long-form stories for "Latest insights", excluding those pinned to the homepage hero. */
export async function getLatestStories(): Promise<Article[]> {
  return articles.filter((a) => STORY_FORMATS.includes(a.format) && !a.placement).sort(byNewest);
}

/** Short-form reports and references for the "Market updates" rail. */
export async function getMarketUpdates(limit = 4): Promise<Article[]> {
  return getArticles({ formats: UPDATE_FORMATS, limit });
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  return articles
    .filter((a) => a.slug !== article.slug && a.topic === article.topic)
    .sort(byNewest)
    .slice(0, limit);
}

export async function getAnalysts(): Promise<Analyst[]> {
  return analysts;
}
