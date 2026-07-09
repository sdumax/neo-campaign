import { Cpu, Cloud, Pen, CreditCard, Smartphone, BookOpen } from "lucide-react"

const categories = [
  { label: "AI tools & platforms", icon: Cpu },
  { label: "SaaS & software", icon: Cloud },
  { label: "Creator tools", icon: Pen },
  { label: "Fintech & productivity tools", icon: CreditCard },
  { label: "Apps & digital products", icon: Smartphone },
  { label: "Education platforms", icon: BookOpen },
]

export function CategoriesSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[11fr_9fr]">
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Built for Brands That
              <br />
              Need Trust, Not Just
              <br />
              Traffic.
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              We focus on creator campaigns where the audience actually cares
              about the product. That means working with brands in niches where
              influence can turn into real action:
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.label} className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-primary">
                    <Icon className="size-5 text-primary/70" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {cat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
