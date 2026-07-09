import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60" />
      <div className="absolute top-0 right-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Transform Your Campaigns?
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Join thousands of teams already using our platform to build,
          optimize, and scale their campaigns.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="min-w-[180px] border-2 border-white/20 bg-white text-primary text-sm hover:bg-white/90"
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] border-white/30 text-sm text-white hover:bg-white/10"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
