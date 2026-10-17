import { ContactBar } from "@/components/ContactBar";
import { CvPreview } from "@/components/CvPreview";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Reveal } from "@/components/Reveal";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LogoMarquee />

      <main>
        <div className="col">
          <header className="reveal d1">
            <h1>{profile.displayName}</h1>
            <p className="lead">{profile.headline}</p>
          </header>

          <ContactBar />

          <Reveal className="cv">
            <h2>Mon CV</h2>
            <CvPreview />
          </Reveal>

          <Reveal className="about">
            <h2>En quelques mots</h2>
            <p>{profile.about}</p>
          </Reveal>
        </div>
      </main>
    </>
  );
}
