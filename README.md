# Alaaeddine Ahriz

Page perso (en français) pour ma recherche d'alternance à partir de janvier 2027.

Next.js 16 (App Router, TypeScript), rendu statique, déployé sur Vercel.

| Brique | Rôle |
|---|---|
| [Tailwind CSS v4](https://tailwindcss.com) | Styles (jetons de couleur dans `app/globals.css`) |
| [shadcn/ui](https://ui.shadcn.com) (Radix) | Bouton, menu déroulant, toasts, dans `components/ui/` |
| [Motion](https://motion.dev) | Apparition du titre et du CV |
| [Magic UI Marquee](https://magicui.design) | Bandeau de logos (`components/ui/marquee.tsx`) |
| [Sonner](https://sonner.emilkowal.ski) | Toast « Adresse copiée » |
| [Yet Another React Lightbox](https://yet-another-react-lightbox.com) | Visionneuse du CV avec zoom et téléchargement |
| [Lucide](https://lucide.dev) | Icônes (LinkedIn et WhatsApp viennent de Simple Icons) |
| [next-intl](https://next-intl.dev) | Français et anglais |

`components.json` est la config shadcn : `npx shadcn@latest add <composant>` ajoute d'autres composants au même endroit.

## Développement

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production (vérifie aussi les types)
```

## Langues

Le français est à `/`, l'anglais à `/en`. Il n'y a pas de sélecteur : à chaque visite sur `/`, un navigateur réglé en anglais est envoyé vers `/en`, tous les autres restent en français (pas de cookie, donc rien ne « colle »). Les deux versions sont générées en statique. Le lien partagé pointe toujours vers `/`, pour que la personne qui le reçoit tombe dans sa propre langue.

- Les textes sont dans `messages/fr.json` et `messages/en.json` (mêmes clés des deux côtés).
- La config des langues est dans `i18n/routing.ts`, la redirection dans `proxy.ts`.
- Pour une troisième langue : l'ajouter à `locales` dans `i18n/routing.ts` et créer `messages/<code>.json`.

Le CV n'existe qu'en français ; la version anglaise le signale sous les boutons (`Cv.note`).

## Où modifier quoi

| Quoi | Où |
|---|---|
| Textes (badge, phrase d'accroche, boutons…) | `messages/fr.json`, `messages/en.json` |
| Liens de contact, fichiers du CV | `lib/site.ts` (`profile`) |
| Logos du bandeau | `lib/site.ts` (`logos`) + fichiers dans `public/logos/` |
| Mise en page | `app/[locale]/page.tsx` |
| Titre et badge animés | `components/Hero.tsx` |
| Bandeau défilant | `components/LogoMarquee.tsx` |
| Barre de contact collante, menu Email | `components/ContactBar.tsx` |
| Aperçu du CV et visionneuse | `components/CvPreview.tsx` |
| Bouton « Ajouter aux contacts » et la fiche contact (vCard) | `components/SaveContact.tsx`, `app/contact.vcf/route.ts` (textes : `Contact.vcardTitle`, `Contact.vcardNote`) |
| Bouton « Partager ce profil » (feuille de partage du téléphone sur mobile, menu sur ordinateur) | `components/ShareMenu.tsx` (messages pré-remplis : `Share.subject`, `Share.body`, `Share.short` dans `messages/*.json`) |
| Couleurs, rayons, police, style de la visionneuse | `app/globals.css` |
| SEO, Open Graph, hreflang | `app/[locale]/layout.tsx` (l'URL du site est `siteUrl` dans `lib/site.ts`) |

## Logos

Chaque entrée de `logos` prend un `name`, et optionnellement `src`, `width` et `height` (en px, à la taille affichée). Sans `src`, le nom s'affiche en texte. Les logos passent en niveaux de gris à 75 % d'opacité et reprennent leurs couleurs au survol. Les marques carrées ou chargées ont besoin d'un peu plus de hauteur que les logotypes larges pour paraître de même poids.

## Mettre à jour le CV

1. Remplacer `public/CV-Alaaeddine-Ahriz.pdf`.
2. Régénérer l'image de la page (aperçu et visionneuse) :
   ```sh
   pdftoppm -jpeg -jpegopt quality=90 -r 200 -f 1 -l 1 -singlefile public/CV-Alaaeddine-Ahriz.pdf public/cv/page-1
   convert public/cv/page-1.jpg -strip -quality 84 public/cv/page-1.jpg
   ```
   Si le CV passe à plusieurs pages ou change de format, mettre à jour `cv.page` dans `lib/site.ts`.

## Déploiement

Vercel détecte Next.js (forcé par `vercel.json`). Chaque push sur `main` redéploie.
