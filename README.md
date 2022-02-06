# SPTE

Lire le Wiki pour de plus amples (et actualisées) informations : https://github.com/webaxones/spte/wiki

Cette extension est utilisable sur https://translate.wordpress.org/ et permet de visualiser sur les traductions en français les éléments suivants :
* les espaces insécables en blanc
* les espaces sécables en début et en fin de chaîne en bleu

les erreurs suivantes :
* les apostrophes droites au lieu d’apostrophes courbes
* les mots déconseillés : on peut trouver les mots à privilégier en utilisant l’extension GlotDict ou en consultant le glossaire (https://translate.wordpress.org/locale/fr/default/glossary/).
* les erreurs de typographie listées par le guide du traducteur (https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/)

Chaque erreur affiche une information au survol dans une infobulle.
Le survol du lien Détails en fin de ligne permet de voir la chaîne d’origine sans coloration syntaxique sur un fond noir.

La chaine avec ses erreurs est également affichée dans la partie saisie/modification.

Un bouton radio permet de n’afficher que les traductions ayant des avertissements.

Les éditeurs de traduction ont une option supplémentaire pour cocher toutes les lignes avec avertissements en rouge (donc les erreurs dont on est sûr).

## GlotDict & SPTE

Cette extension n’est pas destinée à remplacer GlotDict, mais à afficher des alertes spécifiques à la langue Française. Elle est donc complémentaire.
Elle n’apporte pas d’aide lors de la saisie d’une traduction puisque GlotDict le fait très bien mais elle permet de contrôler ultérieurement si une traduction a respecté les règles mises en place par l’équipe française en charge de la traduction.
Parce qu'elle travaille en profondeur sur la colonne ".translation.foreign-text", SPTE est obligé de forcer 2 paramètres de GlotDict par compatibilité.
Il s'agit des valeurs localStorage suivantes : gd_curly_apostrophe_warning et gd_localized_quote_warning. Ces 2 valeurs sont forcées à True.

## Utilisation

SPTE affiche en haut de page les statistiques des erreurs/éléments qu’il a trouvé sur la page en cours.
Il peut donc être utile de définir dans les paramètres de traduction (menu en haut à droite) un nombre de lignes par page assez important si l’on veut juger rapidement si une traduction est acceptable ou non.
Les erreurs avérées sont en rouge. En rose sont notifiés les éléments à vérifier : il s’agit la plupart du temps d’erreurs relatives au non respect des règles typographiques, mais la couleur rose peut aussi indiquer des faux positifs : beaucoup de spécificités liées à la programmation génèrent des exceptions. Certaines exceptions sont gérées par SPTE mais pas toutes. Il est donc indispensable de contrôler les caractères en rose.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-1.png "Statistiques")

Sur les traductions, la même coloration syntaxique est utilisée :
* les mots déconseillés (pour des raisons de cohérence) ou mal écrits sont sur fond rouge : l’erreur est certaine, si l’orthographe est correcte alors il faut se référer au glossaire pour trouver le mot à utiliser.
* les caractères interdits comme les apostrophes droites sont encadrées de rouge sur fond blanc.
* les caractères ne respectant probablement pas les règles typographiques sont encadrés de rose sur fond blanc.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-2.png "Coloration syntaxique")

Au survol de chaque élément surligné apparait une info-bulle dans laquelle une explication du problème est décrite.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-3.png "Info-bulle au survol")

Le survol du lien « Détails » se trouvant en fin de ligne permet de voir la chaîne traduite sans surlignage afin d’aider à la compréhension de l’erreur.
Le texte est en blanc sur fond noir et sa taille est agrandie afin d’en faciliter la lecture.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-4.png "Info-bulle sans surlignage")

En modification de traduction, la traduction à corriger est reprise juste au dessus du champ de saisie avec ses informations surlignées pour aider à la correction.
Elle est sur fond gris pour permettre de voir les espaces insécables qui sont en blanc.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-5.png "Correction de la traduction")

Les espaces (sécables) sont affichées en bleu afin d’être différenciées des espaces insécables : il peut s’agir d’une erreur, mais il peut aussi s’agir d’une espace voulue. Bien réfléchir avant de les supprimer.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-6.png "Espaces sécables en début ou fin de ligne")

## Contribution

Si vous souhaitez contribuer à SPTE, <a href="https://github.com/webaxones/spte/wiki">lisez le wiki.</a>

## Installation

Cette extension est utilisable avec le navigateur Firefox.

https://addons.mozilla.org/fr/firefox/addon/spte/

Ainsi qu’avec le navigateur Chrome.

https://chrome.google.com/webstore/detail/spte/phoglaigilljgehnhjfomdhkgokelgnk

Elle est compatible avec l’extension GlotDict.

Il peut être nécessaire de désactiver l’extension uBlock Origin sur translate.wordpress.org dans certains cas, en ajoutant une exception pour cette URL.
Toute extension bloquant les scripts peut avoir besoin du même processus.

## Remerciements
Merci à <a href="https://wpgridbuilder.com/">Loïc Blascos</a> pour m’avoir fait découvrir l’API DOM et l’API CSSOM et pour m’avoir converti aux expressions régulières.