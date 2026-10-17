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
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
            <h1>{profile.displayName}</h1>
            <p className="lead">{profile.headline}</p>
          </header>

          <ContactBar />

          <Reveal className="about" aria-label="En quelques mots">
            <ul className="facts">
              {profile.highlights.map((h) => (
                <li key={h.value}>
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="cv">
            <CvPreview />
          </Reveal>
        </div>
      </main>
    </>
  );
}
