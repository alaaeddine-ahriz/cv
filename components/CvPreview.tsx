"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { profile } from "@/lib/site";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * A paper-like preview of the CV's first page, cropped with a fade, that
 * opens a full-screen viewer. Images instead of an embedded PDF: browser PDF
 * viewers bring their own chrome on desktop and barely work on phones.
 */
export function CvPreview() {
  const { cv } = profile;
  const dialog = useRef<HTMLDialogElement>(null);

  const [zoomed, setZoomed] = useState(false);

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  // Tap the page to read the small print: it doubles in size and scrolls so
  // the spot under the finger stays put. Tap again to fit it back.
  const toggleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const scroller = dialog.current;
    if (!scroller) return;
    const img = e.currentTarget;
    const before = img.getBoundingClientRect();
    const fx = (e.clientX - before.left) / before.width;
    const fy = (e.clientY - before.top) / before.height;
    flushSync(() => setZoomed((z) => !z));
    const after = img.getBoundingClientRect();
    scroller.scrollLeft += after.left + fx * after.width - e.clientX;
    scroller.scrollTop += after.top + fy * after.height - e.clientY;
  };


  const alt = `CV d’${profile.name}`;

  return (
    <>
      <button type="button" className="cv-card" onClick={open} aria-label="Agrandir le CV">
        <Image
          src={cv.page.src}
          width={cv.page.width}
          height={cv.page.height}
          alt={alt}
          sizes="(max-width: 608px) calc(100vw - 48px), 560px"
        />
        <span className="cv-card-fade" aria-hidden="true" />
        <span className="cv-card-cta">
          <ExpandIcon />
          Voir le CV en entier
        </span>
      </button>

      <div className="cv-actions">
        <button type="button" className="btn-secondary" onClick={open}>
          <ExpandIcon />
          Agrandir
        </button>
        <a className="btn-secondary" href={cv.href} download={cv.fileName}>
          <DownloadIcon />
          Télécharger
        </a>
        <a className="btn-secondary" href={cv.href} target="_blank" rel="noopener">
          <ExternalIcon />
          PDF
        </a>
      </div>

      <dialog
        ref={dialog}
        className="viewer"
        aria-label={alt}
        data-zoomed={zoomed || undefined}
        onClose={() => setZoomed(false)}
        // A click that lands on the dialog itself (not its content) is a
        // click on the backdrop area around the page.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="viewer-bar">
          <span className="viewer-title">{cv.fileName}</span>
          <div className="viewer-actions">
            <a className="viewer-btn" href={cv.href} download={cv.fileName}>
              <DownloadIcon />
              <span>Télécharger</span>
            </a>
            <a className="viewer-btn" href={cv.href} target="_blank" rel="noopener">
              <ExternalIcon />
              <span>Ouvrir le PDF</span>
            </a>
            <button type="button" className="viewer-btn viewer-close" onClick={close} aria-label="Fermer">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="viewer-page" onClick={(e) => e.target === e.currentTarget && close()}>
          <Image
            src={cv.page.src}
            width={cv.page.width}
            height={cv.page.height}
            alt={alt}
            sizes="(max-width: 900px) 200vw, 1654px"
            quality={90}
            onClick={toggleZoom}
            title={zoomed ? "Dézoomer" : "Zoomer"}
          />
        </div>
      </dialog>
    </>
  );
}
