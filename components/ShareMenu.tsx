"use client";

import { useEffect, useState } from "react";
import { Copy, Link2, Mail, Share2 } from "lucide-react";
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

/**
 * The site's root on whatever domain it's served from. Always "/", not
 * "/en": the person receiving it lands in their own browser's language.
 */
function useProfileUrl() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(new URL("/", window.location.origin).toString()), []);
  return url;
}

/**
 * Phones and tablets with a native share sheet use it straight away: people
 * know it, and it reaches Mail, Messages, Teams, Slack... Desktop browsers
 * get our own menu instead (their share dialogs are sparse or missing).
 */
function usePrefersNativeShare() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    setPrefers(
      typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches,
    );
  }, []);
  return prefers;
}

/**
 * "Share this profile": lets a visitor forward the profile (think: a CEO
 * sending it to their HR director) with a message already written. An
 * outlined button under the contact buttons: secondary to contacting.
 */
export function ShareCta({ className }: { className?: string }) {
  const t = useTranslations("Share");
  const url = useProfileUrl();
  const native = usePrefersNativeShare();

  const subject = t("subject");
  const body = t("body", { url });
  const short = t("short", { url });
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copy = async (text: string, title: string, description?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(title, { description });
    } catch {
      // Clipboard blocked (old browser, insecure context): email still works.
      window.location.href = mailto;
    }
  };

  const shareNatively = async () => {
    try {
      // The URL travels separately, so it's left out of the text.
      await navigator.share({ title: subject, text: short.replace(url, "").trim(), url });
    } catch (error) {
      // Dismissing the sheet is an AbortError; anything else, fall back.
      if ((error as Error).name !== "AbortError") window.location.href = mailto;
    }
  };

  if (native) {
    return (
      <Button variant="outline" size="md" className={className} onClick={shareNatively}>
        <Share2 />
        {t("button")}
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="md" className={className}>
          <Share2 />
          {t("button")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[15rem]">
        <DropdownMenuLabel>{t("menuLabel")}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={mailto}>
            <Mail />
            {t("email")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`https://wa.me/?text=${encodeURIComponent(short)}`} target="_blank" rel="noopener">
            <WhatsAppIcon />
            {t("whatsapp")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
            {t("linkedin")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => copy(body, t("copiedMessage"), t("copiedMessageHint"))}>
          <Copy />
          {t("copyMessage")}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => copy(url, t("copiedLink"), url)}>
          <Link2 />
          {t("copyLink")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
