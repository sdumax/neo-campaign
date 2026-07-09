const brands = [
  "Hailuo AI",
  "invideo",
  "PixVerse",
  "filmora",
  "Higgsfield",
  "OpusClip",
  "Vidu",
  "ElevenLabs",
]

export function LogoCloud() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-16">
        <div className="h-40 w-[700px] rounded-full bg-primary/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-primary" />
          <span className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase whitespace-nowrap">
            TRUSTED BY LEADING AI BRANDS
          </span>
          <div className="h-px w-20 bg-primary" />
        </div>
        <div className="flex flex-nowrap items-center justify-center gap-12">
          {brands.map((name) => (
            <span key={name} className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
