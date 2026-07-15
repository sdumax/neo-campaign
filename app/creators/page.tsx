import { Hero } from "./components/hero";
import { CreatorsGrid } from "./components/creators-grid";
import { WorkflowSection } from "./components/workflow-section";
import { StatsSection } from "@/components/stats-section";

import { Footer } from "@/components/footer";
import { WorkWithUsSection } from "@/components/work-with-us-section";

const creatorPartners = [
  { src: "/brand-4.png", alt: "Brand 4" },
  { src: "/brand-6.png", alt: "Brand 6" },
  { src: "/brand-5.png", alt: "Brand 5" },
  { src: "/brand-11.png", alt: "Brand 11" },
  { src: "/brand-10.png", alt: "Brand 10" },
  { src: "/brand-9.png", alt: "Brand 9" },
  { src: "/brand-13.png", alt: "Brand 13" },
  { src: "/brand-8.png", alt: "Brand 8" },
];

const creatorStats = [
  { value: "200+", label: "Creators" },
  { value: "<$10", label: "CPM for most of our campaigns" },
  { value: "-50%", label: "CAC decreased acquisition cost" },
];

export default function CreatorsPage() {
  return (
    <>
      <div className="bg-linear-to-b from-background from-0% via-background to-primary/65 via-22% to-100%">
        <Hero />
        <CreatorsGrid />
      </div>
      <div className="bg-linear-to-b from-background from-0% via-background to-primary/70 via-35% to-100%">
        <WorkflowSection />
        <StatsSection
          partners={creatorPartners}
          stats={creatorStats}
          partnerCols={2}
        />
        <WorkWithUsSection mode="direct" type="creator" />
      </div>
      <Footer />
    </>
  );
}
