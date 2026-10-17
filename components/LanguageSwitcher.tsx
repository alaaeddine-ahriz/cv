"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** FR / EN segmented control; the white pill slides to the active language. */
export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="inline-flex shrink-0 items-center rounded-full border bg-secondary/70 p-0.5 text-[13px] font-semibold"
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            title={t(locale)}
            className={cn(
              "relative rounded-full px-2.5 py-1 uppercase tracking-wide outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
              active ? "text-foreground" : "text-subtle-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 -z-10 rounded-full border bg-card shadow-xs"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="sr-only">{t(locale)}</span>
            <span aria-hidden="true">{locale}</span>
          </Link>
        );
      })}
    </nav>
  );
}
