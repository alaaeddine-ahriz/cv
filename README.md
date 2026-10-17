# Alaaeddine Ahriz

Page perso (en français) pour ma recherche d'alternance à partir de janvier 2027.

Site statique, sans build : `index.html`, le CV en PDF, un aperçu JPG de la première page (affiché sur mobile, où les PDF en iframe passent mal) et une image Open Graph.

## En local

```sh
npx serve .
```

## Déploiement

Vercel, preset **Other**, pas de commande de build, dossier de sortie `.` (racine). Chaque push sur `main` redéploie.

## Mettre à jour le CV

1. Remplacer `CV-Alaaeddine-Ahriz.pdf`.
2. Régénérer l'aperçu :
   ```sh
   pdftoppm -png -r 110 -f 1 -l 1 -singlefile CV-Alaaeddine-Ahriz.pdf cv-apercu
   convert cv-apercu.png -resize 760x -strip -quality 78 cv-apercu.jpg && rm cv-apercu.png
   ```

## Logos

Le bandeau défilant affiche les noms en texte. Pour passer aux vrais logos, mettre les fichiers dans `logos/` et remplacer chaque `<li>Nom</li>` par `<li><img src="/logos/nom.svg" alt="Nom"></li>` (dans les deux copies de la liste). Le style (28px de haut, niveaux de gris, opacité 0.75) est déjà en place.
