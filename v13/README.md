# IFSI Quiz — préparation des mises à jour V13

Cette branche est **expérimentale**. Aucun fichier de ce dossier ne doit être servi comme manifeste de production avant validation.

## Situation constatée
- Le manifeste racine `manifest.json` de la branche principale utilise `version: 38`, `file: library-v38.json`, `sha256`.
- La banque V38 contient des éléments indiquant explicitement que certaines questions nécessitent encore une relecture clinique ou pédagogique.
- La banque cible de 1 578 QCM **n'a pas été importée ni validée dans ce dépôt**.

## Contrat proposé
- `schema_version`: version du format de manifeste.
- `app`: version Android et URL de publication vérifiée, sans installation silencieuse.
- `question_bank`: version indépendante, nombre de questions, chemin de téléchargement, SHA-256, signature et version minimale de l'application.
- `channel`: test ou production ; les clients de production ignorent le canal test.
- Une version inférieure ou égale à la version installée ne doit jamais remplacer les données.
- Télécharger dans un fichier temporaire, vérifier la taille maximale, le SHA-256 **et une signature numérique** avec clé publique embarquée dans l'application, valider le JSON et l'unicité des identifiants avant une activation atomique.
- Conserver la dernière banque fonctionnelle et les données locales (scores, favoris, badges, progression), avec rollback en cas d'échec.
- SHA-256 détecte la corruption mais **n'authentifie pas** à lui seul l'origine du fichier.
- Ne pas publier une banque pédagogique tant que son contenu n'a pas passé la validation prévue.

## Prochaines étapes
1. Obtenir et contrôler l'archive V12 ainsi que les 1 578 QCM réellement disponibles.
2. Implémenter le lecteur de manifeste V13 dans l'application et des tests de migration.
3. Produire une banque versionnée et signée sur un canal de test.
4. Tester les cas hors ligne, fichier altéré, signature invalide, version rétrograde, reprise après coupure, conservation des statistiques.
5. Après revue, publier une release de test et ouvrir une PR vers main.

**Ne pas remplacer le `manifest.json` racine par `manifest.example.json` sans code client compatible et validation.**
