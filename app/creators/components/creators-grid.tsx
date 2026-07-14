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
    <section className="relative overflow-hidden px-6 py-24">
      
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Creators We&apos;ve Worked With
          </h2>
          <p className="mt-4 text-muted-foreground">
            The creators we&apos;ve helped land and manage brand partnerships.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {creators.map((handle, index) => (
            <div key={handle} data-aos="zoom-in" data-aos-delay={String(index * 80)}>
              <div className="aspect-[3/4] w-full rounded-[var(--radius)] bg-gradient-to-br from-primary/20 to-primary/5" />
              <p className="mt-3 text-base font-medium text-foreground underline">
                {handle}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-3xl font-bold text-foreground sm:text-4xl" data-aos="fade-up" data-aos-delay="200">
          And many more...
        </p>
      </div>
    </section>
  )
}
