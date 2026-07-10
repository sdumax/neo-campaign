import { Hero } from "./components/hero";
import { FeaturesSection } from "./components/features-section";
import { CtaSection } from "./components/cta-section";
import { LogoCloud } from "@/components/logo-cloud";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-background from-0% via-background to-primary via-38% to-100%">
      <Hero />
      <LogoCloud />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
