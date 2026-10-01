import Link from "next/link";
import { footerNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export function SiteFooter() {
  const year = formatDate(siteConfig.edition.date).slice(-4);
  return (
    <footer className="bg-band text-chrome">
      <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(10.625rem,100%),1fr))] gap-8 pb-8 pt-16">
        <div className="flex flex-col gap-3.5 sm:col-span-2">
          <span className="font-serif text-[1.75rem] font-semibold tracking-[-0.02em] text-white">
            {siteConfig.name}
          </span>
          <span className="max-w-[20rem] text-sm leading-[1.6] text-footer-muted">{siteConfig.description}</span>
        </div>
        {footerNav.map((column) => (
          <div key={column.title} className="flex flex-col gap-[0.6875rem]">
            <span className="text-[0.6875rem] font-bold uppercase tracking-[.12em] text-white">{column.title}</span>
            {column.links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container-page flex flex-wrap justify-between gap-4 border-t border-band-rule pb-8 pt-5 text-[0.8125rem] text-footer-muted">
        <span>
          © {year} {siteConfig.name}. All rights reserved.
        </span>
        <span className="flex gap-[1.125rem]">
          {legalNav.map((link) => (
            <Link key={link.href} href={link.href} className="text-footer-muted">
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
