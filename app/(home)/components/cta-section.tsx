import { Button } from "@/components/ui/button";

const metrics = [
  { value: "450M+", label: "Impressions Generated" },
  { value: "300+", label: "Creators Worked With" },
  { value: "48hr", label: "Avg. Creator Match Time" },
  { value: "87%", label: "Brand Retention Rate" },
];

export function CtaSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 bg-background">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl font-heading">
              Successful
              <br />
              Campaigns Are the
              <br />
              Objective.
            </h2>
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
              {metrics.map((m) => (
                <div key={m.value}>
                  <div className="text-4xl md:text-6xl font-bold text-foreground">
                    {m.value}
                  </div>
                  <div className="mt-2 h-px  bg-[#CCD0D5]" />
                  <div className="mt-2 text-sm font-medium text-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-(--radius)" data-aos="fade-left">
            <h3 className="mb-3 text-2xl font-medium text-foreground">
              Work with us
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Complete this quick form and we will get back to you as soon as
              possible.
            </p>
            <div className="flex gap-4">
              <Button className="flex-1 rounded-(--radius)">
                I am a creator
              </Button>
              <Button className="flex-1 rounded-(--radius)">
                I am a brand
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
