import Link from "next/link";
import { routes } from "@/config/navigation";
import type { ToolLink } from "@/types";
import { Carousel, Icon } from "@/components/ui";

/** Grid of calculator shortcuts. */
export function ToolGrid({ tools }: { tools: ToolLink[] }) {
  return (
    <Carousel
      label="Tools"
      itemWidth="max-sm:w-[80%]"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(16.25rem,100%),1fr))] gap-3"
    >
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={routes.tool(tool.slug)}
          className="uline lift flex items-center gap-3.5 rounded-media border border-line-card bg-surface px-[1.375rem] py-5"
        >
          <span className="flex size-[2.875rem] shrink-0 items-center justify-center rounded-control bg-fill text-text-strong">
            <Icon name={tool.icon} size={20} strokeWidth={1.8} />
          </span>
          <span className="flex flex-col gap-[0.1875rem]">
            <span className="t text-[0.9375rem] font-bold">{tool.title}</span>
            <span className="text-[0.8125rem] text-text-muted">{tool.description}</span>
          </span>
        </Link>
      ))}
    </Carousel>
  );
}
