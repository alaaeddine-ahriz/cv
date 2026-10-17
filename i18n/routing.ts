import { defineRouting } from "next-intl/routing";

// French stays at "/", English lives at "/en". There is no language switch:
// "/" follows the browser's language on every visit (no cookie, so it never
// sticks to a page someone happened to open once). Anything that isn't
// English or French gets French.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
