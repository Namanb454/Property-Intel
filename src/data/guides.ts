import type { BuyingStageGuide, GuideStep, ToolLink } from "@/types";

export const buyerGuideSteps: GuideStep[] = [
  {
    step: 1,
    slug: "set-a-budget",
    title: "Set a realistic budget",
    description: "Down payment, EMI comfort and hidden costs like stamp duty.",
  },
  {
    step: 2,
    slug: "shortlist-the-locality",
    title: "Shortlist the locality",
    description: "Commute, schools, water supply and upcoming infrastructure.",
  },
  {
    step: 3,
    slug: "verify-on-rera",
    title: "Verify the project on RERA",
    description: "Approvals, timelines and the developer's delivery record.",
  },
  {
    step: 4,
    slug: "get-your-loan-sanctioned",
    title: "Get your loan sanctioned",
    description: "Compare rates, processing fees and prepayment terms.",
  },
  {
    step: 5,
    slug: "register-and-take-possession",
    title: "Register and take possession",
    description: "Sale deed, registration and the snag-list walkthrough.",
  },
];

export const tools: ToolLink[] = [
  { slug: "emi-calculator", title: "EMI calculator", description: "Monthly EMI at today's rates", icon: "calculator" },
  { slug: "affordability", title: "Affordability check", description: "How much home can I buy?", icon: "home" },
  { slug: "rent-vs-buy", title: "Rent vs buy", description: "When buying starts to win", icon: "swap" },
  { slug: "rental-yield", title: "Rental yield", description: "Compare a flat with an FD", icon: "rupee" },
];

export const buyingStageGuides: BuyingStageGuide[] = [
  {
    stage: "pre-launch",
    title: "Pre-launch",
    status: "RERA awaited",
    description:
      "The project isn't RERA-registered yet, so bookings aren't allowed. Register your interest only, and keep any expression-of-interest payment fully refundable.",
    guideLabel: "Pre-launch buying guide",
  },
  {
    stage: "new-launch",
    title: "New launch",
    status: "RERA registered",
    description:
      "Registered and selling for the first time, usually with the widest choice of units. Under RERA, the developer can't take more than 10% of the price before a registered agreement for sale.",
    guideLabel: "New-launch buying guide",
  },
  {
    stage: "rera-registered",
    title: "RERA registered",
    status: "Under construction or ready",
    description:
      "Check the construction progress and possession date the developer has filed on the state RERA website, then pay in construction-linked instalments.",
    guideLabel: "RERA project buying guide",
  },
];
