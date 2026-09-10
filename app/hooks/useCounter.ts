"use client";

import { useState, useEffect, useRef } from "react";

export function useCounter(
  target: number,
  { duration = 1800, decimals = 0, start = false }: {
    duration?: number;
    decimals?: number;
    start?: boolean;
  } = {},
) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration, decimals]);

  return value;
}
