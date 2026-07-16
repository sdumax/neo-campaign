"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedNumber({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  delay = 0,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            const start = performance.now();

            function tick(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutExpo(progress);
              setDisplay(Math.round(eased * end));

              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            }

            requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
