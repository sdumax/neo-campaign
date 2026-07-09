const stats = [
  { value: "$2.4B", label: "Campaign Revenue Generated" },
  { value: "15K+", label: "Active Campaigns" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "4.8x", label: "Average ROI" },
]

export function StatsSection() {
  return (
    <section className="bg-primary/5 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
