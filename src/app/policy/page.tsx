import type { Metadata } from "next";
import { TopicPage } from "@/components/articles/topic-page";

export const metadata: Metadata = {
  title: "Policy & RERA",
  description: "RERA, stamp duty, home-loan rates and tax rules, explained for buyers.",
};

export default function PolicyPage() {
  return (
    <TopicPage
      topic="Policy"
      eyebrow="Policy & RERA"
      title="The rules, explained"
      description="RERA, stamp duty, repo-rate moves and tax changes — what each one means for buyers and owners."
    />
  );
}
