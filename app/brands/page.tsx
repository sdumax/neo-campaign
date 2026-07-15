import { Hero } from "./components/hero";
import { VideoGrid } from "./components/video-grid";
import { CategoriesSection } from "./components/categories-section";
import { CampaignProcess } from "./components/campaign-process";
import { WorkWithUsSection } from "@/components/work-with-us-section";
import { Footer } from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";

export default function BrandsPage() {
  return (
    <>
      <div className="bg-linear-to-b from-background from-0% via-background to-primary/65 via-20% md:via-45% to-100%">
        <Hero />
        <LogoCloud />
        <VideoGrid />
      </div>
      <div className="bg-linear-to-b from-background from-0% via-background to-primary/70 via-5% to-100%">
        <CategoriesSection />
        <CampaignProcess />
        <WorkWithUsSection mode="direct" type="brand" />
      </div>
      <Footer />
    </>
  );
}
