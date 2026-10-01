import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

interface SectionHeadingProps {
  title: ReactNode;
  id?: string;
  action?: { label: string; href: string };
  className?: string;
}

/** Orange-square heading followed by a rule and an optional "view all" link. */
export function SectionHeading({ title, id, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <h2 id={id} className="m-0 flex items-center gap-2.5 whitespace-nowrap text-xl font-bold tracking-[-0.01em]">
        <span className="size-2.5 rounded-[0.1875rem] bg-accent" />
        {title}
      </h2>
      <span className="h-0.5 grow rounded-full bg-track" />
      {action && (
        <Link href={action.href} className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold">
          {action.label}
          <Icon name="arrow-right" size={14} strokeWidth={2.4} />
        </Link>
      )}
    </div>
  );
}

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  /** Use "h1" when the intro opens the page. */
  titleAs?: "h1" | "h2";
  description: ReactNode;
  /** Controls or calls to action shown under the description. */
  children?: ReactNode;
  tone?: "light" | "dark";
  asideWidth?: string;
  className?: string;
}

/** Editorial section opener: eyebrow + large serif title on the left, copy and controls on the right. */
export function SectionIntro({
  eyebrow,
  title,
  titleId,
  titleAs: Title = "h2",
  description,
  children,
  tone = "light",
  asideWidth = "max-w-[29.375rem]",
  className,
}: SectionIntroProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn("mb-9 grid grid-cols-[repeat(auto-fit,minmax(min(27.5rem,100%),1fr))] items-end gap-8", className)}
    >
      <div className="flex flex-col gap-3.5">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Title
          id={titleId}
          className={cn(
            "m-0 text-balance font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]",
            dark && "text-white",
          )}
        >
          {title}
        </Title>
      </div>
      <div className={cn("flex flex-col gap-5 lg:justify-self-end", asideWidth)}>
        <p className={cn("m-0 text-base leading-[1.6]", dark ? "text-band-text-soft" : "text-text")}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-bold uppercase tracking-[.14em]",
        tone === "dark" ? "text-accent-soft" : "text-accent-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small uppercase label used for rail blocks and panel titles. */
export function RailHeading({
  children,
  as: Tag = "h3",
  className,
}: {
  children: ReactNode;
  as?: "h3" | "h4";
  className?: string;
}) {
  return (
    <Tag className={cn("m-0 text-xs font-bold uppercase tracking-[.12em] text-text-soft", className)}>{children}</Tag>
  );
}
