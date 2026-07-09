const footerLinks = [
  {
    title: "Platform",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Guides", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
]

const socialIcons = [
  { name: "Twitter", icon: "X" },
  { name: "GitHub", icon: "GH" },
  { name: "LinkedIn", icon: "LI" },
  { name: "YouTube", icon: "YT" },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="size-6 rounded bg-primary" />
              <span className="text-sm font-bold tracking-tight">
                Campaign
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Build, manage, and optimize campaigns at scale.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Campaign Platform. All rights
            reserved.
          </p>
          <div className="flex gap-3">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href="#"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
