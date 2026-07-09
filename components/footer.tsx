export function Footer() {
  return (
    <footer className="bg-background px-6 pt-20 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-primary to-orange-500" />
              <span className="text-lg font-medium text-foreground">
                NeoCampaign
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm font-medium text-foreground"
              >
                Creators
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground"
              >
                Brands
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground"
            >
              Terms and Conditions
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          &copy; 2026 NeoCampaign, a trade name of CyberCashCoach LLC. All
          rights reserved
        </p>
      </div>
    </footer>
  )
}
