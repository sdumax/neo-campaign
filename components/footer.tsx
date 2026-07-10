import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-background px-6 pt-20 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center gap-8">
            <Logo className="text-lg" />
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-foreground">
                Creators
              </a>
              <a href="#" className="text-sm font-medium text-foreground">
                Brands
              </a>
            </div>
          </div>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          &copy; 2026 NeoCampaign, a trade name of CyberCashCoach LLC. All
          rights reserved
          <span className="mx-2">&middot;</span>
          <a href="#" className="underline">Terms and Conditions</a>
          <span className="mx-2">&middot;</span>
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
