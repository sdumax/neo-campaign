import { Hero } from "./components/hero"
import { CreatorsGrid } from "./components/creators-grid"
import { WorkflowSection } from "./components/workflow-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function CreatorsPage() {
  return (
    <>
      <Hero />
      <CreatorsGrid />
      <WorkflowSection />
      <StatsSection />
      <Footer />
    </>
  )
}
