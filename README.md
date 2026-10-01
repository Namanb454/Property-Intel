# PropertyIntel

Real estate intelligence platform for India — market research, city scorecards, verified new-project listings and buyer tools.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. The homepage is a faithful build of the **Final Homepage 01** design in the **Mono + Orange** theme.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all content pages are statically generated)
npm run lint
```

## Project structure

```
src/
├── app/                    Routes (App Router)
│   ├── page.tsx            Homepage
│   ├── insights/           Story list (?topic, ?tag, ?q) and /insights/[slug]
│   ├── projects/           Project explorer (?stage, ?tier) and /projects/[slug]
│   ├── cities/             City index and /cities/[slug]
│   ├── market-trends/      where-to-invest/  where-to-live/  policy/  nri/
│   ├── tools/              Tools index and /tools/[slug] (EMI calculator is live)
│   ├── guides/  newsletter/
│   ├── [slug]/             Simple content pages (about, contact, privacy…) from config/pages.ts
│   └── sitemap.ts  robots.ts  not-found.tsx
├── components/
│   ├── ui/                 Design-system primitives: Button, Chip, Badge, PillGroup,
│   │                       SegmentedControl, SectionHeading, SectionIntro, Icon, Container
│   ├── layout/             Site chrome: UtilityBar, Masthead, PrimaryNav, SiteMenu, SearchDialog,
│   │                       SiteFooter, PageHeader
│   ├── articles/           ArticleCard, TopStories, FilterableArticleList, rail items, TopicPage
│   ├── projects/           ProjectCard, ProjectExplorer, NewProjectsBand, BuyingStages, badges
│   ├── market/             MarketPulse, CityScorecard, CityExplorer, CityRankingPage
│   ├── tools/  guides/  newsletter/  home/
├── config/                 site.ts (brand, edition), navigation.ts (routes + menus),
│                           projects.ts (stage/tier labels, status rules), pages.ts
├── data/                   Mock content — the only place content lives today
├── lib/
│   ├── services/           Async data access used by pages (swap for CMS/API here)
│   ├── actions/            Server actions (newsletter sign-up)
│   └── utils/              Formatting (₹, lakh/crore, dates), EMI maths, nav helpers
└── types/                  Domain types: Article, Project, City, MarketPulse, CityScore…
```

### Conventions

- **Pages only talk to `lib/services`.** Services are async so the mock data in `src/data` can be replaced with a CMS or API without touching components.
- **Server components by default.** Only interactive pieces are client components: filters (`FilterableArticleList`, `ProjectExplorer`), toggles (`CityScorecard`, `CityExplorer`), `EmiCalculator`, the nav (active state), menu/search dialogs and the newsletter form.
- **Routes come from `config/navigation.ts`** (`routes.project(slug)` etc.) — no hard-coded paths in components.
- **Colours are theme tokens.** Never hard-code hex values in components; add a token instead.
- **Sizes are in rem.** The root font size is 100% on phones and 87.5% from 721px up (`globals.css`), so one value scales the whole UI. Write new arbitrary sizes in rem (`text-[0.9375rem]`), not px.
- **Lists use `<Carousel>`** (`components/ui/carousel.tsx`): the normal grid/column on tablet and desktop, a swipeable scroll-snap carousel with dots on phones. Wrappers: `ProjectGrid`, `ArticleStack`, `ArticleRail`, `StatGrid`.
- **Images** are Unsplash photos, served and resized by Unsplash's CDN through the custom loader in `src/lib/image-loader.ts`. Each `ImageAsset` carries a `credit`, shown under large photos.

## Theme: Mono + Orange

Tokens are defined in `src/app/globals.css` under `@theme` and used as Tailwind classes (`bg-ink`, `text-accent-strong`, `rounded-card`…).

| Token | Value | Use |
| --- | --- | --- |
| `page` | `#FAFAF9` | Page background |
| `ink` | `#111111` | Headings, primary buttons |
| `text` | `#4D4D4D` | Body copy |
| `accent` | `#FF5A1F` | Orange highlights, rules, dots |
| `accent-tint` | `#FFF0E8` | Orange tint fills |
| `band` | `#111111` | Dark bands (utility bar, projects, footer) |
| `accent-strong` | `#C2410C` | Orange text on light backgrounds (AA contrast) |

Typography: **Newsreader** (serif display, optical sizing) and **Geist** (UI/body), loaded with `next/font`.

## Before launch

- Set the Property Intel in `src/config/site.ts` (currently `[Property Intel]`).
- Replace sample data in `src/data` (projects, scorecard values and price-per-sq-ft figures are placeholders; Q3 2026 sales are ANAROCK figures). Remove `sampleDataNotices` in `site.ts` when real data is connected.
- Connect the newsletter action in `src/lib/actions/newsletter.ts` to an email provider.
- Set `NEXT_PUBLIC_SITE_URL` so the sitemap uses absolute production URLs.
