# SPTE

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

## GlotDict & SPTE

Cette extension n’est pas destinée à remplacer GlotDict, mais à afficher des alertes spécifiques à la langue Française. Elle est donc complémentaire.
Elle n’apporte pas d’aide lors de la saisie d’une traduction puisque GlotDict le fait très bien mais elle permet de contrôler ultérieurement si une traduction a respecté les règles mises en place par l’équipe française en charge de la traduction.
Parce qu'elle travaille en profondeur sur la colonne ".translation.foreign-text", SPTE est obligé de forcer 2 paramètres de GlotDict par compatibilité.
Il s'agit des valeurs localStorage suivantes : gd_curly_apostrophe_warning et gd_localized_quote_warning sont forcés à True.

## Utilisation

SPTE affiche en haut de page les statistiques des erreurs/éléments qu’il a trouvé sur la page en cours.
Il peut donc être utile de définir dans les paramètres de traduction (menu en haut à droite) un nombre de lignes par page assez important si l’on veut juger rapidement si une traduction est acceptable ou non.
Les erreurs avérées sont en rouge. En magenta sont notifiés les éléments à vérifier : il s’agit la plupart du temps d’erreurs relatives au non respect des règles typographiques, mais la couleur magenta indique qu’il peut aussi s’agir d’exception.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-1.png "Statistiques")

Sur les traductions, la même coloration syntaxique est utilisée :
* les mots déconseillés (pour des raisons de cohérence) ou mal écrits sont sur fond rouge : l’erreur est certaine, si l’orthographe est correcte alors il faut se référer au glossaire pour trouver le mot à utiliser.
* les caractères interdits comme les apostrophes droites sont encadrées de rouge sur fond blanc.
* les caractères ne respectant probablement pas les règles typographiques sont encadrés de magenta sur fond blanc.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-2.png "Coloration syntaxique")

Au survol de chaque élément surligné apparait une info-bulle dans laquelle une explication du problème est décrite.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-3.png "Info-bulle au survol")

Le survol du lien « Détails » se trouvant en fin de ligne permet de voir la chaîne traduite sans surlignage afin d’aider à la compréhension de l’erreur.
Le texte est en blanc sur fond noir et sa taille est agrandie afin d’en faciliter la lecture.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-4.png "Info-bulle sans surlignage")

En modification de traduction, la traduction à corriger est reprise juste au dessus du champ de saisie avec ses informations surlignées pour aider à la correction.
Elle est sur fond gris pour permettre de voir les espaces insécables qui sont en blanc.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-5.png "Correction de la traduction")

Les espaces (normaux : sécables) sont affichées en bleu afin d’être différenciées des espaces insécables : il peut s’agir d’une erreur, mais il peut aussi s’agir d’une espace voulue. Bien réfléchir avant de les supprimer.

![Screenshot](https://github.com/webaxones/spte/blob/master/assets/screenshots/screenshot-6.png "Espaces sécables en début ou fin de ligne")

## Contribution

Si vous souhaitez contribuer sur le code et tester vos modifications avant de les proposer, suivez ce processus :
* Désactivez SPTE pour que cela ne rentre pas en conflit
* Installez et activez l’extension Firefox « GreaseMonkey » ou l’extension Chrome TamperMonkey
* Allez sur https://translate.wordpress.org et créez un script sur ce domaine
* Collez tout le contenu du fichier spte.js présent sur ce dépôt dans le script
* Modifiez le script et testez le.

## Installation

Cette extension est utilisable avec le navigateur Firefox.

https://addons.mozilla.org/fr/firefox/addon/spte/

Elle est compatible avec l’extension GlotDict.

Il peut être nécessaire de désactiver l’extension uBlock Origin sur translate.wordpress.org dans certains cas, en ajoutant une exception pour cette URL.
Toute extension bloquant les scripts peut avoir besoin du même processus.

## Changelog

### 0.9.9.4 - 12 Oct 2020
*  Masquer aussi les lignes non traduites lorsqu’on sélectionne « N’afficher que les avertissements » et que l’on est sur All
*  Séparation du point d’exclamation et du signe plus et ajout de l’exception google+ au signe plus
*  Passage de l’icône SPTE dans la barre d’adresse pour ne l’afficher que lorsqu’SPTE est actif c’est à dire sur translate

### 0.9.9.3 - 11 Oct 2020
*  Modification de la surcharge des styles GlotDict par une surcharge des paramètres GlotDict
*  Ajout alerte sur mots : mail, mails
*  Sécurisation du masquage des lignes sans avertissements : si connecté en PTE les lignes masquées sont automatiquement décochées si elles l’étaient
*  Ajout possibilité pour les PTE de sélectionner toutes les lignes avec avertissements en rouge, avec comptage des éléments

### 0.9.9.2 - 7 Oct 2020
*  Annulation gain de place en CSS qui provoquait un bug d'affichage pour les >PTE

### 0.9.9.1 - 7 Oct 2020
*  Suppression détection des apostrophes simples encadrant un paramètre, exemple : '%s'
*  Suppression détection des signes slash doublés
*  Correction slash lorsque suivi par un supérieur dans le cas d'une balise XHTML auto-fermante

### 0.9.9.0 - 6 Oct 2020
*  Suppression de la détection du guillement français ouvrant lorsqu'en début de chaîne
*  Suppression des exceptions rendues inutiles par le traitement unitaire de chaque caractère
*  Ajout jpg et jpeg aux extensions et suppression de l'avertissement sur les apostrophes simples lorsqu'elles sont précédées par href=
*  Ajout commentaire sur GlotDict dans readme et js
*  Ajout 'Melle' aux badwords

### 0.9.8.9 - 6 Oct 2020
* Correction faux positif sur deux points précédés par un espace insécable et suivi par un espace

### 0.9.8.8 - 6 Oct 2020
*  Amélioration du markup HTML du header
*  Factorisation de la fonction showControls
*  Réduction de la taille de la légende

### 0.9.8.7 - 5 Oct 2020
*  Ajout d’un bouton radio pour n’afficher que les avertissements.

### 0.9.8.6 - 5 Oct 2020
*  Ajout de liens vers le glossaire et les règles typographiques
*  ajout des mots "popup", "popups", "responsif" aux badWords
*  correction apportée lorsqu’en sortie de correction sur une chaîne comprenant un espace insécable la coloration de GlotDict réapparaissait

### 0.9.8.5 - 4 Oct 2020
*  Reprogrammation spécifique des caractères parenthèses ouvrantes et fermantes, accolades ouvrantes et fermantes, crochets ouvrants et fermants pour accepter des doubles crochets et doubles accolades ainsi que l’utilisation des parenthèses dans des informations de développement, gestion du point d’interrogation lorsqu’il est utilisé pour passer un paramètre en URL

### 0.9.8.0 - 3 Oct 2020
* Initial

## Remerciements
Merci à <a href="https://wpgridbuilder.com/">Loïc Blascos</a> pour avoir fait passer mon code de l’âge de pierre à l’âge de raison en me faisant découvrir l’API DOM et l’API CSSOM et en me convertissant aux expressions régulières.