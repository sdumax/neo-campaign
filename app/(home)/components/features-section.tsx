import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageIcon } from "@/components/svgIcons/message-icon";

const cards = [
  {
    title: "For Creators",
    description:
      "Get brand deals, negotiate better terms, and build lasting partnerships.",
    buttonText: "Partner With Us",
    href: "/creators",
  },
  {
    title: "For Brands",
    description:
      "Launch campaigns with creators who understand your market, your product, and your growth goals.",
    buttonText: "Build a Campaign",
    href: "/brands",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto container px-6">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-[32px] md:text-[54px] font-semibold leading-tight font-heading tracking-tight text-foreground sm:text-3xl">
            Built for brands.
            <br />
            Trusted by creators.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl  leading-relaxed text-muted-foreground">
            NeoCampaign helps creators and brands build partnerships that go
            beyond simple shoutouts. With a strong network across AI, tech,
            finance, software, and content creation, we turn influencer
            marketing into a smoother, smarter growth channel
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={index === 0 ? "100" : "200"}
              className="flex flex-col rounded-(--radius) border border-border bg-card p-8">
              <MessageIcon className="mb-6 size-5 text-primary" />
              <h3 className="mb-3 text-[32px] font-medium text-foreground">
                {card.title}
              </h3>
              <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <Link href={card.href} className="mt-auto self-start">
                <Button>{card.buttonText}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
