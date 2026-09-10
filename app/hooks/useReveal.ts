"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport.
 * Returns [ref, visible] — attach ref to the section, use visible to toggle classes.
 */
export function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}
