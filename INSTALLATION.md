# Installation

Cette version utilise un dictionnaire de **64 077 formes reconnues** (environ 2,4 Mo), généré à partir de Dicollecte 6.4.1 et complété par tes correspondances. Ce nombre inclut les féminins et les pluriels : ce ne sont pas 64 077 mots de base différents.

## 1. Ajouter le dictionnaire sur GitHub

Dans ton dépôt `delulucriminou/en_inclusif`, sur la branche `main`, ajoute à la racine :

- `dictionnaire-inclusif.json`
- `NOTICE-Dicollecte.txt`
- `LICENSE-MPL-2.0.txt`

Sur GitHub, tu peux utiliser **Add file → Upload files**, puis enregistrer les fichiers avec **Commit changes**. Le dépôt doit permettre la lecture publique du fichier. Le script attend cette adresse exacte :

https://raw.githubusercontent.com/delulucriminou/en_inclusif/main/dictionnaire-inclusif.json

Ces fichiers ont été préparés localement ; ils ne sont pas encore publiés sur GitHub.

## 2. Remplacer le JavaScript du forum

Remplace entièrement ton ancien JavaScript inclusif par le contenu de `javascript.js`, sans balises `<script>`. Ne conserve pas les deux versions actives.

Garde ton template actuel et son bouton `replaceButton`. Le script doit être chargé sur les pages des sujets et du formulaire complet. Recharge la page après l'installation.

Le clic convertit uniquement la sélection. Pendant le premier chargement, le bouton peut attendre jusqu'à six secondes. Si le texte change pendant l'attente, le script demande une nouvelle sélection plutôt que de modifier une sélection périmée.

## 3. Vérifier

Sélectionne :

    animateur.ice animateurs informaticiens étudiantes

Résultat attendu avec le dictionnaire élargi :

    animateur·ice animateur·ice·s informaticien·ne·s étudiant·e·s

Le titre affiché au survol du bouton indique si le dictionnaire élargi ou le secours est actif. Si `informaticiens` reste inchangé et que le titre indique le secours, vérifie la publication et l'adresse du JSON.

## Modifier les correspondances

Dans `dictionnaire-inclusif.json`, les correspondances sont dans `entries`. Modifie ou ajoute les formes exactes souhaitées, avec des guillemets doubles et des virgules entre les lignes :

    "animateur": "animateur·ice",
    "animatrice": "animateur·ice",
    "animateurs": "animateur·ice·s",
    "animatrices": "animateur·ice·s"

Les modifications du JSON distant sont reprises à la prochaine ouverture de page après expiration du cache de 24 heures. Pour forcer une actualisation sur ton navigateur, exécute `localStorage.removeItem('en-inclusif-dictionary-v1')` dans la console du forum, puis recharge la page.

`personnalisations.json` est une sauvegarde de tes correspondances prioritaires utilisées pendant la génération ; le navigateur ne charge que `dictionnaire-inclusif.json`. Modifier cette sauvegarde seule ne change donc pas les conversions du forum.

## Fonctionnement et limites

- La base est téléchargée une fois puis mise en cache, si le navigateur permet le stockage. Aucun texte de message n'est envoyé à GitHub.
- Si GitHub est indisponible, le script garde le cache existant, ou utilise les 962 correspondances intégrées de secours. Le dictionnaire élargi ne sera disponible qu'après publication du JSON.
- Les points des suffixes inclusifs, notamment `.ice`, `.ices`, `.rice`, `.e` et `.s`, sont normalisés indépendamment du dictionnaire.
- La convention choisie est `animateur·ice` et `animateur·ice·s`. Les autres correspondances personnelles restent prioritaires sur les formes calculées.
- L'import utilise des couples masculin/féminin du même identifiant lexical et leurs pluriels explicites. Les groupes ayant plusieurs singuliers concurrents sont ignorés. Les conflits de correspondances et les formes reconnues comme mots grammaticaux ou verbes conjugués sont écartés de l'import automatique. Les correspondances personnelles sont ensuite appliquées.
- Les nouvelles formes inclusives sont **calculées**, pas validées individuellement par une personne. Dicollecte est une base de français, pas un dictionnaire inclusif officiel.
- Ce script n'analyse pas les accords de toute la phrase. Des adjectifs décrivant des objets peuvent être transformés. Les mots ambigus comme `heureux` conservent par défaut la forme inclusive singulière. Les déterminants ne sont pas systématiquement convertis.
- En mode visuel, la mise en forme est conservée en traitant les fragments de texte séparément. Un mot coupé en plusieurs fragments par du gras ou de l'italique peut ne pas être reconnu.
- Les URL, e-mails et balises sont préservés. Les blocs BBCode `[code]` sont protégés dans une sélection textuelle complète ; les éléments HTML `code` et `pre` sont ignorés dans l'éditeur visuel.

## Origine et licence

Source : Dicollecte 6.4.1, Olivier R., https://grammalecte.net/ ; copie distribuée par https://lexique.org/databases/Dicollecte/.

Le dictionnaire dérivé est fourni sous MPL 2.0, avec sa notice et le texte de licence joints. Modifications : extraction de couples genrés, génération de formes inclusives, filtres d'ambiguïté et ajout de correspondances personnelles, septembre 2026. Le JSON livré constitue la forme éditable de ces données.

Vérifications locales : `node test.cjs`. Elles couvrent notamment le paragraphe fourni, les nouveaux mots, la sélection au clic, les suffixes, le cache, le secours et le rejet d'un dictionnaire mal formé. L'intégration réelle sur le forum reste à vérifier après installation.
