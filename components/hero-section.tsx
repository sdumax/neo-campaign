import { Button } from "@/components/ui/button"

const placeholderCards = [
  { aspect: "aspect-[3/4]", gradient: "from-primary/20 to-primary/5" },
  { aspect: "aspect-[4/5]", gradient: "from-primary/15 via-primary/10 to-primary/5" },
  { aspect: "aspect-[3/4]", gradient: "from-primary/25 to-primary/10" },
  { aspect: "aspect-[4/6]", gradient: "from-primary/20 via-primary/10 to-primary/5" },
  { aspect: "aspect-[4/7]", gradient: "from-primary/30 to-primary/10" },
  { aspect: "aspect-[3/4]", gradient: "from-primary/15 to-primary/5" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 pt-16">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Creator
              <br />
              partnerships
              <br />
              simplified.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
              Helping brands discover creators who drive attention,
              trust, and sales.
            </p>
            <Button size="lg" className="rounded-[var(--radius)] w-fit">
              Get in touch
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[0].gradient} ${placeholderCards[0].aspect}`} />
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[1].gradient} ${placeholderCards[1].aspect}`} />
              </div>
              <div className="flex flex-col gap-4 pt-8">
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[2].gradient} ${placeholderCards[2].aspect}`} />
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[3].gradient} ${placeholderCards[3].aspect}`} />
              </div>
              <div className="flex flex-col gap-4">
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[4].gradient} ${placeholderCards[4].aspect}`} />
                <div className={`w-full rounded-[var(--radius)] bg-gradient-to-br ${placeholderCards[5].gradient} ${placeholderCards[5].aspect}`} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
