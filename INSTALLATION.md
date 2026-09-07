# Installation

Le module utilise un dictionnaire de **64 128 formes**, construit à partir de Dicollecte 6.4.1 et complété par les correspondances choisies pour le forum. Il pèse environ 2,4 Mo. Ce total comprend les masculins, les féminins et les pluriels d’un même mot.

## Mise à jour du 7 septembre

Cette version ajoute ou reprend 82 correspondances prioritaires, reconnaît 8 anciennes graphies et complète le traitement des pronoms et des possessifs.

Pour en profiter, remplace le JavaScript du forum par le contenu de `javascript.js`. Les exceptions sont intégrées au script : elles fonctionnent même si le navigateur utilise encore l’ancien dictionnaire en cache.

Les choix d’écriture et leurs sources sont détaillés dans `EXCEPTIONS-SOURCES.md`. Le fichier `exceptions-blog.json` reprend les exceptions pour pouvoir les consulter ; il n’est pas téléchargé par le navigateur.

Pense aussi à mettre à jour `javascript.js` et `dictionnaire-inclusif.json` sur GitHub, puis à ajouter `EXCEPTIONS-SOURCES.md` et `exceptions-blog.json`. Ces changements ont été préparés localement, mais n’ont pas été publiés depuis cet espace de travail.

## 1. Mettre le dictionnaire sur GitHub

Dans le dépôt `passifloram/inclusivwriting`, sur la branche `main`, les fichiers suivants doivent se trouver à la racine :

- `dictionnaire-inclusif.json`
- `NOTICE-Dicollecte.txt`
- `LICENSE-MPL-2.0.txt`

Ils sont déjà présents dans le dépôt. Pour les remplacer, utilise **Add file → Upload files**, puis **Commit changes**.

