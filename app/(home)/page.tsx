import { Hero } from "./components/hero"
import { FeaturesSection } from "./components/features-section"
import { CtaSection } from "./components/cta-section"
import { LogoCloud } from "@/components/logo-cloud"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </>
  )
}
