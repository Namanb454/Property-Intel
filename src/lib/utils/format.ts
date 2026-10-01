import type { ISODate } from "@/types";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Groups digits the Indian way: 100220 → "1,00,220". */
export function formatIndianNumber(value: number): string {
  return Math.round(value).toLocaleString("en-IN");
}

/** 4375 → "₹4,375". */
export function formatINR(value: number): string {
  return `₹${formatIndianNumber(value)}`;
}

/** Compact rupees in lakh / crore: 14500000 → "₹1.45 Cr", 4200000 → "₹42 L". */
export function formatINRShort(value: number): string {
  if (value >= 10_000_000) {
    return `₹${(value / 10_000_000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }
  return `₹${(value / 100_000).toFixed(1).replace(/\.0$/, "")} L`;
}

/** 5 → "▲ 5%", -6 → "▼ 6%". */
export function formatChange(pct: number): string {
  return `${pct >= 0 ? "▲" : "▼"} ${Math.abs(pct)}%`;
}

type DateStyle = "short" | "medium" | "long" | "weekday";

/**
 * Formats an ISO date without depending on the runtime's locale data, so the
 * server and browser always render the same string.
 *
 * short: "1 Oct" · medium: "1 Oct 2026" · long: "1 October 2026" · weekday: "Thu, 1 Oct 2026"
 */
export function formatDate(iso: ISODate, style: DateStyle = "medium"): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  switch (style) {
    case "short":
      return `${day} ${MONTHS_SHORT[month]}`;
    case "long":
      return `${day} ${MONTHS_LONG[month]} ${year}`;
    case "weekday":
      return `${WEEKDAYS_SHORT[date.getUTCDay()]}, ${day} ${MONTHS_SHORT[month]} ${year}`;
    default:
      return `${day} ${MONTHS_SHORT[month]} ${year}`;
  }
}
