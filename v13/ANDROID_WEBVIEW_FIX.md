# Correction indispensable du chargement du module V13

Le projet Android WebView charge `index.html` depuis `https://appassets.androidplatform.net/` via `shouldInterceptRequest`. La page importe `./update-check.mjs` avec `<script type="module">`.

**Défaut identifié** : le mapping MIME du WebView traitait `.mjs` comme `text/html`, ce qui empêche les navigateurs de charger le module JavaScript (strict MIME checking). Le bouton de vérification des mises à jour ne pouvait donc pas fonctionner normalement.

**Correction apportée à l'archive source Android V13** :

```java
String mime=file.endsWith(".json")?"application/json":
 (file.endsWith(".js")||file.endsWith(".mjs"))?"application/javascript":
 file.endsWith(".svg")?"image/svg+xml":
 file.endsWith(".webmanifest")?"application/manifest+json":"text/html";
```

**Contrôle réalisé** : `node app/src/main/assets/update-check.test.mjs` → `9 assertions V13: OK`. Archive ZIP vérifiée (`testzip` sans erreur).

**Limites** : aucune compilation Android ni test sur appareil ; le contrôle de mise à jour est toujours en lecture seule et n'installe aucun contenu. L'archive Android reste un artefact distinct de ce dépôt GitHub, qui héberge actuellement la banque distante et les modules expérimentaux.
