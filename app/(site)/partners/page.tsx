import { Hero } from "./components/hero";
import { CreatorsCardGrid } from "./components/creators-card-grid";
import { WorkWithUsSection } from "@/components/work-with-us-section";
import { Footer } from "@/components/footer";
import { getPublicPartnerCreators } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const creators = await getPublicPartnerCreators();

  return (
    <div className="min-h-screen bg-linear-to-b from-background from-0% via-background to-primary/80 via-40% to-100%">
      <Hero />
      <CreatorsCardGrid initialCreators={creators} />
      <WorkWithUsSection mode="direct" type="creator" />
      <Footer />
    </div>
  );
}
