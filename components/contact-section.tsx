import Link from "next/link";
import { Button } from "@/components/ui/button";

const metrics = [
  { value: "450M+", label: "Impressions Generated" },
  { value: "300+", label: "Creators Worked With" },
  { value: "48hr", label: "Avg. Creator Match Time" },
  { value: "87%", label: "Brand Retention Rate" },
];

export function ContactSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl">
              Successful
              <br />
              Campaigns Are the
              <br />
              Objective.
            </h2>
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
              {metrics.map((m) => (
                <div key={m.value}>
                  <div className="text-5xl font-bold text-primary-foreground">
                    {m.value}
                  </div>
                  <div className="mt-2 h-px w-24 bg-primary-foreground/20" />
                  <div className="mt-2 text-sm font-medium text-primary-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-(--radius) bg-card p-8" data-aos="fade-left">
            <h3 className="mb-3 text-2xl font-medium text-foreground">
              Work with us
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Complete this quick form and we will get back to you as soon as
              possible.
            </p>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    placeholder="John@john.com"
                    className="w-full rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Brand/Company">
                  <input
                    type="text"
                    placeholder="Brand"
                    className="w-full rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </Field>
                <Field label="Website" required>
                  <input
                    type="url"
                    placeholder="https://neocampaign.net/"
                    className="w-full rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </Field>
              </div>
              <Field label="Budget" required>
                <select
                  className="w-full appearance-none rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-muted-foreground focus:outline-none"
                  defaultValue="0">
                  <option value="0" disabled>
                    Please select
                  </option>
                  <option value="1k-5k">$1K - $5K</option>
                  <option value="5k-10k">$5K - $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k+">$50K+</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  rows={3}
                  placeholder="Your message to our team..."
                  className="w-full resize-none rounded-(--radius) border border-primary bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </Field>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 rounded border border-primary bg-card"
                />
                <span className="text-sm text-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary underline">
                    Privacy Policy
                  </Link>
                  <span className="text-primary">*</span>
                </span>
              </label>
              <Button>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-foreground">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}
