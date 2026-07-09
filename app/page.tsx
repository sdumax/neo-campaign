import { HeroSection } from "@/components/hero-section"
import { LogoCloud } from "@/components/logo-cloud"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </>
  )
}
