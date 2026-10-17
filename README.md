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

Les logos du bandeau sont dans `logos/` (ESSEC, INSA Lyon, KAIST, CGI, ENEDIS, Efficience). Eaton et McKinsey Forward sont encore en texte. Pour en ajouter un, déposer le fichier dans `logos/` et remplacer `<li>Nom</li>` par `<li><img src="/logos/nom.png" alt="Nom" width="…" height="28"></li>`, dans les deux copies de la liste. Le CSS les passe en niveaux de gris à 75 % d'opacité.
