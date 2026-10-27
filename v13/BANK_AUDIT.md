# Audit structurel de la banque Android V13 (27 octobre 2026)

Archive source Android examinée : `IFSI_Quiz_Android_V13_Source.zip` ; banque embarquée `library-v164.json`.

- Version locale : **164** (distincte de la version 38 publiée sur la branche principale GitHub).
- Total : **1 578 QCM**.
- Répartition : S1 313 ; S2 265 ; S3 251 ; S4 249 ; S5 250 ; S6 250.
- Identifiants en double : **0**.
- Questions structurellement invalides (question absente, réponses non quadruples ou index de correction hors bornes) : **0**.
- Champ `url` renseigné : **1 578**, ce qui ne démontre **pas** que les liens sont valides ou spécifiques.
- De nombreuses questions portent des mentions de validation clinique ou pédagogique requise. La relecture médicale individuelle n'a pas été effectuée dans cet audit.

**Conséquence :** ne pas publier une mise à jour GitHub v38 comme si elle était plus récente que la banque embarquée v164. Ne pas activer automatiquement de banque distante avant vérification de signature et validation pédagogique.
