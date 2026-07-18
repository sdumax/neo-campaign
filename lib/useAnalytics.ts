"use client";

import { useCallback, useRef } from "react";

export function useAnalytics() {
  const lastPageview = useRef<string | null>(null);

  const track = useCallback(
    (event: string, page: string, meta?: string) => {
      const dedupKey = `${event}:${page}:${meta ?? ""}`;
      if (event === "pageview" && lastPageview.current === dedupKey) return;
      if (event === "pageview") lastPageview.current = dedupKey;

      navigator.sendBeacon(
        "/api/analytics/event",
        JSON.stringify({ event, page, meta })
      );
    },
    []
  );

  return { track };
}
