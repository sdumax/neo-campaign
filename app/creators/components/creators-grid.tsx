const creators = [
  "@cybercashcoach",
  "@danny_why",
  "@emmiescalm",
  "@jacksons_ai",
  "@malvaai",
  "@markaiguy",
  "@zapiwala",
  "@waynetutorials",
]

export function CreatorsGrid() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Creators We&apos;ve Worked With
          </h2>
          <p className="mt-4 text-muted-foreground">
            The creators we&apos;ve helped land and manage brand partnerships.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {creators.map((handle) => (
            <div key={handle}>
              <div className="aspect-[3/4] w-full rounded-[var(--radius)] bg-gradient-to-br from-primary/20 to-primary/5" />
              <p className="mt-3 text-base font-medium text-foreground underline">
                {handle}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          And many more...
        </p>
      </div>
    </section>
  )
}
