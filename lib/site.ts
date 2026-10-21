// Facts that don't change with the language: links, files, logos. The
// wording itself is in messages/fr.json and messages/en.json.

export const siteUrl = "https://alaaeddine-ahriz.vercel.app";

export const profile = {
  // Family name in capitals, the French convention, everywhere it is shown.
  name: "Alaaeddine AHRIZ",
  email: "alaaeddine.ahriz@essec.edu",
  linkedin: "https://www.linkedin.com/in/alaaeddine-ahriz",
  phone: "+33 6 10 73 37 22",
  whatsapp: "https://wa.me/33610733722",
  cv: {
    // Dated file names: a new CV gets a new URL, so no cache (Vercel's CDN,
    // its image optimizer, browsers) can keep serving the previous one. The
    // old address redirects here (next.config.ts).
    href: "/cv/Alaaeddine-AHRIZ-CV-2026-10.pdf",
    fileName: "CV-Alaaeddine-AHRIZ.pdf",
    page: { src: "/cv/cv-2026-10.jpg", width: 1654, height: 2339 },
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
