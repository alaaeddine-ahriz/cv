"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades its section in the first time it scrolls into view. Without
 * JavaScript the CSS never hides it (see `@media (scripting: enabled)`).
 */
export function Reveal({
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: {
  as?: "section" | "div";
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`on-scroll ${className}`}
      data-visible={visible || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
