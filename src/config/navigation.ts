import type { FooterColumn, LinkItem, NavItem } from "@/types";

export const routes = {
  home: "/",
  insights: "/insights",
  article: (slug: string) => `/insights/${slug}`,
  marketTrends: "/market-trends",
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  whereToInvest: "/where-to-invest",
  whereToLive: "/where-to-live",
  cities: "/cities",
  city: (slug: string) => `/cities/${slug}`,
  policy: "/policy",
  nri: "/nri",
  tools: "/tools",
  tool: (slug: string) => `/tools/${slug}`,
  guides: "/guides",
  newsletter: "/newsletter",
  signIn: "/sign-in",
  page: (slug: string) => `/${slug}`,
} as const;

/** Section links beside the menu button in the masthead. */
export const mastheadNav: NavItem[] = [
  { label: "News", href: routes.insights, activePaths: [routes.home, routes.insights] },
  { label: "Research", href: routes.marketTrends },
  { label: "Projects", href: routes.projects },
];

/** The sticky primary navigation. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Market Trends", href: routes.marketTrends },
  { label: "New Projects", href: routes.projects, badge: "New" },
  { label: "Where to Invest", href: routes.whereToInvest },
  { label: "Where to Live", href: routes.whereToLive },
  { label: "City Guides", href: routes.cities },
  { label: "Policy & RERA", href: routes.policy },
  { label: "NRI", href: routes.nri },
  { label: "Tools", href: routes.tools },
];

export const footerNav: FooterColumn[] = [
  {
    title: "Projects",
    links: [
      { label: "Pre-launch", href: `${routes.projects}?stage=pre-launch` },
      { label: "New launch", href: `${routes.projects}?stage=new-launch` },
      { label: "RERA registered", href: `${routes.projects}?stage=rera-registered` },
      { label: "Luxury homes", href: `${routes.projects}?tier=luxury` },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Market trends", href: routes.marketTrends },
      { label: "City guides", href: routes.cities },
      { label: "Where to invest", href: routes.whereToInvest },
      { label: "Where to live", href: routes.whereToLive },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Buyer guides", href: routes.guides },
      { label: "RERA explained", href: routes.policy },
      { label: "NRI corner", href: routes.nri },
      { label: "Glossary", href: routes.page("glossary") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: routes.page("about") },
      { label: "Methodology", href: routes.page("methodology") },
      { label: "List a project", href: routes.page("list-a-project") },
      { label: "Contact", href: routes.page("contact") },
    ],
  },
];

export const legalNav: LinkItem[] = [
  { label: "Privacy", href: routes.page("privacy") },
  { label: "Terms", href: routes.page("terms") },
  { label: "Editorial policy", href: routes.page("editorial-policy") },
];
