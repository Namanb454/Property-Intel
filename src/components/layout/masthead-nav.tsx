"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mastheadNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/utils/nav";

export function MastheadNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Sections"
      className="flex gap-[1.375rem] text-xs font-bold uppercase tracking-[.1em] max-md:hidden"
    >
      {mastheadNav.map((item) => {
        const active = isNavItemActive(item, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn("py-1.5", active ? "border-b-2 border-ink" : "text-text-soft")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
