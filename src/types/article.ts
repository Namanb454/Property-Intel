import type { ImageAsset, ISODate } from "./common";

export const ARTICLE_TOPICS = ["Trends", "Investing", "Policy", "NRI", "Living", "Infrastructure"] as const;

export type ArticleTopic = (typeof ARTICLE_TOPICS)[number];

/** Topics offered as filters on story lists, plus the catch-all. */
export type ArticleTopicFilter = "All" | ArticleTopic;

/**
 * analysis / guide — long-form stories shown in "Latest insights".
 * report / reference / data — short updates shown in the "Market updates" rail.
 */
export type ArticleFormat = "analysis" | "guide" | "report" | "reference" | "data";

/** Where an article is pinned on the homepage, if anywhere. */
export type ArticlePlacement = "cover" | "secondary";

/** The editorial desk an article is bylined to. */
export interface Desk {
  id: string;
  name: string;
  initials: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  topic: ArticleTopic;
  format: ArticleFormat;
  desk: Desk;
  publishedAt: ISODate;
  readMinutes: number;
  image: ImageAsset;
  tags: string[];
  /** Short label used in compact lists, e.g. "Reference · Updated Oct". */
  kicker?: string;
  placement?: ArticlePlacement;
  /** Label overlaid on the cover image when the article is the cover story. */
  coverLabel?: string;
  /** Article body as paragraphs. Supplied by the CMS; absent for unpublished drafts. */
  body?: string[];
}

export interface Analyst {
  id: string;
  name: string;
  role: string;
  focus: string;
}
