import Image from "next/image";

interface Partner {
  src: string;
  alt: string;
}

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  partners?: Partner[];
  stats?: Stat[];
  heading?: string;
  description?: string;
  partnerCols?: 2 | 3;
}

const defaultPartners: Partner[] = [
  { src: "/brand-4.png", alt: "Brand 4" },
  { src: "/brand-6.png", alt: "Brand 6" },
  { src: "/brand-5.png", alt: "Brand 5" },
  { src: "/brand-11.png", alt: "Brand 11" },
  { src: "/brand-10.png", alt: "Brand 10" },
  { src: "/brand-9.png", alt: "Brand 9" },
  { src: "/brand-13.png", alt: "Brand 13" },
  { src: "/brand-8.png", alt: "Brand 8" },
  { src: "/brand-1.png", alt: "Brand 1" },
  { src: "/brand-2.png", alt: "Brand 2" },
  { src: "/brand-7.png", alt: "Brand 7" },
  { src: "/brand-3.png", alt: "Brand 3" },
];

const defaultStats: Stat[] = [
  { value: "$117K+", label: "Revenue Generated" },
  { value: "57", label: "Top AI Brands Worked With" },
  { value: "15%", label: "Flat commission - creators keep the rest" },
];

export function StatsSection({
  partners = defaultPartners,
  stats = defaultStats,
  heading = "Built for results.\nBacked by experience.",
  description = "We're Hustlers Hub \u2014 a full-service influencer agency helping creators earn more and brands achieve real ROI. We specialize in AI, tech, personal finance, software, and content creation niches. With over a decade of experience in influencer marketing and a killer network of trusted creators, we know how to make partnerships that work.",
  partnerCols = 3,
}: StatsSectionProps) {
  const headingLines = heading.split("\n");
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="relative container mx-auto md:px-16">
        <div className="mb-16 text-center mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div
          className={`grid grid-cols-1 gap-16 ${partnerCols === 2 ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_auto]"}`}>
          <div
            className={`grid gap-6 ${partnerCols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {partners.map((brand) => (
              <div
                key={brand.src}
                className="flex items-center justify-center rounded-(--radius) bg-card md:h-34.5 md:w-70 w-26 h-17.5">
                <div className="relative h-9 w-20 md:w-30 md:h-16">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10 md:self-center">
            {stats.map((stat) => (
              <div key={stat.value} className="flex gap-5 font-heading">
                <div className="w-0.5 shrink-0 bg-primary" />
                <div>
                  <div className="text-[54px] font-bold text-foreground font-heading">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-muted-foreground font-sans text-wrap">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
