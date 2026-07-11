import { Button } from "@/components/ui/button";
import { MessageIcon } from "@/components/svgIcons/message-icon";

const cards = [
  {
    title: "For Creators",
    description:
      "Get brand deals, negotiate better terms, and build lasting partnerships.",
    buttonText: "Partner With Us",
  },
  {
    title: "For Brands",
    description:
      "Launch campaigns with creators who understand your market, your product, and your growth goals.",
    buttonText: "Build a Campaign",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-[32px] md:text-[54px] font-semibold leading-tight font-heading tracking-tight text-foreground sm:text-3xl">
            Built for brands.
            <br />
            Trusted by creators.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            NeoCampaign helps creators and brands build partnerships that go
            beyond simple shoutouts. With a strong network across AI, tech,
            finance, software, and content creation, we turn influencer
            marketing into a smoother, smarter growth channel
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-(--radius) border border-border bg-card p-8">
              <MessageIcon className="mb-6 size-5 text-primary" />
              <h3 className="mb-3 text-xl font-medium text-foreground">
                {card.title}
              </h3>
              <p className="mb-12 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <Button className="mt-auto w-fit self-start rounded-(--radius)">
                {card.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
