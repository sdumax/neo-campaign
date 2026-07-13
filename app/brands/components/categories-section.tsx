import { IconWrapper } from "@/components/svgIcons/icon-wrapper";
import { AiIcon } from "@/components/svgIcons/ai-icon";
import { SaasIcon } from "@/components/svgIcons/saas-icon";
import { CreatorIcon } from "@/components/svgIcons/creator-icon";
import { FintechIcon } from "@/components/svgIcons/fintech-icon";
import { AppsIcon } from "@/components/svgIcons/apps-icon";
import { EducationIcon } from "@/components/svgIcons/education-icon";

const categories = [
  { label: "AI tools & platforms", icon: AiIcon },
  { label: "SaaS & software", icon: SaasIcon },
  { label: "Creator tools", icon: CreatorIcon },
  { label: "Fintech & productivity tools", icon: FintechIcon },
  { label: "Apps & digital products", icon: AppsIcon },
  { label: "Education platforms", icon: EducationIcon },
]

export function CategoriesSection() {
  return (
    <section className="px-6 py-24">
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
                  <IconWrapper icon={Icon} />
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
