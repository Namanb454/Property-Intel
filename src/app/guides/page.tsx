import type { Metadata } from "next";
import { getBuyerGuideSteps, getBuyingStageGuides } from "@/lib/services";
import { GuideSteps } from "@/components/guides/guide-steps";
import { PageHeader } from "@/components/layout/page-header";
import { BuyingStages } from "@/components/projects";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Buyer guides",
  description: "A step-by-step guide to buying your first home in India, and how buying works at each project stage.",
};

export default async function GuidesPage() {
  const [steps, stageGuides] = await Promise.all([getBuyerGuideSteps(), getBuyingStageGuides()]);
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="First-time buyer guides"
        description="From setting a budget to taking possession — the five steps of buying a home, and what changes at each project stage."
      />
      <Container as="section" aria-labelledby="steps-h" className="pb-[5.5rem]">
        <SectionHeading id="steps-h" title="Five steps to your first home" className="mb-7" />
        <GuideSteps steps={steps} />
      </Container>
      <section aria-label="How buying works" className="bg-band text-band-text">
        <Container className="pb-[clamp(3.5rem,7vw,5.5rem)] pt-1">
          <BuyingStages guides={stageGuides} />
        </Container>
      </section>
    </>
  );
}
