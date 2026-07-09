import { cn } from "@/lib/utils"

export function Globe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-40 -right-40 select-none opacity-30 lg:opacity-50",
        className,
      )}
    >
      <svg
        viewBox="0 0 600 600"
        className="h-[700px] w-[700px]"
        style={{ filter: "blur(1px)" }}
      >
        <circle
          cx="300"
          cy="300"
          r="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-primary"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
          transform="rotate(30 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
          transform="rotate(60 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
          transform="rotate(90 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
          transform="rotate(120 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
          transform="rotate(150 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/70"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_70%)]" />
    </div>
  )
}
