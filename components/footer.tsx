import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-background px-6 pt-20 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center gap-8">
            <Logo className="text-lg" />
            <div className="flex items-center gap-6">
              <Link href="/creators" className="text-sm font-medium text-foreground">
                Creators
              </Link>
              <Link href="/brands" className="text-sm font-medium text-foreground">
                Brands
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          &copy; 2026 NeoCampaign, a trade name of CyberCashCoach LLC. All
          rights reserved
          <span className="mx-2">&middot;</span>
          <Link href="#" className="underline">Terms and Conditions</Link>
          <span className="mx-2">&middot;</span>
          <Link href="#" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
