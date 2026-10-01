import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInfoPage, infoPages } from "@/config/pages";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui";

export function generateStaticParams() {
  return infoPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const page = getInfoPage((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function InfoPage({ params }: PageProps<"/[slug]">) {
  const page = getInfoPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <Container as="section" className="pb-[5.5rem]">
        <div className="flex max-w-[42.5rem] flex-col gap-5 text-[1.0625rem] leading-[1.75] text-text-strong">
          {page.body?.length ? (
            page.body.map((paragraph, i) => (
              <p key={i} className="m-0">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="m-0 rounded-card border border-dashed border-line-strong px-6 py-8 text-center text-[0.9375rem] leading-[1.6] text-text-muted">
              This page is being written.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
