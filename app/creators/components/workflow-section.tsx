import { IconWrapper } from "@/components/svgIcons/icon-wrapper";
import { ConnectIcon } from "@/components/svgIcons/connect-icon";
import { PitchIcon } from "@/components/svgIcons/pitch-icon";
import { NegotiateIcon } from "@/components/svgIcons/negotiate-icon";
import { CoordinateIcon } from "@/components/svgIcons/coordinate-icon";
import { PaidIcon } from "@/components/svgIcons/paid-icon";

const workflowCards = [
  {
    icon: ConnectIcon,
    title: "Connect",
    description:
      "We learn your content style, audience, rates, and what partnerships make sense for you.",
  },
  {
    icon: PitchIcon,
    title: "Pitch",
    description:
      "We reach out to brands that fit your niche and position you as a strong creator partner.",
  },
  {
    icon: NegotiateIcon,
    title: "Negotiate",
    description:
      "We handle the difficult conversations around budget, scope, revisions, and rights.",
  },
  {
    icon: CoordinateIcon,
    title: "Coordinate",
    description:
      "We keep the campaign organized from brief and approval to posting and reporting.",
  },
  {
    icon: PaidIcon,
    title: "Get Paid",
    description:
      "We support the payment process so you can focus on creating, not chasing invoices",
  },
];

export function WorkflowSection() {
  const leftCards = workflowCards.slice(0, 3);
  const rightCards = workflowCards.slice(3);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-[54px] font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Stop Sorting Emails. Start
            <br />
            Closing Better Deals.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            Brand deals can be profitable, but they can also be messy.
            NeoCampaign helps creators manage partnerships professionally
            without losing time to emails, chasing, and negotiation.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 justify-self-center">
          <div className="flex flex-col gap-8">
            {leftCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  data-aos="fade-up"
                  data-aos-delay={String(index * 100)}
                  className="rounded-(--radius) border border-border bg-card p-6 max-w-90.5">
                  <IconWrapper icon={Icon} />
                  <h3 className="my-3 text-lg font-medium text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-8 lg:pt-16">
            {rightCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  data-aos="fade-up"
                  data-aos-delay={String((index + 3) * 100)}
                  className="rounded-(--radius) border border-border bg-card max-w-90.5 p-6">
                  <IconWrapper icon={Icon} />
                  <h3 className="my-3 text-lg font-medium text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
