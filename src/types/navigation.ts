import type { LinkItem } from "./common";

export interface NavItem extends LinkItem {
  /** Small label shown beside the item, e.g. "New". */
  badge?: string;
  /** Path prefixes that mark this item as current. Defaults to the item's own href. */
  activePaths?: string[];
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

export type SocialPlatform = "instagram" | "youtube" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}
