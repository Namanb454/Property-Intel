import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Geist, Newsreader } from "next/font/google";
import { siteConfig } from "@/config/site";
import { getTicker } from "@/lib/services";
import { Masthead } from "@/components/layout/masthead";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { UtilityBar } from "@/components/layout/utility-bar";
import "./globals.css";

// latin-ext carries the rupee sign (₹).
const geist = Geist({
  subsets: ["latin", "latin-ext"],
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

/**
 * next/font's family string ends with a metric-adjusted Arial/Times fallback. The theme only
 * takes the primary family so glyphs the web font lacks (▲ ▼) fall through to the system UI
 * font — matching the design.
 */
function primaryFamily(font: { style: { fontFamily: string } }): string {
  return font.style.fontFamily.split(",")[0];
}

const fontVariables = {
  "--font-geist": primaryFamily(geist),
  "--font-newsreader": primaryFamily(newsreader),
} as CSSProperties;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const ticker = await getTicker();

  return (
    <html lang="en-IN" style={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <UtilityBar ticker={ticker} />
        <Masthead />
        <PrimaryNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
