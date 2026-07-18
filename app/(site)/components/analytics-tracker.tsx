"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAnalytics } from "@/lib/useAnalytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const { track } = useAnalytics();

  useEffect(() => {
    track("pageview", pathname);
  }, [pathname, track]);

  return null;
}
