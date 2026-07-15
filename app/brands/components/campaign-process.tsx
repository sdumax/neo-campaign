const steps = [
  {
    step: 1,
    title: "Campaign Discovery",
    description:
      "We take the time to understand your brand goals, target audience, and what success looks like for your campaign.",
  },
  {
    step: 2,
    title: "Strategy & Creator Match",
    description:
      "Our team identifies and vets creators whose audiences align with your brand values and campaign objectives.",
  },
  {
    step: 3,
    title: "Brief & Coordination",
    description:
      "We prepare a detailed creative brief, manage outreach, and coordinate timelines so your campaign runs smoothly.",
  },
  {
    step: 4,
    title: "Content Goes Live",
    description:
      "Creators publish content across their channels. We monitor performance so nothing slips through the cracks.",
  },
  {
    step: 5,
    title: "Results & Reporting",
    description:
      "You get a transparent report covering impressions, engagement, conversions, and actionable insights.",
  },
];

export function CampaignProcess() {
  const leftCards = steps.slice(0, 3);
  const rightCards = steps.slice(3);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/20 via-primary/5 to-transparent" /> */}
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            How We Build Campaigns
            <br />
            That Actually Perform.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            From discovery to reporting, we manage every step so you can focus
            on what matters — growing your brand.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-30 self-center">
          <div className="flex flex-col gap-8">
            {leftCards.map((card) => (
              <div
                key={card.step}
                data-aos="fade-up"
                data-aos-delay={String((card.step - 1) * 100)}
                className="rounded-[--radius] border border-border bg-card p-6">
                <div className="mb-4 flex size-7 items-center justify-center rounded-full border border-[#E50914]">
                  <span className="text-xs font-medium text-[#E50914]">
                    {card.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-8 pt-16">
            {rightCards.map((card) => (
              <div
                key={card.step}
                data-aos="fade-up"
                data-aos-delay={String((card.step - 1) * 100)}
                className="rounded-[--radius] border border-border bg-card p-6">
                <div className="mb-4 flex size-7 items-center justify-center rounded-full border border-[#E50914]">
                  <span className="text-xs font-medium text-[#E50914]">
                    {card.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
