import type { SVGProps } from "react";

const cardClasses =
  "flex size-12 items-center justify-center rounded-[--radius] bg-[#E50914]/10";

const iconClasses = "size-5 text-primary/70";

export function IconWrapper({
  icon: Icon,
}: {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className={cardClasses}>
      <Icon className={iconClasses} strokeWidth={1.5} />
    </div>
  );
}
