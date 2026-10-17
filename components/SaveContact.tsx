import { UserPlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

/**
 * Downloads the contact card (app/contact.vcf). iOS opens it straight in the
 * "new contact" sheet, Android offers to import it, desktops save the file.
 */
export function SaveContact({ className }: { className?: string }) {
  const t = useTranslations("Contact");
  const locale = useLocale();
  return (
    <Button asChild variant="outline" size="md" className={className}>
      <a href={`/contact.vcf?lang=${locale}`} download="Alaaeddine-Ahriz.vcf">
        <UserPlus />
        {t("save")}
      </a>
    </Button>
  );
}
