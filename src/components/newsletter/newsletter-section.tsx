import { Container, Icon } from "@/components/ui";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterSection({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="newsletter" aria-labelledby="nl-h" className="border-t border-line bg-surface">
      <Container width="narrow" className="flex flex-col items-center gap-4 py-[clamp(3.5rem,7vw,5.5rem)] text-center">
        <span className="flex size-[3.25rem] items-center justify-center rounded-2xl bg-accent-tint text-accent-deep">
          <Icon name="mail" size={24} strokeWidth={1.8} />
        </span>
        <Heading
          id="nl-h"
          className="m-0 font-serif text-[clamp(2.125rem,3.8vw,3rem)] font-semibold tracking-[-0.025em]"
        >
          The Monday Market Brief
        </Heading>
        <p className="m-0 text-base leading-[1.6] text-text-soft">
          Price moves, new launches worth a look and policy changes — explained in five minutes, every Monday.
        </p>
        <NewsletterForm />
      </Container>
    </section>
  );
}
