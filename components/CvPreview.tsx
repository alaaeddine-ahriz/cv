"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Download, ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import DownloadPlugin from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/site";

// Serve the lightbox through Next's image optimizer too, at a couple of
// widths it allows (see deviceSizes), so phones don't pull the full file.
const { cv } = profile;
const imageUrl = (w: number) =>
  `/_next/image?url=${encodeURIComponent(cv.page.src)}&w=${w}&q=90`;
const srcSet = [1080, 1920].map((w) => ({
  src: imageUrl(w),
  width: Math.min(w, cv.page.width),
  height: Math.round((Math.min(w, cv.page.width) * cv.page.height) / cv.page.width),
}));

/**
 * The CV's first page as a plain sheet. Clicking it opens a lightbox (Yet
 * Another React Lightbox) with pinch, wheel and double-tap zoom.
 */
export function CvPreview() {
  const [open, setOpen] = useState(false);
  const alt = `CV d’${profile.name}`;

  return (
    <motion.section
      aria-label="CV"
      className="flex flex-col gap-3.5"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Agrandir le CV"
        className="block cursor-pointer overflow-hidden rounded-lg border bg-white shadow-[0_1px_2px_rgb(29_28_26/0.06),0_8px_24px_-8px_rgb(29_28_26/0.14)] outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgb(29_28_26/0.06),0_18px_40px_-12px_rgb(29_28_26/0.22)] focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.995]"
      >
        <Image
          src={cv.page.src}
          width={cv.page.width}
          height={cv.page.height}
          alt={alt}
          sizes="(max-width: 608px) calc(100vw - 48px), 560px"
          className="block h-auto w-full"
        />
      </button>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2.5">
        <Button asChild variant="outline">
          <a href={cv.href} download={cv.fileName}>
            <Download />
            Télécharger
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={cv.href} target="_blank" rel="noopener">
            <ExternalLink />
            Ouvrir le PDF
          </a>
        </Button>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom, DownloadPlugin]}
        slides={[
          {
            src: imageUrl(1920),
            alt,
            width: cv.page.width,
            height: cv.page.height,
            srcSet,
            download: { url: cv.href, filename: cv.fileName },
          },
        ]}
        carousel={{ finite: true, padding: "16px" }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        labels={{
          Close: "Fermer",
          Download: "Télécharger le PDF",
          "Zoom in": "Zoomer",
          "Zoom out": "Dézoomer",
        }}
        styles={{ container: { backgroundColor: "rgb(20 19 18 / 0.9)" } }}
      />
    </motion.section>
  );
}
