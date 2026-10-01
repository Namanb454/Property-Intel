import { siteConfig } from "@/config/site";
import { getCityScores, getMarketUpdates, getStories } from "@/lib/services";
import type { ArticleTopic, CityLens } from "@/types";
import { StoryListWithRail } from "@/components/articles";
import { PageHeader } from "@/components/layout/page-header";
import { Container, SectionHeading } from "@/components/ui";
import { CityScorecard } from "./city-scorecard";

interface CityRankingPageProps {
  lens: CityLens;
  title: string;
  description: string;
  storiesTopic: ArticleTopic;
  storiesTitle: string;
}

/** Shared layout for "Where to invest" and "Where to live". */
export async function CityRankingPage({ lens, title, description, storiesTopic, storiesTitle }: CityRankingPageProps) {
  const [scores, stories, updates] = await Promise.all([
    getCityScores(),
    getStories({ topic: storiesTopic }),
    getMarketUpdates(),
  ]);

  return (
    <>
      <PageHeader eyebrow="City scorecard 2026" title={title} description={description} />
      <CityScorecard scores={scores} initialLens={lens} notice={siteConfig.sampleDataNotices.scorecard} />
      <Container className="pt-[clamp(3.5rem,7vw,5.5rem)]">
        <SectionHeading title={storiesTitle} className="mb-7" />
      </Container>
      <StoryListWithRail articles={stories} railArticles={updates} />
    </>
  );
}
