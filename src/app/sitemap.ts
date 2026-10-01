import type { MetadataRoute } from "next";
import { primaryNav, routes } from "@/config/navigation";
import { infoPages } from "@/config/pages";
import { getAllArticleSlugs, getAllProjectSlugs, getCities, getTools } from "@/lib/services";

/** Set NEXT_PUBLIC_SITE_URL in production so sitemap URLs are absolute. */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects, cities, tools] = await Promise.all([
    getAllArticleSlugs(),
    getAllProjectSlugs(),
    getCities(),
    getTools(),
  ]);

  const paths = [
    ...primaryNav.map((item) => item.href),
    routes.insights,
    routes.guides,
    routes.newsletter,
    ...articles.map(routes.article),
    ...projects.map(routes.project),
    ...cities.map((c) => routes.city(c.slug)),
    ...tools.map((t) => routes.tool(t.slug)),
    ...infoPages.map((p) => routes.page(p.slug)),
  ];

  return [...new Set(paths)].map((path) => ({ url: `${BASE_URL}${path}` }));
}
