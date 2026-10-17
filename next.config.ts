import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Open the CV in the browser's viewer rather than forcing a download.
        source: "/CV-Alaaeddine-Ahriz.pdf",
        headers: [
          { key: "Content-Disposition", value: 'inline; filename="CV-Alaaeddine-Ahriz.pdf"' },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
