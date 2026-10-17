"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { profile } from "@/lib/site";

// Each line comes in from a soft blur, one after the other.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <motion.header
      className="flex flex-col gap-3.5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.p
        variants={item}
        className="mb-1 inline-flex items-center gap-2 self-start rounded-full border bg-card py-1.5 pr-3 pl-2.5 text-sm font-medium text-muted-foreground shadow-xs"
      >
        <span className="relative flex size-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-whatsapp" />
        </span>
        {t("availability")}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-[clamp(36px,7vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance"
      >
        {profile.displayName}
      </motion.h1>

      <motion.p
        variants={item}
        className="text-[17px] leading-[1.55] text-pretty text-muted-foreground sm:text-lg"
      >
        {t("headline")}
      </motion.p>
    </motion.header>
  );
}
