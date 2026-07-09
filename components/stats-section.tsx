const partners = [
  "Higgsfield",
  "Vidu",
  "OpusClip",
  "ElevenLabs",
  "Topview",
  "movavi",
  "TubeMagic",
  "OpenArt",
  "Hailuo AI",
  "invideo",
  "PixVerse",
  "filmora",
]

const stats = [
  { value: "$117K+", label: "Revenue Generated" },
  { value: "57", label: "Top AI Brands Worked With" },
  { value: "15%", label: "Flat commission — creators keep the rest" },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Built for results.
            <br />
            Backed by experience.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            We&apos;re Hustlers Hub — a full-service influencer agency helping
            creators earn more and brands achieve real ROI. We specialize in AI,
            tech, personal finance, software, and content creation niches. With
            over a decade of experience in influencer marketing and a killer
            network of trusted creators, we know how to make partnerships that
            work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-3 gap-4">
            {partners.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-[var(--radius)] bg-card p-6"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10">
            {stats.map((stat) => (
              <div key={stat.value} className="flex gap-5">
                <div className="w-0.5 shrink-0 bg-primary" />
                <div>
                  <div className="text-5xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
