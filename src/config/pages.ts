/**
 * Simple content pages served by app/[slug]. Each renders a header and its body;
 * pages without a body show a placeholder until their copy is written.
 */
export interface InfoPage {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  body?: string[];
}

export const infoPages: InfoPage[] = [
  {
    slug: "about",
    eyebrow: "Company",
    title: "About us",
    description: "Independent research and verified project listings for India's housing market.",
  },
  {
    slug: "methodology",
    eyebrow: "Company",
    title: "Methodology",
    description: "How we collect market data, score cities and verify every project we list.",
  },
  {
    slug: "list-a-project",
    eyebrow: "Company",
    title: "List a project",
    description: "Developers can submit RERA-registered and upcoming projects for verification.",
  },
  {
    slug: "contact",
    eyebrow: "Company",
    title: "Contact",
    description: "Questions about a project, a story or our data — get in touch with the team.",
  },
  {
    slug: "glossary",
    eyebrow: "Learn",
    title: "Glossary",
    description: "Carpet area, ready reckoner, OC, CC and every other term you'll meet when buying a home.",
  },
  {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy policy",
    description: "How we collect, use and protect your data.",
  },
  {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of use",
    description: "The terms that apply when you use this site.",
  },
  {
    slug: "editorial-policy",
    eyebrow: "Legal",
    title: "Editorial policy",
    description: "How we keep our research independent, accurate and clearly separated from listings.",
  },
  {
    slug: "podcast",
    eyebrow: "Podcast",
    title: "The market podcast",
    description: "This week's market, explained in under 20 minutes.",
  },
  {
    slug: "sign-in",
    eyebrow: "Account",
    title: "Sign in",
    description: "Save projects, follow cities and manage your newsletter preferences.",
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}
