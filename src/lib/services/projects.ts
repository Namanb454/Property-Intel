import { matchesProjectFilters } from "@/config/projects";
import { projects } from "@/data/projects";
import type { Project, ProjectFilters } from "@/types";

export async function getProjects(filters?: Partial<ProjectFilters>): Promise<Project[]> {
  if (!filters) return projects;
  const resolved: ProjectFilters = { stage: filters.stage ?? "all", tier: filters.tier ?? "all" };
  return projects.filter((p) => matchesProjectFilters(p, resolved));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return projects.map((p) => p.slug);
}

export async function getTrendingProjects(limit = 3): Promise<Project[]> {
  return projects
    .filter((p) => p.trendingRank !== undefined)
    .sort((a, b) => a.trendingRank! - b.trendingRank!)
    .slice(0, limit);
}

export async function getProjectsByCity(citySlug: string): Promise<Project[]> {
  return projects.filter((p) => p.citySlug === citySlug);
}
