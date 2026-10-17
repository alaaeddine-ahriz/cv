# Alaaeddine Ahriz

Page perso (en français) pour ma recherche d'alternance à partir de janvier 2027.

Next.js (App Router, TypeScript), rendu statique, déployé sur Vercel.

## Développement

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production (vérifie aussi les types)
```

## Où modifier quoi

| Quoi | Où |
|---|---|
| Textes, liens de contact, CV | `lib/site.ts` (`profile`) |
| Logos du bandeau | `lib/site.ts` (`logos`) + fichiers dans `public/logos/` |
| Mise en page | `app/page.tsx` |
| Bandeau défilant | `components/LogoMarquee.tsx` |
| Barre de contact collante | `components/ContactBar.tsx` |
| Styles | `app/globals.css` |
| SEO, Open Graph | `app/layout.tsx` (l'URL du site est `siteUrl` dans `lib/site.ts`) |

## Logos

Chaque entrée de `logos` prend un `name`, et optionnellement `src`, `width` et `height` (en px, à la taille affichée). Sans `src`, le nom s'affiche en texte (c'est le cas d'Eaton). Les logos passent en niveaux de gris à 75 % d'opacité. Les marques carrées ou chargées ont besoin d'un peu plus de hauteur que les logotypes larges pour paraître de même poids.

## Mettre à jour le CV

1. Remplacer `public/CV-Alaaeddine-Ahriz.pdf`.
2. Régénérer l'aperçu (affiché sur mobile, où les PDF en iframe passent mal) :
   ```sh
   pdftoppm -png -r 110 -f 1 -l 1 -singlefile public/CV-Alaaeddine-Ahriz.pdf cv-apercu
   convert cv-apercu.png -resize 760x -strip -quality 78 public/cv-apercu.jpg && rm cv-apercu.png
   ```

## Déploiement

Vercel détecte Next.js (forcé par `vercel.json`). Chaque push sur `main` redéploie.
