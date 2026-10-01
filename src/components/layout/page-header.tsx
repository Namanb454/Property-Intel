import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Link back to the parent page, shown above the eyebrow. */
  back?: { label: string; href: string };
  children?: ReactNode;
  className?: string;
}

/** Title block for inner pages, in the same editorial style as the homepage intro. */
export function PageHeader({ eyebrow, title, description, back, children, className }: PageHeaderProps) {
  return (
    <section className={cn("container-page pb-10 pt-[clamp(2.5rem,6vw,4.5rem)]", className)}>
      <div className="flex max-w-[53.75rem] flex-col gap-[1.125rem]">
        {back && (
          <Link href={back.href} className="text-sm font-semibold text-text-soft">
            ← {back.label}
          </Link>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="m-0 text-balance font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[.98] tracking-[-0.035em]">
          {title}
        </h1>
        <div aria-hidden="true" className="flex w-[min(100%,35rem)] gap-1.5">
          <span className="h-1.5 w-24 rounded-full bg-accent" />
          <span className="h-1.5 grow rounded-full bg-track" />
        </div>
        {description && <p className="m-0 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-text">{description}</p>}
        {children}
      </div>
    </section>
  );
}
