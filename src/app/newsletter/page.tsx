import type { Metadata } from "next";
import { NewsletterSection } from "@/components/newsletter/newsletter-section";

export const metadata: Metadata = {
  title: "The Monday Market Brief",
  description: "Price moves, new launches and policy changes — explained in five minutes, every Monday.",
};

export default function NewsletterPage() {
  return <NewsletterSection headingAs="h1" />;
}
