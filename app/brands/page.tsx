import { Hero } from "./components/hero"
import { VideoGrid } from "./components/video-grid"
import { CategoriesSection } from "./components/categories-section"
import { CampaignProcess } from "./components/campaign-process"
import { ContactSection } from "./components/contact-section"
import { LogoCloud } from "@/components/logo-cloud"

export default function BrandsPage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <VideoGrid />
      <CategoriesSection />
      <CampaignProcess />
      <ContactSection />
    </>
  )
}
