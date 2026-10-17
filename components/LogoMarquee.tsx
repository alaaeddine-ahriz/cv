import Image from "next/image";
import { logos, type Logo } from "@/lib/site";

// The track holds four identical sets and slides by -50% (two sets), so the
// loop is seamless and stays wider than large screens.
const COPIES = 4;

function Item({ logo, hidden }: { logo: Logo; hidden: boolean }) {
  return (
    <li aria-hidden={hidden || undefined}>
      {logo.src ? (
        <Image
          src={logo.src}
          alt={hidden ? "" : logo.name}
          width={logo.width}
          height={logo.height}
        />
      ) : (
        logo.name
      )}
    </li>
  );
}

export function LogoMarquee() {
  return (
    <div className="banner" aria-label="Écoles, entreprises et associations">
      <ul className="marquee">
        {Array.from({ length: COPIES }, (_, copy) =>
          logos.map((logo) => (
            <Item key={`${copy}-${logo.name}`} logo={logo} hidden={copy > 0} />
          )),
        )}
      </ul>
    </div>
  );
}
