import Image from "next/image";

const creators = [
  {
    handle: "@cybercashcoach",
    image: "/creator1.png",
    href: "https://youtube.com/@cybercashcoach?si=h9ieeIRkXToN2HWf",
  },
  {
    handle: "@danny_why",
    image: "/creator2.png",
    href: "https://youtube.com/@danny_why?si=ummporbXK4C1Po5S",
  },
  {
    handle: "@emmiescalm",
    image: "/creator3.png",
    href: "https://youtube.com/@emmiescalm?si=F7oMIw3Du7yJbgjW",
  },
  {
    handle: "@jacksons_ai",
    image: "/creator4.png",
    href: "https://youtube.com/@jacksons_ai?si=qHDHD1mlXwwQyIfM",
  },
  {
    handle: "@malvaai",
    image: "/creator5.png",
    href: "https://youtube.com/@malvaai?si=WNf7jkWhHtcrewwv",
  },
  {
    handle: "@markaiguy",
    image: "/creator6.png",
    href: "https://youtube.com/@markaiguy?si=WjQH347ndn1M3r5q",
  },
  {
    handle: "@zapiwala",
    image: "/creator7.png",
    href: "https://youtube.com/@zapiwala?si=V1bqsrOHFhIX3Wsy",
  },
  {
    handle: "@waynetutorials",
    image: "/creator8.png",
    href: "https://youtube.com/@waynetutorials?si=js81GoJqJB2sjXE1",
  },
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
            <a
              key={creator.handle}
              href={creator.href}
              target={creator.href === "#" ? undefined : "_blank"}
              rel={creator.href === "#" ? undefined : "noopener noreferrer"}
              aria-label={`Open ${creator.handle}'s channel`}
              className="group block"
              data-aos="zoom-in"
              data-aos-delay={String(index * 80)}>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-(--radius)">
                <Image
                  src={creator.image}
                  alt={creator.handle}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <p className="mt-3 text-base font-medium text-foreground underline underline-offset-4 transition-colors group-hover:text-primary">
                {creator.handle}
              </p>
            </a>
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
