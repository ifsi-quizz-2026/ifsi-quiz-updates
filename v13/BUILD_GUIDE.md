# Compiler IFSI Quiz V13 en APK privé

Le dépôt `ifsi-quiz-updates` ne contient pas encore le projet Android complet. Le projet Android source est fourni dans une archive séparée ; ne pas prétendre que ce dépôt peut actuellement produire un APK.

## Préparation Android Studio

1. Décompresser l'archive source et ouvrir le dossier contenant `settings.gradle`.
2. Installer Android SDK Platform 35 et les outils de compilation proposés par Android Studio.
3. Utiliser JDK 17, Android Gradle Plugin 8.7.3 et Gradle 8.9 (versions compatibles).
4. Exécuter `node check-project.mjs`, puis les tests Node dans `app/src/main/assets`.
5. Lancer `gradle assembleDebug` (ou l'action correspondante dans Android Studio).
6. Vérifier l'installation, la navigation, le chargement de la banque v164 et la conservation des données sur un appareil Android.

**Diffusion privée** : ne pas distribuer un APK debug. Créer et conserver une clé de signature release, signer les APK suivants avec la même clé et incrémenter `versionCode`.

**Statut** : la compilation APK n'a pas encore été réalisée ni validée dans l'environnement de travail.
