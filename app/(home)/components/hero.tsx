import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const columns = [
  {
    images: [
      { src: "/home1.png", aspect: "aspect-[3/4]" },
      { src: "/home2.png", aspect: "aspect-[4/5]" },
      { src: "/home3.png", aspect: "aspect-[3/4]" },
    ],
    offset: "",
    delay: "",
    left: "left-0",
  },
  {
    images: [
      { src: "/home4.png", aspect: "aspect-[4/5]" },
      { src: "/home5.png", aspect: "aspect-[4/6]" },
      { src: "/home6.png", aspect: "aspect-[4/7]" },
    ],
    offset: "pt-8",
    delay: "[animation-delay:-8s]",
    left: "left-1/3",
  },
  {
    images: [
      { src: "/home7.png", aspect: "aspect-[3/4]" },
      { src: "/home8.png", aspect: "aspect-[4/5]" },
      { src: "/home9.png", aspect: "aspect-[3/4]" },
    ],
    offset: "",
    delay: "[animation-delay:-16s]",
    left: "left-2/3",
  },
];

function ScrollColumn({
  images,
  offset,
  delay,
}: {
  images: { src: string; aspect: string }[];
  offset: string;
  delay: string;
}) {
  return (
    <div className={`animate-scroll-up ${delay}`}>
      {[...images, ...images].map((img, i) => (
        <div
          key={i}
          className={`relative w-full rounded-(--radius) overflow-hidden ${img.aspect} ${offset}`}>
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div className="mx-auto container px-6 md:px-24 h-full">
        <div className="grid items-center gap-6 h-full lg:grid-cols-2 lg:gap-16">
          <div
            className="order-2 flex flex-col gap-4 md:pt-4 lg:order-1"
            data-aos="fade-up">
            <h1 className="text-[40px] font-bold leading-none text-nowrap  tracking-tight text-foreground sm:text-6xl md:text-[90px]">
              Creator
              <br />
              partnerships
              <br />
              simplified.
            </h1>
            <p className="max-w-md text-lg leading-tight text-muted-foreground">
              Helping brands discover creators who drive attention, trust, and
              sales.
            </p>
            <Link href="#contact" className="w-full md:w-fit">
              <Button className="w-full md:w-fit">Get in touch</Button>
            </Link>
          </div>
          <div
            className="relative order-1 h-full overflow-hidden lg:order-2"
            data-aos="fade-left"
            data-aos-delay="200">
            <div className="absolute top-0 left-0 right-0 h-30 z-20 bg-linear-to-b from-background to-transparent pointer-events-none" />
            {columns.map((col) => (
              <div
                key={col.left}
                className={`absolute top-0 bottom-0 w-1/3 overflow-hidden ${col.left}`}>
                <ScrollColumn
                  images={col.images}
                  offset={col.offset}
                  delay={col.delay}
                />
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 bg-linear-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
