import Image from "next/image";

const creators = [
  { handle: "@cybercashcoach", image: "/creator1.png" },
  { handle: "@danny_why", image: "/creator2.png" },
  { handle: "@emmiescalm", image: "/creator3.png" },
  { handle: "@jacksons_ai", image: "/creator4.png" },
  { handle: "@malvaai", image: "/creator5.png" },
  { handle: "@markaiguy", image: "/creator6.png" },
  { handle: "@zapiwala", image: "/creator7.png" },
  { handle: "@waynetutorials", image: "/creator8.png" },
];

export function CreatorsGrid() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto container md:px-24 px-6">
        <div className="mb-14 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[54px]">
            Creators We&apos;ve Worked With
          </h2>
          <p className="mt-4 text-muted-foreground">
            The creators we&apos;ve helped land and manage brand partnerships.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {creators.map((creator, index) => (
            <div
              key={creator.handle}
              data-aos="zoom-in"
              data-aos-delay={String(index * 80)}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius)]">
                <Image
                  src={creator.image}
                  alt={creator.handle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <p className="mt-3 text-base font-medium text-foreground underline">
                {creator.handle}
              </p>
            </div>
          ))}
        </div>
        <p
          className="mt-16 text-center text-3xl md:text-[54px] font-bold text-foreground sm:text-4xl"
          data-aos="fade-up"
          data-aos-delay="200">
          And many more...
        </p>
      </div>
    </section>
  );
}
