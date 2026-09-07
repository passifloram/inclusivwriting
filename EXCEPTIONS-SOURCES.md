# Exceptions vérifiées dans le blog Inclusi

Relecture du 7 septembre 2026. Les liens ci-dessous ont fourni des propositions lisibles. D'autres fiches ont été repérées dans l'index mais n'ont pas pu être lues : elles n'ont pas servi à inventer des correspondances. Il ne s'agit donc pas d'un import exhaustif du blog.

## Convention choisie pour ce module

On conserve les points médians pour les noms et adjectifs, et des formes combinées pour certains mots grammaticaux et noms sans terminaison commune. `lae` et `animateur·ice` restent les choix demandés. Les points ordinaires des fiches deviennent des points médians. Les pluriels ajoutés à partir d'une fiche au singulier sont des extensions du module, pas des citations de la fiche.

Le script embarque **82 correspondances lexicales prioritaires**, **8 anciennes graphies reconnues**, et des règles distinctes pour les articles, possessifs et pronoms. Certaines correspondances étaient déjà présentes ; ce total n'est pas un nombre de mots entièrement nouveaux. Le dictionnaire complet compte désormais **64 128 formes**.

## Correspondances retenues ou corrigées

| Fiche consultée | Choix appliqué et remarque |
|---|---|
| [Le / la](https://www.inclusi.fr/blog/le-la-inclusif) | `lae`, devant une personne reconnue. |
| [Celui / celle](https://www.inclusi.fr/blog/celui-celle-inclusif) | `cellui`. |
| [Ceux / celles](https://www.inclusi.fr/blog/ceux-celles-inclusif) | `celleux`. |
| [Eux / elles](https://www.inclusi.fr/blog/eux-elles-inclusif) | `elleux` pour le pronom tonique ; `elles` sujet devient `iels`. |
| [Lequel / laquelle](https://www.inclusi.fr/blog/lequel-laquelle-inclusif) | `laequelle` ; pluriel ajouté `lesquel·le·s`. |
| [Ce / cette](https://www.inclusi.fr/blog/ce-cette-inclusif) | `ce·tte` devant une personne ; prise en charge de `cet` également. |
| [Chacun / chacune](https://www.inclusi.fr/blog/chacun-chacune-inclusif) | `chacun·e`, confirmé. |
| [Certain / certaine](https://www.inclusi.fr/blog/certain-certaine-inclusif) | `certain·e`, pluriel `certain·e·s`. |
| [Frère / sœur](https://www.inclusi.fr/blog/frere-soeur-inclusif) | `frœur` ; pluriel et variante sans ligature ajoutés. |
| [Monsieur / madame](https://www.inclusi.fr/blog/monsieur-madame-inclusif) | `mondame` ; `messieurs/mesdames` → `mondames` est une extension. |
| [Nouveau / nouvelle](https://www.inclusi.fr/blog/nouveau-nouvelle-inclusif) | `nouvelle·au`, y compris `nouvel`. |
| [Nouveaux / nouvelles](https://www.inclusi.fr/blog/nouveaux-nouvelles-inclusif) | `nouvelle·aux`, traité explicitement. |
| [Beau / belle](https://www.inclusi.fr/blog/beau-belle-inclusif) | `beau·elle` ; variante `bel` ajoutée. |
| [Beaux / belles](https://www.inclusi.fr/blog/beaux-belles-inclusif) | `beaux·elles`, au lieu d'un pluriel calculé depuis le singulier. |
| [Fou / folle](https://www.inclusi.fr/blog/fou-folle-inclusif) | `fou·lle` ; variante `fol` et pluriels ajoutés. |
| [Vieux / vieille](https://www.inclusi.fr/blog/vieux-vieille-inclusif) | `vieux·eille` ; `vieil` ajouté. `vieux` reste ambigu en nombre. |
| [Copain / copine](https://www.inclusi.fr/blog/copain-copine-inclusif) | `copain·ine` remplace l'ancienne correspondance `copain·e`. |
| [Roi / reine](https://www.inclusi.fr/blog/roi-reine-inclusif) | `roi·eine` ; pluriels ajoutés. |
| [Chef / cheffe](https://www.inclusi.fr/blog/chef-cheffe-inclusif) | `chef·fe` ; pluriels ajoutés. |
| [Docteur / docteure](https://www.inclusi.fr/blog/docteur-docteure-inclusif) | `docteur·e`, sans généraliser la terminaison `·ice`. |
| [Municipaux / municipales](https://www.inclusi.fr/blog/municipaux-municipales-inclusif) | `municipaux·ales`, pluriel explicitement conservé. |
| [Nombreux / nombreuses](https://www.inclusi.fr/blog/nombreux-nombreuses-inclusif) | Le module utilise `nombreux·ses` pour préserver le pluriel ; la fiche affiche une terminaison sans ce `s`. |
| [Con / conne](https://www.inclusi.fr/blog/con-conne-inclusif) | `con·ne`, avec pluriels. |
| [Alternant / alternante](https://www.inclusi.fr/blog/alternant-alternante-inclusif) | `alternant·e`, avec pluriels. |

### Pronoms, possessifs et parenté

Le [guide présenté par Inclusi à partir de Divergenres](https://www.inclusi.fr/blog/guide-de-grammaire-neutre-et-inclusive---par-divergenres) sert de référence pour `iel`, `iels`, `ellui`, `maon`, `taon`, `saon`, `tancle` et `parent`. Le module choisit ces variantes parmi les possibilités du guide. Il ne remplace pas `lae` par la variante d'article de ce guide. Les possessifs sont modifiés uniquement devant les personnes reconnues. Le traitement des prépositions et des expressions impersonnelles est une règle ajoutée au module.

Exemples de comportement vérifié :

- `elles arrivent` → `iels arrivent` ; `avec elles` → `avec elleux`.
- `pour lui` → `pour ellui` ; `je lui parle` reste inchangé.
- `mon frère` → `maon frœur` ; `mon livre` reste inchangé.
- `il faut`, `il y a`, `il pleut`, `il fait beau` sont préservés.
- `au docteur` → `à lae docteur·e` et `du chef` → `de lae chef·fe` sont des adaptations à notre convention d'article.

## Fiches relues sans reprise automatique de toutes leurs variantes

| Fiche | Décision |
|---|---|
| [Maire / mairesse](https://www.inclusi.fr/blog/maire-mairesse-inclusif) | Pas de remplacement systématique par le seul féminin `mairesse`. La correspondance épicène existante est conservée. |
| [Homme / femme](https://www.inclusi.fr/blog/homme-femme-inclusif) | Pas de remplacement automatique par `personne` : cela exige aussi de revoir les accords et le sens, notamment pour `femme` au sens de conjointe. |
| [Auteur / autrice](https://www.inclusi.fr/blog/auteur-autrice-inclusif) | Conservation de `auteur·ice`, cohérent avec le choix du module ; la fiche propose une autre terminaison. |
| [Médiateur / médiatrice](https://www.inclusi.fr/blog/mediateur-mediatrice-inclusif) | Conservation de `médiateur·ice` plutôt que changement global de convention. |
| [Tous / toutes](https://www.inclusi.fr/blog/tous-toutes-inclusif) | Conservation de `tou·te·s` ; `toustes` est une autre option, pas une correction obligatoire. |
| [Heureux / heureuse](https://www.inclusi.fr/blog/heureux-heureuse-inclusif) | `heureux·se` confirmé ; ambiguïté de nombre inchangée. |
| [Positifs / positives](https://www.inclusi.fr/blog/positifs-positives-inclusif) | Conservation du pluriel `positif·ve·s` de notre convention. |
| [Étudiant / étudiante](https://www.inclusi.fr/blog/etudiant-etudiante-inclusif) | Correspondance existante confirmée. |
| [Inscrits / inscrites](https://www.inclusi.fr/blog/inscrits-inscrites-inclusif) | Conservation des deux points médians de `inscrit·e·s`. |
| [Candidat / candidate](https://www.inclusi.fr/blog/candidat-candidate-inclusif) | Correspondance existante confirmée. |
| [Content / contente](https://www.inclusi.fr/blog/content-contente-inclusif) | Correspondance existante confirmée. |
| [Premier / première](https://www.inclusi.fr/blog/premier-premiere-inclusif) | Correspondance existante confirmée. |
| [Conseiller / conseillère](https://www.inclusi.fr/blog/conseiller-conseillere-inclusif) | Correspondance existante confirmée. |
| [Petit / petite](https://www.inclusi.fr/blog/petit-petite-inclusif) | Correspondance existante confirmée ; pas de substitution générale par `enfant`. |

## Limites et installation

Ces règles restent heuristiques. Elles ne déterminent pas si un pronom renvoie à une personne ou à un objet, ne reconnaissent pas toutes les expressions impersonnelles et ne réécrivent pas toute la syntaxe. La sélection indique le passage que l'on souhaite convertir ; une relecture reste nécessaire. Un mot réparti sur plusieurs fragments de mise en forme peut encore empêcher la reconnaissance du contexte.

Les exceptions sont intégrées dans `javascript.js`, prioritaires même avec l'ancien dictionnaire distant ou son cache. Remplacer le JavaScript du forum suffit pour activer cette révision. Mettre aussi à jour `javascript.js`, `dictionnaire-inclusif.json`, `exceptions-blog.json` et ce document dans le dépôt pour garder les sources synchronisées. `exceptions-blog.json` documente les données embarquées ; il n'est pas téléchargé séparément par le navigateur.

Aucune modification n'a été publiée sur GitHub depuis cet espace de travail.
