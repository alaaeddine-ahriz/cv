import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ContactBar } from "@/components/ContactBar";
import { CvPreview } from "@/components/CvPreview";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ShareButton, ShareCard } from "@/components/ShareMenu";
import { profile, siteUrl } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin],
  alumniOf: ["INSA Lyon", "KAIST"],
  affiliation: "ESSEC Business School",
  knowsLanguage: ["ar", "fr", "en", "es"],
};

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Footer");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LogoMarquee />

      <main className="relative isolate flex min-h-svh justify-center px-6 pt-16 pb-16 sm:pt-[clamp(48px,10vh,110px)]">
        {/* Faint dot grid behind the top of the page, fading out downwards. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(#d9d5ce_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        />
        <div className="absolute top-3 right-4 sm:top-5 sm:right-6">
          <ShareButton />
        </div>
        <div className="flex w-full max-w-[560px] flex-col gap-8 sm:gap-9">
          <Hero />
          <ContactBar />
          <CvPreview />
          <ShareCard />
        </div>
      </main>

      <footer className="border-t border-[#ece9e3] px-6 py-6 text-center text-sm text-subtle-foreground">
        {t("rights", { year: new Date().getFullYear() })}
      </footer>
    </>
  );
}
