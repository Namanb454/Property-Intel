"use client";

import { useMemo, useState } from "react";
import { matchesProjectFilters, stageFilterOptions, tierFilterOptions } from "@/config/projects";
import type { Project, ProjectFilters } from "@/types";
import { PillGroup, SegmentedControl } from "@/components/ui";
import { ProjectGrid } from "./project-grid";

interface ProjectExplorerProps {
  projects: Project[];
  initialFilters?: Partial<ProjectFilters>;
}

/** Stage and budget filters over a grid of project cards. Sits on the dark band. */
export function ProjectExplorer({ projects, initialFilters }: ProjectExplorerProps) {
  const [filters, setFilters] = useState<ProjectFilters>({
    stage: initialFilters?.stage ?? "all",
    tier: initialFilters?.tier ?? "all",
  });

  const visible = useMemo(() => projects.filter((p) => matchesProjectFilters(p, filters)), [projects, filters]);

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-band-rule pb-6">
        <SegmentedControl
          tone="dark"
          label="Project stage"
          options={stageFilterOptions}
          value={filters.stage}
          onChange={(stage) => setFilters((f) => ({ ...f, stage }))}
        />
        <PillGroup
          tone="dark"
          label="Budget"
          options={tierFilterOptions}
          value={filters.tier}
          onChange={(tier) => setFilters((f) => ({ ...f, tier }))}
        />
      </div>
      <p aria-live="polite" className="-mt-2.5 mb-5 text-[0.8125rem] text-band-text-muted">
        Showing {visible.length} of {projects.length} sample projects
      </p>

      <ProjectGrid key={`${filters.stage}-${filters.tier}`} projects={visible} tone="dark" />

      {visible.length === 0 && (
        <div className="rounded-panel border border-dashed border-band-border px-6 py-10 text-center text-[0.9375rem] text-band-text-soft">
          No sample projects match this stage and budget. Try another combination.
        </div>
      )}
    </>
  );
}
