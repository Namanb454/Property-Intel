import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { stageMeta } from "@/config/projects";
import { cn, formatINRShort } from "@/lib/utils";
import type { Project } from "@/types";

/** Compact project row for side rails. */
export function ProjectListItem({ project, last }: { project: Project; last?: boolean }) {
  const registered = project.stage === "rera-registered";
  return (
    <Link
      href={routes.project(project.slug)}
      className={cn(
        "uline flex items-center gap-3.5 py-3 max-sm:h-full max-sm:rounded-tile max-sm:border max-sm:border-line-soft max-sm:px-3",
        !last && "border-b border-line-soft",
      )}
    >
      <span
        className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-tile"
        style={{ background: project.image.placeholderColor }}
      >
        <Image src={project.image.src} alt="" fill sizes="76px" className="object-cover" />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span
          className={cn(
            "flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[.06em]",
            registered ? "text-positive" : "text-ink",
          )}
        >
          <span className={cn("size-1.5 rounded-full", registered ? "bg-positive" : "bg-accent")} />
          {stageMeta[project.stage].label}
        </span>
        <span className="t text-[0.9375rem] font-semibold">{project.name}</span>
        <span className="text-[0.8125rem] text-text-muted">
          {project.locality}, {project.city} · {formatINRShort(project.priceFrom)}+
        </span>
      </span>
    </Link>
  );
}
