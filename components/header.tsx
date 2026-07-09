import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="relative h-24 bg-background">
      <div className="mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-gradient-to-br from-primary to-orange-500" />
          <span className="text-lg font-medium text-foreground">
            NeoCampaign
          </span>
        </div>
        <nav className="ml-12 flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-foreground">
            Creators
          </a>
          <a href="#" className="text-sm font-medium text-foreground">
            Brands
          </a>
        </nav>
        <div className="ml-auto">
          <Button className="h-[52px] w-[140px] rounded-[calc(var(--radius)*1.3)] bg-primary text-[#0a0a0a] text-sm font-medium hover:bg-primary/90">
            Get in touch
          </Button>
        </div>
      </div>
    </header>
  )
}
