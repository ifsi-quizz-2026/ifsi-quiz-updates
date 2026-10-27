# Distribution privée d'IFSI Quiz

L'application est destinée à la famille et éventuellement à quelques collègues, sans publication sur le Play Store.

- Préférer un **APK signé en release** distribué directement aux personnes concernées. Ne pas diffuser une clé privée de signature ni la stocker dans GitHub.
- Garder le même `applicationId` et la **même clé de signature** pour toutes les versions ; augmenter `versionCode` pour chaque nouvelle version. Une installation avec une autre clé ne peut pas mettre à jour normalement l'application existante.
- La progression est stockée localement : la mise à jour de l'APK conserve normalement les données si l'application n'est pas désinstallée et si l'identifiant et la signature restent compatibles.
- Pour éviter les pertes accidentelles, prévoir une fonction **exporter/importer une sauvegarde** avant de partager des mises à jour avec plusieurs personnes.
- La banque locale v164 est plus récente que la banque GitHub v38 : ne jamais proposer une rétrogradation automatique.
- Les mises à jour de banque via réseau peuvent rester **désactivées** tant que les 1 578 QCM sont intégrés à l'APK. Cela simplifie la maintenance privée.
- La visibilité du dépôt `ifsi-quiz-updates` est actuellement **publique** : ne pas y publier des données privées, des clés de signature ou le code de l'application si sa diffusion doit rester restreinte.

**Attention :** l'APK debug sert aux tests et ne doit pas être présenté comme une version finale à diffuser. Une compilation, une installation sur appareil et des tests de migration restent nécessaires.
