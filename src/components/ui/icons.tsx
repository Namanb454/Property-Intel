import type { ReactNode, SVGProps } from "react";

/** Stroke icons drawn on a 24×24 grid. */
const ICONS = {
  "arrow-right": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </>
  ),
  "arrow-down": (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </>
  ),
  "arrow-up-right": (
    <>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </>
  ),
  menu: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </>
  ),
  close: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10 9 15 12 10 15" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="8" y1="10" x2="8" y2="16" />
      <line x1="8" y1="7" x2="8" y2="7" />
      <path d="M12 16v-6M12 13a3 3 0 0 1 6 0v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
  sparkle: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
  ),
  "shield-check": (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <polyline points="8.5 12 11 14.5 15.5 9.5" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  calculator: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="12" x2="9" y2="12" />
      <line x1="12" y1="12" x2="12" y2="12" />
      <line x1="15" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="9" y2="16" />
      <line x1="12" y1="16" x2="12" y2="16" />
      <line x1="15" y1="16" x2="15" y2="16" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </>
  ),
  swap: (
    <>
      <polyline points="7 4 3 8 7 12" />
      <line x1="3" y1="8" x2="16" y2="8" />
      <polyline points="17 12 21 16 17 20" />
      <line x1="21" y1="16" x2="8" y2="16" />
    </>
  ),
  rupee: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3 6 1.7 6 4.7 0 1.3-1.3 2.5-3 2.5s-3-1.1-3-2.5" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

/** Size in design pixels, rendered in rem so icons scale with the type. */
const toRem = (px: number) => `${px / 16}rem`;

/** Decorative by default; pass `aria-label` and `aria-hidden={false}` for a meaningful icon. */
export function Icon({ name, size = 16, strokeWidth = 2, style, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: toRem(size), height: toRem(size), flexShrink: 0, ...style }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {ICONS[name]}
    </svg>
  );
}

/** Solid play triangle used on media buttons. */
export function PlayIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: toRem(size), height: toRem(size) }}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <polygon points="7 4 20 12 7 20" />
    </svg>
  );
}
