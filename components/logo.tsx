import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="NeoCampaign Logo"
        width={40}
        height={40}
      />
      <span className={cn("font-medium text-foreground", className)}>
        NeoCampaign
      </span>
    </Link>
  )
}
