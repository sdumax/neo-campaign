"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AosInit() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  return null;
}
