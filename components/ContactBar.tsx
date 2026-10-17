"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LinkedInIcon, WhatsAppIcon } from "@/components/icons";
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

// Same size as the page's other buttons; on small phones the padding
// tightens so three labels still fit on one row.
const contactButton = "w-full max-[420px]:gap-1 max-[420px]:px-1";

/**
 * mailto: does nothing for people on webmail without a mail handler, so the
 * Email button offers to copy the address too.
 */
function EmailMenu() {
  const t = useTranslations("Contact");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success(t("copied"), { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ink" size="md" className={contactButton}>
          <Mail />
          {t("email")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{profile.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={`mailto:${profile.email}`}>
            <Mail />
            {t("write")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={copy}>
          <Copy />
          {t("copy")}
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
  const t = useTranslations("Contact");
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
        aria-label={t("label")}
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
          <Button asChild variant="linkedin" size="md" className={contactButton}>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="whatsapp" size="md" className={contactButton}>
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
