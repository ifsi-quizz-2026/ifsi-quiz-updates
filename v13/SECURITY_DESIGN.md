# V13 — sécurité des futures banques (spécification)

## Décision : aucune activation sans signature

Le manifeste historique v38 ne fournit qu'une empreinte SHA-256 ; celle-ci protège contre les erreurs de transfert mais pas contre une substitution malveillante. Le client V13 ne doit pas activer automatiquement les banques issues de ce format.

## Contrat de distribution

1. Clé publique ECDSA P-256 embarquée dans l'APK et épinglée. Clé privée de publication conservée hors du dépôt et hors de l'APK.
2. Manifeste de canal `production` signé sur ses octets canoniques (format canonique à figer avant publication), incluant version de banque, URL HTTPS autorisée, taille maximale, nombre de questions, SHA-256, version minimale de l'APK.
3. Téléchargement HTTPS depuis une liste explicite d'hôtes autorisés, sans redirection vers un autre domaine. Limite de taille, délai et absence d'exécution du contenu téléchargé.
4. Vérification de la signature du manifeste **avant** de faire confiance à ses champs, puis du SHA-256 de la banque et de sa signature de publication ; vérification du JSON et des identifiants uniques.
5. Version de banque strictement supérieure à la version installée ; ne pas confondre version de l'APK et version de la banque. La banque locale de l'archive Android examinée est v164, tandis que le manifeste public est v38.
6. Préparer une copie temporaire, enregistrer un état de migration, activer atomiquement après validation, garder la dernière version fonctionnelle, restaurer après erreur ou interruption.
7. Ne jamais supprimer les clés de progression `ifsi-history`, `ifsi-v8-active`, préférences et favoris. Vérifier les références à des questions supprimées ; garder les identifiants stables pour éviter les pertes de suivi.
8. Relecture clinique et pédagogique requise avant publication : une validation de schéma ne vaut pas validation médicale.

## État actuel

Ce document est une **spécification**, pas une implémentation. L'APK Android n'est pas compilé ni testé sur appareil. Aucun système de signature ou de rollback opérationnel n'est revendiqué. La branche `main` reste intacte.
