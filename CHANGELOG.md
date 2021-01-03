# Changelog

## [1.0.0.1] - 3 Janv 2021
### Changed
- Remplacement des info-bulles des avertissements par des aria-label couplés à des pseudo-éléments. Les info-bulles deviennent accessibles
- Remplacement des span des avertissements par des liens a pour les rendre accessibles au clavier
- Changement de la police utilisée pour le caractère i d’information pour de l'arial sans-serif afin de le rendre compatible Linux
- remise à vide du champs de saisie Cohérence lorsqu’on ferme la popup
- au clic sur Cocher Tous/Les avertissements en rouge : si 0 lignes alors on masque la notice
- amélioration visibilité des liens Livres (menu secondaire) par défaut

## [1.0.0.0] - 29 Déc 2020
### Added
- Ajout d’un haut de page collant (sticky header) permettant d’avoir toujours accès aux compteurs et contrôles
- Ajout de boutons d’accès au Glossaire, aux règles Typographiques, à la Consistency (cohérence)
- Ajout d’une option (épingle rouge) pour utiliser ou non le haut de page sticky
- Ajout d’un champ de saisie permettant de faire une recherche de cohérence sur la locale française et affichage des résultats en fenêtre surgissante (popup)
- Ajout de paramètres via une page d’action (popup) accessible en cliquant sur l’icône SPTE présente dans la barre d’adresse du navigateur
- Ajout d’une option permettant d’activer/désactiver l’info-bulle noire
- Ajout d’une option permettant d’améliorer les contrastes des textes sur Translate en leur affectant un rapport minimal de 4.5:1 (voir WCAG)
- Ajout d’une option permettant de rajouter des locales sur lesquelles activer SPTE (locales dérivées du français puisque les règles typographiques ne peuvent s’appliquer à d’autres langues)
- Ajout d’une option permettant d’activer/désactiver l’affichage des drapeaux français destinés à mieux repérer la locale française dans les tables
- Ajout d’une option permettant d’agrandir le contenu de la page (corps de la page) sur le reste du site (les tables de traduction sont déjà agrandies à 85% cette option permet d’appliquer la même chose aux autres pages de Translate)
- Ajout d’une option permettant de choisir la largeur maximale du contenu de la page (corps de la page) à appliquer aux autres pages de Translate

## [0.9.9.9] - 7 Déc 2020
### Added
- Analyse d’une ligne et recalcul des compteurs à chaque : Saisie, Suggest, Fuzzy, et Reject
- Ajout du drapeau français pour mieux identifier la locale fr sur différentes tables de translate mais sans en changer le tri car ces tables sont triées par ordre logique
### Changed
- Remplacement des espaces insécables dans les regex par leur unicode pour les rendre visibles sur github (essentiellement dans le wiki)
- Déplacement des styles dans une feuille de style externe
- Ajout d’un paramètre enregistré (en LocalStorage) pour masquer/afficher la légende qui prend de la place
### Fixed
- Retrait des checkbox que j'avais bêtement intégré aux formulaires existants, ce qui les intégrait aux requêtes

## [0.9.9.8] - 11 Nov 2020
### Added
- Ajout d’exceptions au contrôle de l’espace insécable du guillemet fermant lorsque ce dernier est suivi par un point, suivi par une virgule, suivi par un espace insécable et un point d’interrogation ou d’exclamation ou deux points ou d’un point virgule. Voir Wiki pour plus d’information.
### Changed
- Menues améliorations des commentaires dans le code

## [0.9.9.7] - 9 Nov 2020
### Added
- Ajout exception sur barre oblique (slash) lorsqu’il est suivi par 2 accolades ouvrantes ou 2 crochets fermants
- Ajout lettres accentuées et espace insécable suivante mais non finale dans regxCloseBrace
- Ajout lettres accentuées dans rgxCloseHook
- Ajout lettres accentuées et chiffres à rgxPeriod
- Ajout curseur loupe sur tooltip noire
### Changed
- Renommage spaceAfter en Ellipsis puisque seul caractère, retrait de crochets en trop pour même raison, et ajout des lettres accentuées et chiffres encadrants
### Fixed
- Correction rgxCloseParenthesis qui était bugguée sur la seconde partie (après parenthèse)

