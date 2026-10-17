import { defineRouting } from "next-intl/routing";

// French stays at "/", English lives at "/en". Visitors landing on "/" get
// sent to their browser's language the first time; the switcher remembers
// their choice after that (NEXT_LOCALE cookie).
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
