import type { GuideStep, ToolLink } from "@/types";
import { GuideSteps } from "@/components/guides/guide-steps";
import { ToolGrid } from "@/components/tools";
import { Container, SectionHeading } from "@/components/ui";

/** "First-time buyer guides" steps followed by calculator shortcuts. */
export function BuyerGuides({ steps, tools }: { steps: GuideStep[]; tools: ToolLink[] }) {
  return (
    <Container as="section" id="tools" aria-labelledby="guides-h" className="scroll-mt-16 pb-[5.5rem] pt-4">
      <SectionHeading id="guides-h" title="First-time buyer guides" className="mb-7" />
      <GuideSteps steps={steps} className="mb-5" />
      <ToolGrid tools={tools} />
    </Container>
  );
}
