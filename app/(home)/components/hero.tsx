import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const columns = [
  {
    images: [
      { src: "/home1.png", aspect: "aspect-[3/4]" },
      { src: "/home2.png", aspect: "aspect-[3/4]" },
      { src: "/home3.png", aspect: "aspect-[3/4]" },
    ],
    delay: "",
  },
  {
    images: [
      { src: "/home4.png", aspect: "aspect-[3/4]" },
      { src: "/home5.png", aspect: "aspect-[3/4]" },
      { src: "/home6.png", aspect: "aspect-[3/4]" },
    ],
    delay: "[animation-delay:-8s]",
  },
  {
    images: [
      { src: "/home7.png", aspect: "aspect-[3/4]" },
      { src: "/home8.png", aspect: "aspect-[3/4]" },
      { src: "/home9.png", aspect: "aspect-[3/4]" },
    ],
    delay: "[animation-delay:-16s]",
  },
];

function ScrollColumn({
  images,
}: {
  images: { src: string; aspect: string }[];
}) {
  return (
    <div className={`animate-scroll-up space-y-4 `}>
      {[...images, ...images].map((img, i) => (
        <div
          key={i}
          className={`relative w-full rounded-(--radius) overflow-hidden ${img.aspect}`}>
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
            <div className="grid grid-cols-3 gap-x-4 h-full">
              {columns.map((col, i) => (
                <div key={i} className={`overflow-hidden ${i ===1 ? "md:pt-32 pt-16" : ""}`}>
                <ScrollColumn
                  images={col.images}
                />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 bg-linear-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
