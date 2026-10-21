import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // The full-screen CV viewer asks for 90 so small print stays crisp.
  images: { qualities: [75, 90] },
  async headers() {
    return [
      {
        // Open the CV in the browser's viewer rather than forcing a download.
        source: "/cv/:file*.pdf",
        headers: [
          { key: "Content-Disposition", value: 'inline; filename="CV-Alaaeddine-AHRIZ.pdf"' },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Links shared before the CV got dated file names. Temporary (307),
        // so browsers ask again and always land on the current CV.
        source: "/CV-Alaaeddine-Ahriz.pdf",
        destination: "/cv/Alaaeddine-AHRIZ-CV-2026-10.pdf",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