Le dictionnaire doit rester accessible publiquement à [cette adresse](https://raw.githubusercontent.com/passifloram/inclusivwriting/main/dictionnaire-inclusif.json), utilisée par le script :

```text
https://raw.githubusercontent.com/passifloram/inclusivwriting/main/dictionnaire-inclusif.json
```

## 2. Installer le JavaScript sur le forum

Remplace entièrement l’ancien script inclusif par le contenu de `javascript.js`, **sans ajouter de balises `<script>`**. Une seule version doit rester active.

Tu peux garder ton template et son bouton `replaceButton`. Le JavaScript doit être chargé aussi bien dans les sujets, pour les réponses rapides, que dans le formulaire complet de rédaction.

Recharge ensuite la page.

Le bouton convertit uniquement le texte sélectionné. Au premier chargement, il peut attendre jusqu’à six secondes pour récupérer le dictionnaire. Si tu modifies le texte entre-temps, le script te demande de refaire la sélection pour éviter de remplacer le mauvais passage.

## 3. Vérifier que tout fonctionne

Sélectionne ce texte, puis clique sur le bouton :

```text
animateur.ice animateurs informaticiens étudiantes
```

Avec le dictionnaire complet, tu dois obtenir :

```text
animateur·ice animateur·ice·s informaticien·ne·s étudiant·e·s
```

Au survol du bouton, une indication précise si le dictionnaire complet ou celui de secours est utilisé.

Si `informaticiens` reste inchangé et que le bouton indique le dictionnaire de secours, vérifie que le fichier JSON est bien publié et accessible à l’adresse prévue.

## Modifier les correspondances

Les correspondances se trouvent dans la partie `entries` de `dictionnaire-inclusif.json`. Tu peux y ajouter des mots ou modifier leur résultat.

Chaque forme doit avoir sa propre entrée, entre guillemets doubles :

```json
"animateur": "animateur·ice",
"animatrice": "animateur·ice",
"animateurs": "animateur·ice·s",
"animatrices": "animateur·ice·s"
```

Sépare les entrées par des virgules, sans en ajouter après la dernière entrée de l’objet.

Le navigateur conserve le dictionnaire en cache pendant 24 heures. Les changements seront donc récupérés lors d’une ouverture de page après l’expiration de ce délai.

Pour les voir tout de suite sur ton navigateur, exécute cette ligne dans la console du forum, puis recharge la page :

```javascript
localStorage.removeItem('en-inclusif-dictionary-v1');
```

Le fichier `personnalisations.json` garde une copie des correspondances personnelles utilisées pour générer le dictionnaire. Le modifier seul ne change rien sur le forum : le navigateur télécharge uniquement `dictionnaire-inclusif.json`.

## Comment fonctionne le module

Le dictionnaire est téléchargé, puis conservé dans le navigateur lorsque le stockage est disponible. **Le texte des messages n’est pas envoyé à GitHub** : la conversion se fait dans le navigateur.

Si GitHub est inaccessible, le script utilise le dictionnaire déjà en cache. À défaut, il dispose de 962 correspondances de secours intégrées au JavaScript. Le dictionnaire complet doit être publié pour pouvoir être téléchargé.

Les points simples des terminaisons inclusives, comme `.ice`, `.ices`, `.rice`, `.e` et `.s`, sont remplacés par des points médians indépendamment du dictionnaire.

Le module conserve les formes `animateur·ice` et `animateur·ice·s`. Les correspondances personnelles passent avant les formes générées automatiquement.

### La construction du dictionnaire

Le dictionnaire rapproche les formes masculines et féminines d’une même entrée de Dicollecte, ainsi que leurs pluriels lorsqu’ils sont indiqués.

Certains cas sont écartés pendant la génération : les entrées comportant plusieurs singuliers concurrents, les correspondances contradictoires et les formes également reconnues comme des mots grammaticaux ou des verbes conjugués. Les correspondances personnelles sont ajoutées ensuite.

Les formes inclusives obtenues sont calculées automatiquement. Elles n’ont pas toutes été relues une par une : Dicollecte fournit une base de vocabulaire français, pas un dictionnaire inclusif officiel.

## Les limites à connaître

Le script ne comprend pas toute la phrase et ne vérifie pas l’ensemble des accords. Il peut donc transformer un adjectif qui décrit un objet. Pour un mot comme `heureux`, dont le singulier et le pluriel sont identiques, il conserve par défaut la forme inclusive singulière.

Les articles `un` et `une` deviennent `un·e`, et `le`, `la` ou `lae` deviennent `lae`, lorsque le script reconnaît un nom de personne. Quelques adjectifs courants peuvent se trouver entre l’article et le nom. Cela fonctionne aussi lorsque le nom est déjà écrit en inclusif, mais toutes les constructions de phrase ne sont pas couvertes.

Dans l’éditeur visuel, la mise en forme est conservée en traitant séparément les morceaux de texte. Un mot dont une partie seulement est en gras ou en italique peut ainsi ne pas être reconnu.

Les liens, les adresses e-mail et les balises sont préservés. Les blocs BBCode `[code]` sont protégés lorsqu’ils sont entièrement compris dans la sélection textuelle. Dans l’éditeur visuel, le contenu des éléments HTML `code` et `pre` est ignoré.

## Source et licence

Le dictionnaire provient de **Dicollecte 6.4.1**, créé par Olivier R., disponible sur [Grammalecte](https://grammalecte.net/) et également distribué par [Lexique.org](https://lexique.org/databases/Dicollecte/).

La version adaptée est fournie sous licence **MPL 2.0**, avec la notice et le texte de licence.

Les modifications réalisées en septembre 2026 comprennent le rapprochement des formes masculines et féminines, la génération des écritures inclusives, le filtrage de certains cas ambigus et l’ajout des correspondances personnelles. Le fichier JSON fourni permet de consulter et de modifier ces données.

## Vérifications

Les tests locaux se lancent avec :

```bash
node test.cjs
```

Ils couvrent notamment le paragraphe d’exemple, les nouveaux mots, la conservation de la sélection au clic, les terminaisons inclusives, le cache, le dictionnaire de secours et le refus d’un dictionnaire mal formé.

Le fonctionnement sur le forum reste à vérifier après l’installation.
