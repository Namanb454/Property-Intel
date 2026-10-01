import type { Metadata } from "next";
import { CityRankingPage } from "@/components/market/city-ranking-page";

export const metadata: Metadata = {
  title: "Where to invest",
  description: "India's cities ranked for investors on price growth and rental yield.",
};

export default function WhereToInvestPage() {
  return (
    <CityRankingPage
      lens="invest"
      title="Where to invest"
      description="Cities ranked on price growth and rental yield, with the micro-markets driving each score."
      storiesTopic="Investing"
      storiesTitle="Investing analysis"
    />
  );
}
