import Link from "next/link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn, formatDate } from "@/lib/utils";
import type { Ticker } from "@/types";
import { Container, Icon } from "@/components/ui";
import { TickerMarquee } from "./ticker-marquee";

/**
 * Black strip above the masthead. Three columns — edition date, the scrolling sales ticker
 * (centred on the page), sign-in and socials. Phones drop the date and the ticker label.
 */
export function UtilityBar({ ticker }: { ticker: Ticker }) {
  return (
    <div className="bg-band text-[0.8125rem] text-chrome">
      <Container className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 whitespace-nowrap py-2.5 sm:grid-cols-[1fr_minmax(0,40rem)_1fr]">
        <span className="font-semibold text-white max-sm:hidden">{formatDate(siteConfig.edition.date, "weekday")}</span>

        <div className="flex min-w-0 items-center justify-center gap-3">
          <span className="flex shrink-0 items-center gap-2 font-semibold text-accent-soft max-sm:hidden">
            <span className="size-[0.4375rem] rounded-full bg-accent-soft" />
            {ticker.title}
          </span>
          <TickerMarquee items={ticker.items} label={ticker.title} />
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <Link href={routes.signIn} className="px-2.5 font-medium text-chrome-strong">
            Sign in
          </Link>
          {siteConfig.social.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex size-8 items-center justify-center text-chrome",
                social.platform !== "instagram" && "max-sm:hidden",
              )}
            >
              <Icon name={social.platform} size={social.platform === "youtube" ? 17 : 16} />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
