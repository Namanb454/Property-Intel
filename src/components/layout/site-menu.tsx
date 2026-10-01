"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { footerNav, primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/utils/nav";
import { IconButton } from "@/components/ui";

/** Menu button that opens a full-height navigation drawer. */
export function SiteMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the drawer after navigating.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <IconButton icon="menu" label="Open menu" iconSize={20} onClick={() => dialogRef.current?.showModal()} />
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-0 h-dvh max-h-none w-[min(22.5rem,100vw)] max-w-none bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col gap-8 overflow-y-auto p-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl font-semibold tracking-[-0.025em]">{siteConfig.name}</span>
            <IconButton icon="close" label="Close menu" onClick={() => dialogRef.current?.close()} />
          </div>
          <nav aria-label="Menu" className="flex flex-col gap-1">
            {primaryNav.map((item) => {
              const active = isNavItemActive(item, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[0.625rem] px-3 py-3 text-base",
                    active ? "bg-ink font-semibold text-white hover:text-white" : "font-medium text-text-strong",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="grid grid-cols-2 gap-6 border-t border-line pt-6">
            {footerNav.map((column) => (
              <div key={column.title} className="flex flex-col gap-2.5">
                <span className="text-[0.6875rem] font-bold uppercase tracking-[.12em] text-text-soft">
                  {column.title}
                </span>
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-text">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
