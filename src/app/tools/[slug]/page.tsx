import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { routes } from "@/config/navigation";
import { getToolBySlug, getTools } from "@/lib/services";
import { PageHeader } from "@/components/layout/page-header";
import { EmiCalculator, ToolGrid } from "@/components/tools";
import { Container, SectionHeading } from "@/components/ui";

/** Tools with a working calculator. The rest render an "in development" notice. */
const CALCULATORS: Record<string, () => ReactNode> = {
  "emi-calculator": () => <EmiCalculator variant="full" />,
};

export async function generateStaticParams() {
  return (await getTools()).map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const tool = await getToolBySlug((await params).slug);
  if (!tool) return {};
  return { title: tool.title, description: tool.description };
}

export default async function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  const { slug } = await params;
  const [tool, tools] = await Promise.all([getToolBySlug(slug), getTools()]);
  if (!tool) notFound();

  const Calculator = CALCULATORS[slug];
  const others = tools.filter((t) => t.slug !== slug);

  return (
    <>
      <PageHeader
        back={{ label: "All tools", href: routes.tools }}
        eyebrow="Tools"
        title={tool.title}
        description={tool.description}
      />
      <Container as="section" aria-label={tool.title} className="pb-16">
        {Calculator ? (
          <Calculator />
        ) : (
          <p className="m-0 rounded-panel border border-dashed border-line-strong px-6 py-12 text-center text-[0.9375rem] text-text-muted">
            This calculator is in development.
          </p>
        )}
      </Container>
      <Container as="section" aria-labelledby="more-tools-h" className="pb-[5.5rem]">
        <SectionHeading id="more-tools-h" title="More tools" className="mb-7" />
        <ToolGrid tools={others} />
      </Container>
    </>
  );
}
