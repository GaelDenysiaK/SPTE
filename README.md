# SPTE


Cette extension est utilisable sur https://translate.wordpress.org/ et permet de visualiser sur les traductions en français les éléments suivants :
* les espaces insécables en blanc
* les espaces sécables en début et en fin de chaîne en bleu

les erreurs suivantes :
* les apostrophes droites au lieu d’apostrophes courbes
* les mots déconseillés : on peut trouver les mots à privilégier en utilisant l’extension GlotDict ou en consultant le glossaire (https://translate.wordpress.org/locale/fr/default/glossary/).
* les erreurs de typographie listées par le guide du traducteur (https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/)

Chaque erreur affiche une information au survol dans une infobulle.
Le survol du lien Détails en fin de ligne permet de voir la chaîne d’origine sans coloration syntaxique sur un fond noir.

La chaine avec ses erreurs est également affichée dans la partie saisie/modification.


## Contribution

Si vous souhaitez contribuer sur le code et tester vos modifications avant de les proposer, suivez ce processus :
* Désactivez SPTE pour que cela ne rentre pas en conflit
* Installez et activez l'extension Firefox "GreaseMonkey" ou l'extension Chrome TamperMonkey
* Allez sur https://translate.wordpress.org et créez un script sur ce domaine
* Collez tout le contenu du fichier spte.js présent sur ce dépôt dans le script
* Modifiez le script et testez le.

## Installation

Cette extension est utilisable avec le navigateur Firefox.
https://addons.mozilla.org/fr/firefox/addon/spte/

Elle est compatible avec l'extension GlotDict.

## Changelog

### 0.9.8.0 - 3 Oct 2020
* Initial

## Remerciements
Merci à <a href="https://wpgridbuilder.com/">Loïc Blascos</a> pour avoir fait passer mon code de l'âge de pierre à l'âge de raison en me faisant découvrir l'api DOM et l'api CSSOM et en me convertissant aux expressions régulières.