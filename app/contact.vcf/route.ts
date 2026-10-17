import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { profile } from "@/lib/site";

// vCard 3.0: the version iOS, Android, Outlook and Gmail all import cleanly.
// Text values escape backslashes, commas, semicolons and newlines.
const escape = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

/**
 * GET /contact.vcf?lang=en — the contact card behind "Ajouter aux contacts".
 * Title and note follow ?lang; the site link points at the domain it was
 * requested from, so it's right on any deployment.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const lang = searchParams.get("lang");
  const locale: Locale = routing.locales.includes(lang as Locale)
    ? (lang as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Contact" });

  const [first, last] = profile.name.split(" ");
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(last)};${escape(first)};;;`,
    `FN:${escape(profile.name)}`,
    `TITLE:${escape(t("vcardTitle"))}`,
    "ORG:ESSEC Business School",
    `TEL;TYPE=CELL,VOICE:${profile.phone.replace(/\s/g, "")}`,
    `EMAIL;TYPE=INTERNET,PREF:${profile.email}`,
    `URL:${origin}/`,
    `item1.URL:${profile.linkedin}`,
    "item1.X-ABLabel:LinkedIn",
    `NOTE:${escape(t("vcardNote"))}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(card + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Alaaeddine-Ahriz.vcf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
