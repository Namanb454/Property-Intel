import type { Metadata } from "next";
import { CityRankingPage } from "@/components/market/city-ranking-page";

export const metadata: Metadata = {
  title: "Where to live",
  description: "India's cities ranked for families on commute, rent, schools and clean air.",
};

export default function WhereToLivePage() {
  return (
    <CityRankingPage
      lens="live"
      title="Where to live"
      description="Cities ranked on commute, rent, schools and clean air — the things that matter once you've moved in."
      storiesTopic="Living"
      storiesTitle="Living guides"
    />
  );
}
