import HeroSection from "@/components/landing/hero-section";
import TrustSection from "@/components/landing/trust-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import CTASection from "@/components/landing/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BridgeRoom — Stay Close, No Matter the Distance",
  description:
    "A private digital room where long-distance friends and families can meet, talk, watch, and hang out together in real time.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
