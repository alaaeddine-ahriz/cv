"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Motion animations follow the visitor's reduced-motion setting.
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster position="top-center" />
    </MotionConfig>
  );
}
