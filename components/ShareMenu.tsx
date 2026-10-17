"use client";

import { useEffect, useState } from "react";
import { Copy, Link2, Mail, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LinkedInIcon, WhatsAppIcon } from "@/components/icons";
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
 * Lets a visitor forward the profile (think: a CEO sending it to their HR
 * director) with a message already written: by email, WhatsApp, LinkedIn,
 * or copied for Teams/Slack. Where the browser has a native share sheet,
 * that's offered too.
 */
export function ShareMenu({
  children,
  align = "center",
}: {
  /** The trigger; receives the menu's open/close wiring through asChild. */
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}) {
  const t = useTranslations("Share");
  const url = useProfileUrl();
  const [canShareNatively, setCanShareNatively] = useState(false);
  useEffect(() => setCanShareNatively(typeof navigator.share === "function"), []);

  const subject = t("subject");
  const body = t("body", { url });
  const short = t("short", { url });

  const copy = async (text: string, title: string, description?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(title, { description });
    } catch {
      // Clipboard blocked (old browser, insecure context): email still works.
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const shareNatively = async () => {
    try {
      await navigator.share({ title: subject, text: short.replace(url, "").trim(), url });
    } catch {
      // Dismissed by the user; nothing to do.
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[15rem]">
        <DropdownMenuLabel>{t("menuLabel")}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
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
        {canShareNatively && (
          <DropdownMenuItem onSelect={shareNatively}>
            <Share2 />
            {t("native")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Closing card under the CV: the share prompt, spelled out. */
export function ShareCard() {
  const t = useTranslations("Share");
  return (
    <section
      aria-labelledby="share-title"
      className="flex flex-col items-start gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 id="share-title" className="text-[17px] font-semibold tracking-[-0.01em]">
          {t("title")}
        </h2>
        <p className="text-[15px] leading-snug text-pretty text-muted-foreground">{t("description")}</p>
      </div>
      <ShareMenu align="end">
        <button
          type="button"
          className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-[15px] font-semibold text-primary-foreground outline-none transition hover:bg-black focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.97] data-[state=open]:bg-black max-sm:w-full max-sm:justify-center [&_svg]:size-[18px]"
        >
          <Share2 />
          {t("button")}
        </button>
      </ShareMenu>
    </section>
  );
}

/** Compact share button for the top corner of the page. */
export function ShareButton() {
  const t = useTranslations("Share");
  return (
    <ShareMenu align="end">
      <button
        type="button"
        aria-label={t("button")}
        title={t("button")}
        className="inline-flex size-[30px] cursor-pointer items-center justify-center rounded-full border bg-card text-muted-foreground shadow-xs outline-none transition hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-95 data-[state=open]:text-foreground [&_svg]:size-[15px]"
      >
        <Share2 />
      </button>
    </ShareMenu>
  );
}
