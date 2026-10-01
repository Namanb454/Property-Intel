import type { Metadata } from "next";
import { getTools } from "@/lib/services";
import { PageHeader } from "@/components/layout/page-header";
import { EmiCalculator, ToolGrid } from "@/components/tools";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools",
  description: "EMI, affordability, rent-vs-buy and rental-yield calculators for home buyers.",
};

export default async function ToolsPage() {
  const tools = await getTools();
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Calculators for buyers"
        description="Work out your EMI, how much home you can afford, and when buying beats renting."
      />
      <Container as="section" aria-labelledby="emi-h" className="pb-16">
        <SectionHeading id="emi-h" title="EMI calculator" className="mb-7" />
        <EmiCalculator variant="full" />
      </Container>
      <Container as="section" aria-labelledby="all-tools-h" className="pb-[5.5rem]">
        <SectionHeading id="all-tools-h" title="All tools" className="mb-7" />
        <ToolGrid tools={tools} />
      </Container>
    </>
  );
}
