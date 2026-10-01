"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/utils/nav";
import { Container } from "@/components/ui";

/** Sticky pill navigation under the masthead. */
export function PrimaryNav() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-20 border-y border-t-line-soft border-b-line bg-surface/92 backdrop-blur-[0.625rem]">
      <Container className="flex justify-center py-2.5">
        <nav
          aria-label="Primary"
          className="noscroll flex max-w-full gap-0.5 overflow-x-auto rounded-tile border border-line bg-fill-input p-1"
        >
          {primaryNav.map((item) => {
            const active = isNavItemActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-[0.625rem] px-4 py-3 text-sm",
                  active ? "bg-ink font-semibold text-white hover:text-white" : "font-medium text-text-strong",
                )}
              >
                {item.label}
                {item.badge && (
                  <span className="rounded-md bg-accent-tint px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[.06em] text-accent-deep">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
