import Image from "next/image";

const brandLogos = Array.from({ length: 8 }, (_, i) => ({
  src: `/brand-${i + 1}.png`,
  alt: `Brand ${i + 1}`,
}));

const scrollItems = [...brandLogos, ...brandLogos];

export function LogoCloud() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 items-start justify-center pt-16 flex rounded- bg-radial from-primary from-5% to-background opacity-15 md:opacity-10 blur-">
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-linear-to-r from-primary to-transparent" />
          <span className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase whitespace-nowrap font-sans">
            TRUSTED BY LEADING AI BRANDS
          </span>
          <div className="h-px w-10 bg-linear-to-r from-transparent to-primary" />
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />
        <div className="flex w-fit animate-marquee">
          {scrollItems.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative mx-6 md:mx-16 h-10 w-32 shrink-0">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
