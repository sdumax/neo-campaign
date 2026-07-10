import { Button } from "@/components/ui/button";

const placeholderCards = [
  { aspect: "aspect-[3/4]", gradient: "from-primary/20 to-primary/5" },
  {
    aspect: "aspect-[4/5]",
    gradient: "from-primary/15 via-primary/10 to-primary/5",
  },
  { aspect: "aspect-[3/4]", gradient: "from-primary/25 to-primary/10" },
  {
    aspect: "aspect-[4/6]",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  { aspect: "aspect-[4/7]", gradient: "from-primary/30 to-primary/10" },
  { aspect: "aspect-[3/4]", gradient: "from-primary/15 to-primary/5" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-background px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col gap-4 md:pt-4 lg:order-1">
            <h1 className="text-[40px] font-semibold leading-tight tracking-tight text-foreground md:text-[90px]">
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
            <Button
              size="lg"
              className="w-fit text-[#0a0a0a] text-sm font-medium">
              Get in touch
            </Button>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[0].gradient} ${placeholderCards[0].aspect}`}
                />
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[1].gradient} ${placeholderCards[1].aspect}`}
                />
              </div>
              <div className="flex flex-col gap-4 pt-8">
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[2].gradient} ${placeholderCards[2].aspect}`}
                />
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[3].gradient} ${placeholderCards[3].aspect}`}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[4].gradient} ${placeholderCards[4].aspect}`}
                />
                <div
                  className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[5].gradient} ${placeholderCards[5].aspect}`}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