## [0.9.9.6] - 23 Oct 2020
### Added
- Changement de l'ordre des locales pour faire passer la française en premier afin de la rendre plus facilement accessible. FrenchFlagPowaa :D
### Changed
- Restructuration du code en plusieurs fichiers automatiquement chargés par le navigateur dans l’ordre de déclaration du manifeste
- Séparation du readme et du changelog et passage de ce dernier au format keepachangelog (frenchifié)
### Fixed
- Correction  Espace est un n.c. féminin en typographie (thanks to [Pierre Lanoy](https://github.com/Pierre-Lannoy)).
- Correction  `ou` est implicitement inclusif et doit remplacer la pseudoconjonction `et/ou` (cf #24) (thanks to [Pierre Lanoy](https://github.com/Pierre-Lannoy))

## [0.9.9.5] - 14 Oct 2020
### Added
- Gestion des smileystextuels :) et :-)
- Gestion des cas supplémentaires pour les parenthèses ouvrantes et fermantes voir issue github #10
- Ajout caractères accentués à la règle des virgules

## [0.9.9.4] - 12 Oct 2020
### Changed
- Masquer aussi les lignes non traduites lorsqu’on sélectionne « N’afficher que les avertissements » et que l’on est sur `All`
- Séparation du point d’exclamation et du signe plus et ajout de l’exception google+ au signe plus
- Passage de l’icône SPTE dans la barre d’adresse pour ne l’afficher que lorsqu’SPTE est actif c’est à dire sur translate

## [0.9.9.3] - 11 Oct 2020
### Added
- Ajout alerte sur mots : mail, mails
- Ajout possibilité pour les PTE de sélectionner toutes les lignes avec avertissements en rouge, avec comptage des éléments
### Changed
- Modification de la surcharge des styles GlotDict par une surcharge des paramètres GlotDict
- Sécurisation du masquage des lignes sans avertissements : si connecté en PTE les lignes masquées sont automatiquement décochées si elles l’étaient

## [0.9.9.2] - 7 Oct 2020
### Removed
- Annulation gain de place en CSS qui provoquait un bug d'affichage pour les >PTE

## [0.9.9.1] - 7 Oct 2020
### Fixed
- Suppression détection des apostrophes simples encadrant un paramètre, exemple : '%s'
- Suppression détection des signes slash doublés
- Correction slash lorsque suivi par un supérieur dans le cas d'une balise XHTML auto-fermante

## [0.9.9.0] - 6 Oct 2020
### Added
- Ajout jpg et jpeg aux extensions et suppression de l'avertissement sur les apostrophes simples lorsqu'elles sont précédées par href=
- Ajout commentaire sur GlotDict dans readme et js
- Ajout 'Melle' aux badwords
### Fixed
- Suppression de la détection du guillement français ouvrant lorsqu'en début de chaîne
- Suppression des exceptions rendues inutiles par le traitement unitaire de chaque caractère

## [0.9.8.9] - 6 Oct 2020
### Fixed
- Correction faux positif sur deux points précédés par un espace insécable et suivi par un espace

## [0.9.8.8] - 6 Oct 2020
### Changed
- Amélioration du markup HTML du header
- Factorisation de la fonction showControls
- Réduction de la taille de la légende

## [0.9.8.7] - 5 Oct 2020
### Added
- Ajout d’un bouton radio pour n’afficher que les avertissements.

## [0.9.8.6] - 5 Oct 2020
### Added
- Ajout de liens vers le glossaire et les règles typographiques
- ajout des mots "popup", "popups", "responsif" aux badWords
### Fixed
- correction apportée lorsqu’en sortie de correction sur une chaîne comprenant un espace insécable la coloration de GlotDict réapparaissait

## [0.9.8.5] - 4 Oct 2020
### Changed
- Reprogrammation spécifique des caractères parenthèses ouvrantes et fermantes, accolades ouvrantes et fermantes, crochets ouvrants et fermants pour accepter des doubles crochets et doubles accolades ainsi que l’utilisation des parenthèses dans des informations de développement, gestion du point d’interrogation lorsqu’il est utilisé pour passer un paramètre en URL

## [0.9.8.0] - 3 Oct 2020
- Birth
