import Image from "next/image";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/marquee";
import { logos } from "@/lib/site";

export function LogoMarquee() {
  const t = useTranslations("Banner");

  return (
    <div
      id="top"
      aria-label={t("label")}
      className="animate-in border-b border-[#ece9e3] bg-white py-4 duration-700 fade-in sm:py-[18px]"
    >
      <Marquee
        pauseOnHover
        className="[--duration:45s] [--gap:2.5rem] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] sm:[--gap:4rem]"
      >
        {logos.map((logo) =>
          logo.src ? (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              style={{ height: logo.height }}
              className="block w-auto max-w-none scale-[0.85] opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:scale-100"
            />
          ) : (
            <span
              key={logo.name}
              className="text-[19px] font-semibold tracking-[-0.01em] whitespace-nowrap text-subtle-foreground"
            >
              {logo.name}
            </span>
          ),
        )}
      </Marquee>
    </div>
  );
}
