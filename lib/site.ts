// Everything the page says lives here, so new sections or languages don't
// mean digging through markup.

export const siteUrl = "https://alaaeddine-ahriz.vercel.app";

export const profile = {
  name: "Alaaeddine Ahriz",
  displayName: "Alaaeddine AHRIZ",
  headline:
    "Ingénieur INSA Lyon et étudiant à l’ESSEC. Je recherche une alternance de 24 mois à partir de janvier 2027 en conseil, transformation digitale ou industrie.",
  shortHeadline:
    "Ingénieur INSA Lyon, étudiant à l’ESSEC. Alternance de 24 mois dès janvier 2027 en conseil, transformation digitale ou industrie.",
  about:
    "J’ai passé trois ans en apprentissage chez CGI, dont huit mois comme Product Owner pour ENEDIS. Avant l’ESSEC, j’ai étudié à l’INSA Lyon et fait un semestre d’échange au KAIST, en Corée du Sud. Je parle arabe, français, anglais et espagnol.",
  email: "alaaeddine.ahriz@essec.edu",
  linkedin: "https://www.linkedin.com/in/alaaeddine-ahriz",
  whatsapp: "https://wa.me/33610733722",
  cv: {
    href: "/CV-Alaaeddine-Ahriz.pdf",
    fileName: "CV-Alaaeddine-Ahriz.pdf",
    page: { src: "/cv/page-1.jpg", width: 1654, height: 2339 },
  },
};

export type Logo = {
  name: string;
  /** Omit to show the name as a text wordmark. */
  src?: string;
  width?: number;
  height?: number;
};

// Heights are tuned by eye: square or detailed marks get more room than
// wide wordmarks so they read at the same weight.
export const logos: Logo[] = [
  { name: "ESSEC", src: "/logos/essec.png", width: 47, height: 44 },
  { name: "INSA Lyon", src: "/logos/insa-lyon.png", width: 129, height: 28 },
  { name: "KAIST", src: "/logos/kaist.png", width: 98, height: 28 },
  { name: "CGI", src: "/logos/cgi.png", width: 60, height: 28 },
  { name: "ENEDIS", src: "/logos/enedis.png", width: 117, height: 24 },
  { name: "Eaton", src: "/logos/eaton.png", width: 88, height: 24 },
  { name: "Efficience Engineering", src: "/logos/efficience.svg", width: 90, height: 28 },
  { name: "ESSEC Club of Economics", src: "/logos/essec-club-economics.png", width: 120, height: 36 },
  { name: "ACEIMI", src: "/logos/aceimi.png", width: 71, height: 40 },
];
