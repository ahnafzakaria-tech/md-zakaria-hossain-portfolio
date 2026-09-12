"use client";

import { useCallback, useRef, useState } from "react";

export function usePointerGlow<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [hovering, setHovering] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - rect.top) / rect.height).toFixed(3));
  }, []);

  const onMouseEnter = useCallback(() => setHovering(true), []);
  const onMouseLeave = useCallback(() => setHovering(false), []);

  return {
    ref,
    hovering,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
