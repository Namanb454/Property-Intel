import type { City, CityLens, CityMarketRow, CityScore, MarketFact, MarketPulse, Ticker } from "@/types";

export const cities: City[] = [
  { slug: "mumbai-mmr", name: "Mumbai MMR", state: "Maharashtra" },
  { slug: "navi-mumbai", name: "Navi Mumbai", state: "Maharashtra" },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka" },
  { slug: "pune", name: "Pune", state: "Maharashtra" },
  { slug: "delhi-ncr", name: "Delhi NCR", state: "Delhi" },
  { slug: "gurugram", name: "Gurugram", state: "Haryana" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal" },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
];

export const ticker: Ticker = {
  title: "Q3 home sales",
  items: [
    { label: "MMR", value: "31,750", changePct: 5 },
    { label: "Bengaluru", value: "16,670", changePct: 12 },
    { label: "Hyderabad", value: "12,970", changePct: 15 },
    { label: "Pune", value: "15,690", changePct: -6 },
    { label: "Delhi NCR", value: "13,765", changePct: -1 },
    { label: "Chennai", value: "5,395", changePct: -10 },
    { label: "Kolkata", value: "3,980", changePct: -4 },
  ],
};

export const marketPulse: MarketPulse = {
  period: "Q3 2026 (Jul–Sep)",
  scope: "top 7 cities",
  report: { label: "Read the Q3 report", href: "/market-trends" },
  stats: [
    {
      id: "homes-sold",
      label: "Homes sold",
      value: "1,00,220",
      badge: { label: "▲ 3% YoY", tone: "positive" },
      description: "Units sold across the top seven cities this quarter.",
    },
    {
      id: "new-launches",
      label: "New launches",
      value: "1,14,320",
      badge: { label: "▲ 18% YoY", tone: "positive" },
      description: "New supply outpaced sales for the quarter.",
    },
    {
      id: "average-prices",
      label: "Average prices",
      value: "+7%",
      badge: { label: "YoY", tone: "neutral" },
      description: "Year-on-year growth in average prices across the top seven cities.",
    },
    {
      id: "repo-rate",
      label: "RBI repo rate",
      value: "5.25%",
      badge: { label: "Held · Aug", tone: "neutral" },
      description: "Unchanged at the August 2026 policy review.",
    },
  ],
  sources: "Sources: ANAROCK Research (sales, launches, prices), Reserve Bank of India (repo rate).",
};

/** Sample scorecard values — connect research data before launch. */
export const cityScores: Record<CityLens, CityScore[]> = {
  invest: [
    {
      rank: 1,
      citySlug: "gurugram",
      cityName: "Gurugram",
      score: 86,
      hotspots: "Dwarka Expressway, Golf Course Ext. Road",
      metrics: [
        { label: "Price growth", value: "+14%" },
        { label: "Rental yield", value: "3.2%" },
      ],
    },
    {
      rank: 2,
      citySlug: "hyderabad",
      cityName: "Hyderabad",
      score: 82,
      hotspots: "Kokapet, Tellapur, Financial District",
      metrics: [
        { label: "Price growth", value: "+11%" },
        { label: "Rental yield", value: "3.6%" },
      ],
    },
    {
      rank: 3,
      citySlug: "navi-mumbai",
      cityName: "Navi Mumbai",
      score: 79,
      hotspots: "Ulwe, Panvel — the airport corridor",
      metrics: [
        { label: "Price growth", value: "+9%" },
        { label: "Rental yield", value: "3.4%" },
      ],
    },
    {
      rank: 4,
      citySlug: "pune",
      cityName: "Pune",
      score: 76,
      hotspots: "Hinjewadi, Wagholi, Kharadi",
      metrics: [
        { label: "Price growth", value: "+7%" },
        { label: "Rental yield", value: "3.9%" },
      ],
    },
  ],
  live: [
    {
      rank: 1,
      citySlug: "pune",
      cityName: "Pune",
      score: 88,
      hotspots: "Baner, Aundh, Kalyani Nagar",
      metrics: [
        { label: "Avg 2BHK rent", value: "₹28k / mo" },
        { label: "Commute score", value: "7.8 / 10" },
      ],
    },
    {
      rank: 2,
      citySlug: "chennai",
      cityName: "Chennai",
      score: 84,
      hotspots: "Adyar, Velachery, OMR",
      metrics: [
        { label: "Avg 2BHK rent", value: "₹24k / mo" },
        { label: "Commute score", value: "7.5 / 10" },
      ],
    },
    {
      rank: 3,
      citySlug: "bengaluru",
      cityName: "Bengaluru",
      score: 81,
      hotspots: "Whitefield, HSR Layout, Hebbal",
      metrics: [
        { label: "Avg 2BHK rent", value: "₹34k / mo" },
        { label: "Commute score", value: "6.2 / 10" },
      ],
    },
    {
      rank: 4,
      citySlug: "ahmedabad",
      cityName: "Ahmedabad",
      score: 78,
      hotspots: "SG Highway, Prahlad Nagar, GIFT City",
      metrics: [
        { label: "Avg 2BHK rent", value: "₹19k / mo" },
        { label: "Commute score", value: "8.1 / 10" },
      ],
    },
  ],
};

/** Q3 2026 sales are ANAROCK figures; price per sq ft values are samples. */
export const cityMarket: CityMarketRow[] = [
  {
    citySlug: "mumbai-mmr",
    cityName: "Mumbai MMR",
    sales: { value: 31750, yoyPct: 5 },
    pricePerSqft: { value: 16000, yoyPct: 6 },
  },
  {
    citySlug: "bengaluru",
    cityName: "Bengaluru",
    sales: { value: 16670, yoyPct: 12 },
    pricePerSqft: { value: 9000, yoyPct: 10 },
  },
  { citySlug: "pune", cityName: "Pune", sales: { value: 15690, yoyPct: -6 }, pricePerSqft: { value: 7800, yoyPct: 7 } },
  {
    citySlug: "delhi-ncr",
    cityName: "Delhi NCR",
    sales: { value: 13765, yoyPct: -1 },
    pricePerSqft: { value: 9500, yoyPct: 14 },
  },
  {
    citySlug: "hyderabad",
    cityName: "Hyderabad",
    sales: { value: 12970, yoyPct: 15 },
    pricePerSqft: { value: 8000, yoyPct: 9 },
  },
  {
    citySlug: "chennai",
    cityName: "Chennai",
    sales: { value: 5395, yoyPct: -10 },
    pricePerSqft: { value: 7300, yoyPct: 8 },
  },
  {
    citySlug: "kolkata",
    cityName: "Kolkata",
    sales: { value: 3980, yoyPct: -4 },
    pricePerSqft: { value: 6100, yoyPct: 5 },
  },
];

export const cityMarketNotes = {
  sales: { label: "Homes sold, Q3 2026", note: "Source: ANAROCK Research, Q3 2026 (Jul–Sep) vs Q3 2025." },
  price: {
    label: "Avg price / sq ft",
    note: "Sample figures for layout review. Connect your price data before launch.",
  },
} as const;

export const quarterFacts: MarketFact[] = [
  { value: "48%", text: "of all homes sold were in Mumbai MMR and Bengaluru." },
  { value: "+15%", text: "Hyderabad posted the fastest growth in sales of the seven cities.", tone: "positive" },
  {
    value: "4 of 7",
    text: "cities sold fewer homes than a year ago: Pune, Delhi NCR, Chennai and Kolkata.",
    tone: "negative",
  },
];
