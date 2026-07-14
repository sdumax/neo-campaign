import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BgGlobe } from "@/components/bg-globe";

interface HeroSharedProps {
  heading: ReactNode;
  subtext: string;
  buttonText: string;
}

export function HeroShared({ heading, subtext, buttonText }: HeroSharedProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center flex-col md:flex-row overflow-hidden px-6 gap-4">
      <div className="pointer-events-none  lg:hidden w-3/4 ">
        <BgGlobe />
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10 flex flex-col gap-8" data-aos="fade-up">
            <h1 className="text-[40px] font-bold leading-none text-nowrap  tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {heading}
            </h1>
            <p className="max-w-md text-lg leading-tight text-muted-foreground">
              {subtext}
            </p>
            <Button className="h-[52px] w-fit rounded-[var(--radius)] px-8">
              {buttonText}
            </Button>
          </div>
          <div className="hidden lg:block" data-aos="zoom-in" data-aos-delay="200">
            <BgGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
