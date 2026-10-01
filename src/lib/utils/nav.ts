import type { NavItem } from "@/types";

function matches(pathname: string, prefix: string): boolean {
  if (prefix === "/") return pathname === "/";
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Whether a nav item represents the page at `pathname`. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const prefixes = item.activePaths ?? [item.href.split("?")[0]];
  return prefixes.some((prefix) => matches(pathname, prefix));
}
