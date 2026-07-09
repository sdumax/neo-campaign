import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "This platform completely transformed how we run our campaigns. The AI insights alone saved us hours every week.",
    name: "Sarah Chen",
    title: "Marketing Director, TechFlow",
    initials: "SC",
  },
  {
    quote:
      "The real-time analytics gave us visibility we never had before. We optimized mid-campaign and saw a 3x improvement.",
    name: "Marcus Johnson",
    title: "Head of Growth, ScaleUp",
    initials: "MJ",
  },
  {
    quote:
      "We evaluated a dozen tools before choosing this one. The multi-channel support and automation are unmatched.",
    name: "Elena Rodriguez",
    title: "Campaign Manager, BrandCore",
    initials: "ER",
  },
]

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Teams
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            See what our customers have to say about their experience.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="size-4 fill-primary text-primary">
                    <svg viewBox="0 0 20 20" className="size-full">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
