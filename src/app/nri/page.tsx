import type { Metadata } from "next";
import { TopicPage } from "@/components/articles/topic-page";

export const metadata: Metadata = {
  title: "NRI corner",
  description: "Buying property in India from abroad: taxes, repatriation and paperwork.",
};

export default function NriPage() {
  return (
    <TopicPage
      topic="NRI"
      eyebrow="NRI corner"
      title="Buying in India from abroad"
      description="Power of attorney, NRE and NRO accounts, TDS and repatriation — plain-language guides for non-resident buyers."
    />
  );
}
