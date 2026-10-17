import Image from "next/image";
import { ContactBar } from "@/components/ContactBar";
import { LogoMarquee } from "@/components/LogoMarquee";
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
  const { cv } = profile;

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

          <section className="cv reveal d3">
            <h2>Mon CV</h2>
            <div className="cv-actions">
              <a className="btn-secondary" href={cv.href} target="_blank" rel="noopener">
                Voir le CV
              </a>
              <a className="btn-secondary" href={cv.href} download={cv.fileName}>
                Télécharger en PDF
              </a>
            </div>
            <iframe
              className="cv-frame"
              src={`${cv.href}#view=FitH`}
              title={`CV ${profile.name}`}
              loading="lazy"
            />
            {/* Phones and tablets render PDFs in iframes badly, so they get a
                picture of page 1 that opens the PDF instead. */}
            <a className="cv-image" href={cv.href} target="_blank" rel="noopener">
              <Image
                src={cv.preview.src}
                width={cv.preview.width}
                height={cv.preview.height}
                alt={`Aperçu du CV d’${profile.name}, ouvrir le PDF`}
                sizes="(max-width: 608px) calc(100vw - 48px), 560px"
              />
            </a>
          </section>

          <section className="about reveal d4">
            <h2>En quelques mots</h2>
            <p>{profile.about}</p>
          </section>
        </div>
      </main>
    </>
  );
}
