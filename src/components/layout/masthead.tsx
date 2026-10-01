import Link from "next/link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui";
import { MastheadNav } from "./masthead-nav";
import { SearchDialog } from "./search-dialog";
import { SiteMenu } from "./site-menu";

export function Masthead() {
  return (
    <header className="bg-surface">
      <div className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-4 pb-[1.125rem] pt-5">
        <div className="flex items-center gap-[1.125rem]">
          <SiteMenu />
          <MastheadNav />
        </div>
        <Link href={routes.home} className="flex flex-col items-center gap-1 text-center">
          <span className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.025em]">
            {siteConfig.name}
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[.2em] text-text-muted max-sm:hidden">
            {siteConfig.tagline}
          </span>
        </Link>
        <div className="flex items-center justify-end gap-2.5">
          <SearchDialog />
          <ButtonLink href={routes.newsletter} icon="arrow-right" className="max-sm:hidden">
            Subscribe
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
