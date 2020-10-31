const charTitle = 'Caractères à vérifier : ';
const charClass = 'char--warning';
const colorError = 'red';
const colorCheck = 'magenta';
const styleWordError = `background-color:${colorError};color:white;font-weight:bold;padding:1px;margin:0 1px`;
const styleCharError = `display:inline-block;line-height:16px;box-shadow:${colorError} 0px 0px 0px 2px inset;background-color:white;padding:3px 4px`;
const styleCharCheck = `display:inline-block;line-height:16px;box-shadow:${colorCheck} 0px 0px 0px 2px inset;background-color:white;padding:3px 4px`;
const spaceBeforeTitle = 'Espace précédente manquante ou espace suivante en trop';
const spaceAfterTitle = 'Précédé par une espace ou caractère suivant collé ou suivi par une espace finale';
const nbkSpaceBeforeTitle = 'Non précédé par une espace insécable ou non suivi par une espace';
const nbkSpaceAfterTitle = 'Non précédé par une espace ou non suivi par une espace insécable';

const cases = {
	badWords: {
		title: 'Mots déconseillés ou mal orthographiés : ',
		cssTitle: 'Mot déconseillé ou mal orthographié',
		cssClass: 'word--warning',
		style: styleWordError,
		counter: 0,
		regex: rgxBadWords,
	},
	quotes: {
		title: 'Apostrophes droites : ',
		cssTitle: 'Apostrophe droite au lieu d’une apostrophe courbe',
		cssClass: 'quote--warning',
		style: styleCharError,
		counter: 0,
		regex: rgxSingleQuotes,
	},
	slash: {
		title: charTitle,
		cssTitle: 'Espace précédente en trop ou espace suivante en trop',
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxSlash,
	},
	openHook: {
		title: charTitle,
		cssTitle: spaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxOpenHook,
	},
	openParenthesis: {
		title: charTitle,
		cssTitle: spaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxOpenParenthesis,
	},
	openBrace: {
		title: charTitle,
		cssTitle: spaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxOpenBrace,
	},
	spaceAfter: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxEllipsis,
	},
	period: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxPeriod,
	},
	comma: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxComma,
	},
	closeHook: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxCloseHook,
	},
	closeParenthesis: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxCloseParenthesis,
	},
	closeBrace: {
		title: charTitle,
		cssTitle: spaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxCloseBrace,
	},
	exclamationPoint: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxExclamationPoint,
	},
	plusSign: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxPlusSign,
	},
	questionMark: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxQuestionMark,
	},
	colon: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxColon,
	},
	semiColon: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxSemiColon,
	},
	closingFrQuote: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxClosingFrQuote,
	},
	openFrQuote: {
		title: charTitle,
		cssTitle: nbkSpaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxOpenFrQuote,
	},
	Space: {
		title: '',
		cssTitle: 'Espace en début ou en fin de chaîne',
		cssClass: 'spaces--showing',
		style: 'display:inline-block;line-height:16px;background-color:deepskyblue;border:2px solid deepskyblue',
		counter: 0,
		regex: /^ | $/gm,
	},
	nbkSpaces: {
		title: '',
		cssTitle: 'Espace insécable',
		cssClass: 'nbkspaces--showing',
		style: 'display:inline-block;line-height:16px;background-color:white;border:2px solid white',
		counter: 0,
		regex: /\u00A0/gm,
	},
};
