import type { SocialLink } from "@/types";

export const siteConfig = {
  /** Replace with the final Property Intel — it is used in the masthead, footer and metadata. */
  name: "[Property Intel]",
  tagline: "Real estate intelligence for India",
  description:
    "Independent research and verified project listings for India's housing market. Information only — not investment advice.",
  /** The current weekly edition shown in the utility bar and page title. */
  edition: {
    date: "2026-10-01",
    podcast: { href: "/podcast", durationMinutes: 18 },
  },
  /** Shown while listings and scores are placeholder data. Set to null once real data is connected. */
  sampleDataNotices: {
    scorecard: "Scores and metrics are sample values for layout review. Connect your research data before launch.",
    projects:
      "Project names, prices and dates shown are sample listings for layout review. Information only — not legal or investment advice.",
  },
  social: [
    { platform: "instagram", label: "Instagram", href: "https://instagram.com" },
    { platform: "youtube", label: "YouTube", href: "https://youtube.com" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  ] satisfies SocialLink[],
} as const;
