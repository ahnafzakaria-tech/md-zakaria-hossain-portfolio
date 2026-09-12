"use client";

import { useState, useCallback, useId } from "react";

interface DisclosureReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  triggerProps: {
    "aria-expanded": boolean;
    "aria-controls": string;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    role: "button";
    tabIndex: 0;
  };
  bodyProps: {
    id: string;
    "data-open": string;
    "aria-hidden": boolean;
  };
}

export function useDisclosure(defaultOpen = false): DisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const contentId = `disclosure-${id}`;

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return {
    isOpen,
    toggle,
    open,
    close,
    triggerProps: {
      "aria-expanded": isOpen,
      "aria-controls": contentId,
      onClick: toggle,
      onKeyDown,
      role: "button",
      tabIndex: 0,
    },
    bodyProps: {
      id: contentId,
      "data-open": String(isOpen),
      "aria-hidden": !isOpen,
    },
  };
}
