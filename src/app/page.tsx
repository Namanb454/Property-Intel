import { siteConfig } from "@/config/site";
import {
  getAnalysts,
  getBuyerGuideSteps,
  getBuyingStageGuides,
  getCityMarket,
  getCityMarketNotes,
  getCityScores,
  getCoverStory,
  getLatestStories,
  getMarketPulse,
  getMarketUpdates,
  getProjects,
  getQuarterFacts,
  getSecondaryStory,
  getTools,
  getTrendingProjects,
} from "@/lib/services";
import { TopStories } from "@/components/articles";
import { BuyerGuides, HomeIntro, HomeRail, LatestInsights } from "@/components/home";
import { CityExplorer, CityScorecard, MarketPulse } from "@/components/market";
import { NewsletterSection } from "@/components/newsletter/newsletter-section";
import { NewProjectsBand } from "@/components/projects";

export default async function HomePage() {
  const [
    cover,
    secondary,
    latest,
    marketUpdates,
    trendingProjects,
    analysts,
    pulse,
    cityScores,
    cityMarket,
    quarterFacts,
    cityMarketNotes,
    projects,
    buyingGuides,
    guideSteps,
    tools,
  ] = await Promise.all([
    getCoverStory(),
    getSecondaryStory(),
    getLatestStories(),
    getMarketUpdates(),
    getTrendingProjects(),
    getAnalysts(),
    getMarketPulse(),
    getCityScores(),
    getCityMarket(),
    getQuarterFacts(),
    getCityMarketNotes(),
    getProjects(),
    getBuyingStageGuides(),
    getBuyerGuideSteps(),
    getTools(),
  ]);

  return (
    <>
      <HomeIntro />
      <TopStories cover={cover} secondary={secondary} />
      <MarketPulse id="trends" pulse={pulse} />
      <LatestInsights
        articles={latest}
        rail={<HomeRail marketUpdates={marketUpdates} trendingProjects={trendingProjects} analysts={analysts} />}
      />
      <CityScorecard id="where" scores={cityScores} notice={siteConfig.sampleDataNotices.scorecard} />
      <NewProjectsBand projects={projects} buyingGuides={buyingGuides} />
      <CityExplorer id="cities" rows={cityMarket} facts={quarterFacts} notes={cityMarketNotes} />
      <BuyerGuides steps={guideSteps} tools={tools} />
      <NewsletterSection />
    </>
  );
}
