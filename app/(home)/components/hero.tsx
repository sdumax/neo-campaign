import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const homeImages = [
  { src: "/home1.png", aspect: "aspect-[3/4]" },
  { src: "/home2.png", aspect: "aspect-[4/5]" },
  { src: "/home3.png", aspect: "aspect-[3/4]" },
  { src: "/home4.png", aspect: "aspect-[4/5]" },
  { src: "/home5.png", aspect: "aspect-[4/6]" },
  { src: "/home6.png", aspect: "aspect-[4/7]" },
  { src: "/home7.png", aspect: "aspect-[3/4]" },
  { src: "/home8.png", aspect: "aspect-[4/5]" },
  { src: "/home9.png", aspect: "aspect-[3/4]" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden ">
      <div className="mx-auto container px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div
            className="order-2 flex flex-col gap-4 md:pt-4 lg:order-1"
            data-aos="fade-up">
            <h1 className="text-[48px] font-semibold leading-tight font-heading tracking-tight text-foreground md:text-[90px]">
              Creator
              <br />
              partnerships
              <br />
              simplified.
            </h1>
            <p className="max-w-md md:text-lg leading-relaxed text-muted-foreground">
              Helping brands discover creators who drive attention, trust, and
              sales.
            </p>
            <Link href="#contact" className="w-full md:w-fit">
              <Button className="w-full md:w-fit">Get in touch</Button>
            </Link>
          </div>
          <div
            className="relative order-1 lg:order-2"
            data-aos="fade-left"
            data-aos-delay="200">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`relative w-full rounded-(--radius) overflow-hidden ${homeImages[i].aspect}`}>
                    <Image
                      src={homeImages[i].src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 pt-8">
                {[3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`relative w-full rounded-(--radius) overflow-hidden ${homeImages[i].aspect}`}>
                    <Image
                      src={homeImages[i].src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {[6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className={`relative w-full rounded-(--radius) overflow-hidden ${homeImages[i].aspect}`}>
                    <Image
                      src={homeImages[i].src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
