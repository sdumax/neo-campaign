import Image from "next/image";

export function BgGlobe({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src="/bg_globe.svg"
        alt=""
        width={1200}
        height={1200}
        className="h-auto w-full"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-radial-[at_25%_25%] from-background to-transparent" />
    </div>
  );
}
