import { Button } from "@/components/ui/button"
import { Globe } from "@/components/globe"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--background)_92%,transparent_100%)]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Scale With
              <br />
              Creators Who
              <br />
              Actually Convert
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              NeoCampaign helps brands find, manage, and launch campaigns with
              creators who can turn attention into clicks, signups, and sales.
            </p>
            <Button className="h-[52px] w-[170px] rounded-[var(--radius)]">
              Start a Campaign
            </Button>
          </div>
          <Globe />
        </div>
      </div>
    </section>
  )
}
