import { routes } from "@/config/navigation";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container as="section" className="flex flex-col items-start gap-5 py-[clamp(4.5rem,10vw,8.75rem)]">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="m-0 font-serif text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[.96] tracking-[-0.04em]">
        This page isn&apos;t on the market.
      </h1>
      <p className="m-0 max-w-[32.5rem] text-[1.0625rem] leading-[1.6] text-text">
        The link may be broken or the page may have moved. Try the latest insights or browse new projects.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <ButtonLink href={routes.home} icon="arrow-right">
          Back to home
        </ButtonLink>
        <ButtonLink href={routes.projects} variant="outline">
          Browse projects
        </ButtonLink>
      </div>
    </Container>
  );
}
