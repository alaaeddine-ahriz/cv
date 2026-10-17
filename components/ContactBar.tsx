"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/site";

// Lucide dropped brand marks, so these two come from Simple Icons.
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Tighter on small phones so three labels still fit on one row.
const contactButton = "h-12 w-full max-[420px]:gap-1.5 max-[420px]:px-1 max-[420px]:text-sm max-[420px]:[&_svg]:size-4";

/**
 * mailto: does nothing for people on webmail without a mail handler, so the
 * Email button offers to copy the address too.
 */
function EmailMenu() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Adresse copiée", { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ink" className={contactButton}>
          <Mail />
          Email
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{profile.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={`mailto:${profile.email}`}>
            <Mail />
            Écrire un email
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={copy}>
          <Copy />
          Copier l’adresse
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * The three contact buttons, pinned to the top of the viewport once the
 * reader scrolls past them. A zero-height sentinel just above the bar tells
 * us when it is stuck; only then does the frosted band appear behind it.
 */
export function ContactBar() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Margins put the sentinel at the bar's top edge without adding a gap. */}
      <div ref={sentinel} aria-hidden="true" className="-mt-3 -mb-6 h-0" />
      <nav
        aria-label="Me contacter"
        data-stuck={stuck || undefined}
        className={cn(
          "group/bar sticky top-0 z-40 -my-3 py-3",
          "animate-in duration-700 fill-mode-both fade-in slide-in-from-bottom-3 [animation-delay:350ms]",
          // Full-bleed frosted band, faded in only while stuck.
          "before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:border-[#ece9e3] before:bg-background/90 before:opacity-0 before:shadow-[0_6px_20px_-14px_rgb(29_28_26/0.25)] before:backdrop-blur-md before:backdrop-saturate-150 before:transition-opacity before:duration-300 before:content-['']",
          "data-[stuck]:before:opacity-100",
        )}
      >
        <div className="grid grid-cols-3 gap-1.5 min-[421px]:gap-2.5">
          <Button asChild variant="linkedin" className={contactButton}>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="whatsapp" className={contactButton}>
            <a href={profile.whatsapp} target="_blank" rel="noopener">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </Button>
          <EmailMenu />
        </div>
      </nav>
    </>
  );
}
