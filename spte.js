const data = {
	badWord: [
		'plugin',
		'plugins',
		'plug-in',
		'plug-ins',
		'limace',
		'limaces',
		'n4est',
		's4est',
		'ets',
		'email',
		'emails',
		'post',
		'posts',
		'shortcode',
		'shortcodes',
		'underscore',
		'underscores',
		'token',
		'tag',
		'spam',
		'step',
		'wysiwig',
		'video',
		'fdp',
		'etc...',
		'etes vous',
		'font-sise',
		'roter l’image',
	],
	slash: [
		'/',
	],
	openHook: [
		'[',
	],
	openParenthesis: [
		'(',
	],
	openBrace: [
		'{',
	],
	spaceAfter: [
		'…',
	],
	period: [
		'.',
	],
	comma: [
		',',
	],
	closeHook: [
		']',
	],
	closeParenthesis: [
		')',
	],
	closeBrace: [
		'}',
	],
	nbkSpaceBefore: [
		'!',
		'+',
	],
	questionMark: [
		'?',
	],
	colon: [
		':',
	],
	semiColon: [
		';',
	],
	closingFrQuote: [
		'»',
	],
	nbkSpaceAfter: [
		'«',
	],
	fileExtensions: [
		'maintenance',
		'htaccess',
		'woff',
		'ttf',
		'svg',
		'eot',
		'exe',
		'tiff',
		'tif',
		'bmp',
		'gif',
		'ico',
		'png',
		'psd',
		'mp3',
		'avi',
		'mov',
		'mpeg',
		'mp4',
		'wav',
		'zip',
		'rar',
		'csv',
		'sql',
		'log',
		'xml',
		'vcf',
		'bat',
		'bin',
		'js',
		'html',
		'css',
		'php',
		'ppt',
		'ods',
		'xls',
		'xlsx',
		'pdf',
		'doc',
		'docx',
		'rtf',
		'txt',
		'bak',
	],
	stringException: [
		'http',
		'https',
		'hh',
		'mm',
		'ss',
		'aaaa',
		'jj',
		'href',
		'style=',
		'com',
		'&lt',
		'&gt',
		'php',
		'com',
		'org',
		'www',
		'%s',
	],
};

const styleSheet = document.head.appendChild(document.createElement('style')).sheet;
const translations = document.querySelectorAll('.translation-text');
const fileExtensions = data.fileExtensions.join('|');
const exceptions = data.stringException.map(escapeRegExp).join('|');

// Escape data.
function escapeRegExp(data) {
	return data.replace(/[-[\]{}()*+?.,\\^$|#\s]/gm, '\\$&');
}

// Match bad words.
const rgxBadWords = new RegExp(`(?<=[\\s,.:;"']|^)${data.badWord.map(escapeRegExp).join('(?=[\\s,.:;"\']|$)|(?<=[\\s,.:;"\']|^)')}(?=[\\s,.:;"']|$)`, 'gmi');

// Match slash with spaces(before and after, breaking or not).
const rgxSlash = new RegExp(`((?<= | )\\${data.slash}|\\${data.slash}(?= | ))`, 'gmi');

// Match typographic rules "space before": not preceded by space (breaking or non breaking) and not as first character OR not as first character and followed by space (breaking or non breaking)
// plus double opening hook case.
const rgxOpenHook = new RegExp(`(?<! |\\${data.openHook}|^)\\${data.openHook}(?!\\${data.openHook})|\\${data.openHook}(?=[ | ])`, 'gmi');

// Match opening parenthesis in different cases: typographic rules "space before" plus (e) (s) (% () cases.
const rgxOpenParenthesis = new RegExp(`(?<![ ]|^)\\${data.openParenthesis}(?!\\%|\\)|s\\)|e\\))|(?<!^)\\${data.openParenthesis}(?=[ | ])`, 'gmi'); 

// Match opening brace in different cases : typographic rules "space before" plus double opening brace case.
const rgxOpenBrace = new RegExp(`(?<! |\\${data.openBrace}|^)\\${data.openBrace}(?!\\${data.openBrace})|\\${data.openBrace}(?=[ | ])`, 'gmi');

// Match characters typographic rules "space after": preceded by space (breaking or non breaking) OR followed by letter or number or ending space (breaking or non breaking).
const rgxSpaceAfter = new RegExp(`(?<=[ | ])[${data.spaceAfter}]|[${data.spaceAfter}](?=[a-z]|[0-9]| $| $)`, 'gmi');

// Match period in different cases: typographic rules "spaceAfter" plus URL plus version numbers plus .htaccess and .maintenance.
const rgxPeriod = new RegExp(`(?<= | )\\${data.period}(?!${fileExtensions})|(?<![a-z0-9\\${data.period}]*?)\\${data.period}(?=[a-z])|\\${data.period}( $| $)`, 'gmi');

// Match comma in different cases: typographic rules "spaceAfter" plus decimals.
const rgxComma = new RegExp(`(?<=[ | ])[${data.comma}]|[${data.comma}](?=[a-z]| $| $)`, 'gmi');

// Match closing hook in different cases: typographic rules "space after" plus double closing hook case.
const rgxCloseHook = new RegExp(`(?<=[ | ])\\${data.closeHook}|(?<!\\${data.closeHook})\\${data.closeHook}(?=[a-z]|[0-9]| $| $)`, 'gmi');

// Match closing parenthesis in different cases: typographic rules "space after" plus (e) (s) (%x) cases.
const rgxCloseParenthesis = new RegExp(`(?<= | |\\([a-d]|\\([f-r]|\\([t-z])\\${data.closeParenthesis}|(?<!\\%[a-z]|\\(s|\\(e)\\${data.closeParenthesis}(?=[a-z]|[0-9]| )`, 'gmi');

// Match closing brace in different cases: typographic rules "space after" plus double closing brace case.
const rgxCloseBrace = new RegExp(`(?<=[ | ])\\${data.closeBrace}|(?<!\\${data.closeBrace})\\${data.closeBrace}(?=[a-z]|[0-9]| $| $)`, 'gmi');

// Match characters "nbkSpaceBefore" not preceded by non breaking space nor by an exception and not followed by an exception OR not preceded by an exception and followed by breaking space.
const theNbkSpaceBefore = `${data.nbkSpaceBefore.map(escapeRegExp).join('|')}`;
const rgxNbkSpaceBefore = new RegExp(`(?<! )(?<!${exceptions})[${theNbkSpaceBefore}](?!${exceptions})|(?<!${exceptions})[${theNbkSpaceBefore}](?! |${exceptions}|$)`, 'gmi');

// Match question mark in different cases: typographic rules "non-breaking space before" plus URL
const rgxQuestionMark = new RegExp(`(?<! |\\/|\\.php|^)\\${data.questionMark}|(?<!\/|\.php|^)\\${data.questionMark}(?! |$)`, 'gmi');

// Match colon in different cases: typographic rules "nbkSpaceBefore" plus URL plus style= plus hh mm ss aaaa jj 9: 99: (time) :999 (font-size in stack).
const rgxColon = new RegExp(`(?<! |&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3})|(?<!&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3}|$)`, 'gmi');

// Match semicolon in different cases: typographic rules "nbkSpaceBefore" plus not preceded by every HTML code (hex, dec, mnemo) and by CSS rules.
const rgxSemiColon = new RegExp(`(?<! |:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}|(?<!:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}(?! )`, 'gmi');

// Match closing french quote in different cases: typographic rules "nbkSpaceBefore" plus followed by colon or comma.
const rgxClosingFrQuote = new RegExp(`(?<! )${data.closingFrQuote}|${data.closingFrQuote}(?! |\\.|\\,|$)`, 'gmi');

// Match characters "nbkSpaceAfter" not preceded by breaking space nor by an exception OR not preceded by an exception and followed by non breaking space.
const theNbkSpaceAfter = `${data.nbkSpaceAfter.map(escapeRegExp).join('|')}`;
const rgxNbkSpaceAfter = new RegExp(`(?<! |${exceptions}|^)[${theNbkSpaceAfter}](?!${exceptions})|(?<!${exceptions})[${theNbkSpaceAfter}](?! |${exceptions}|$)`, 'gmi');

const charTitle = 'Caractères à vérifier : ';
const charClass = 'char--warning';
const colorError = 'red';
const colorCheck = 'magenta';
const styleWordError = `background-color:${colorError};color:white;font-weight:bold;padding:1px;margin:0 1px`;
const styleCharError = `display:inline-block;line-height:16px;box-shadow:${colorError} 0px 0px 0px 2px inset;background-color:white;padding:3px 4px`;
const styleCharCheck = `display:inline-block;line-height:16px;box-shadow:${colorCheck} 0px 0px 0px 2px inset;background-color:white;padding:3px 4px`;
const spaceBeforeTitle = 'Espace précédent manquante et/ou espace suivant en trop';
const spaceAfterTitle = 'Précédé par une espace et/ou caractère suivant collé et/ou suivi par une espace finale';
const nbkSpaceBeforeTitle = 'Non précédé par une espace insécable et/ou non suivi par une espace';
const nbkSpaceAfterTitle = 'Non précédé par une espace et/ou non suivi par une espace insécable';

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
		cssTitle: 'Apostrophe droite',
		cssClass: 'quote--warning',
		style: styleCharError,
		counter: 0,
		regex: /\u0027/gm,
	},
	Space: {
		title: '',
		cssTitle: 'Espace en début ou en fin de chaîne',
		cssClass: 'spaces--showing',
		style: 'display:inline-block;line-height:16px;background-color:deepskyblue;border:2px solid deepskyblue',
		counter: 0,
		regex: /^ | $/gm,
	},
	slash: {
		title: charTitle,
		cssTitle: 'Espace précédent en trop et/ou espace suivant en trop',
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
		regex: rgxSpaceAfter,
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
	nbkSpaceBefore: {
		title: charTitle,
		cssTitle: nbkSpaceBeforeTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxNbkSpaceBefore,
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
	nbkSpaceAfter: {
		title: charTitle,
		cssTitle: nbkSpaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxNbkSpaceAfter,
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

function removeGlotDictTags(text) {
	let textWithoutG = text;
	textWithoutG = text.replaceAll(/<span style="background-color:yellow">&nbsp;<\/span>/gmi, ' ');
	textWithoutG = text.replaceAll(/&nbsp;/gmi, ' ');
	return textWithoutG;
}

function addTextOriginalToolTip(translation) {
	const origin = translation.closest('tr');
	const toolTip = document.createElement('span');
	const translated = origin.querySelector('.translation-text');
	const hook = origin.querySelector('td.actions');
	hook.style.position = 'relative';
	toolTip.innerHTML = removeGlotDictTags(translated.innerHTML);
	// Displays the translated string without any markup.
	toolTip.classList.add('original__tooltip');
	hook.append(toolTip);
}

function addHelpTranslationWrapper(translation) {
	const origin = translation.closest('tr');
	const brother = origin.nextElementSibling;
	if (origin.classList.contains('has-translations')) {
		const help = document.createElement('div');
		help.classList.add('help-copycat');
		const trad = origin.querySelector('.translation-text');
		const hook = brother.querySelector('.source-details');
		const copycat = trad.cloneNode(true);
		help.append(copycat);
		if (hook) {
			hook.append(help);
		}
	}
}

function checkTranslation(translation) {
	let text = translation.innerHTML;
	// Remove GlotDict tags on translation since we highlight non breaking spaces and for incompatibility.
	text = removeGlotDictTags(text);

	addTextOriginalToolTip(translation);

	for (const type in cases) {
		text = text.replace(cases[type].regex, (string) => {
			cases[type].counter++;
			return `<span title="${cases[type].cssTitle}" class="${cases[type].cssClass}">${string}</span>`;
		});
	}
	translation.innerHTML = text;

	addHelpTranslationWrapper(translation);
}

function addStyle(selector, rules) {
	styleSheet.insertRule(`${selector}{${rules}}`, styleSheet.cssRules.length);
}

function showResults() {
	const resultsPlace = document.querySelector('#upper-filters-toolbar');
	const results = document.createElement('div');
	const resultsTitle = document.createElement('p');
	results.id = 'results';
	results.append(resultsTitle);
	let nbChar = 0;
	let nbTotal = 0;

	for (const item in cases) {
		if (!cases[item].counter) {
			continue;
		}

		addStyle(`.${cases[item].cssClass}`, `${cases[item].style}`);

		const title = document.createElement('span');
		const counter = document.createElement('span');
		if (cases[item].title && cases[item].title !== charTitle) {
			title.textContent = cases[item].title;
			counter.textContent = cases[item].counter;
			counter.classList.add(cases[item].cssClass, 'warning-title');
			title.append(counter);
			results.append(title);
			nbTotal += cases[item].counter;
		} else if (cases[item].title === charTitle) {
			nbChar += cases[item].counter;
			nbTotal += cases[item].counter;
		}
	}

	if (nbChar) {
		const title = document.createElement('span');
		const counter = document.createElement('span');
		title.textContent = charTitle;
		counter.textContent = nbChar;
		counter.classList.add(charClass, 'warning-title');
		title.append(counter);
		results.append(title);
	}

	addStyle('.actions:hover .original__tooltip', 'display:inline-block');
	addStyle('.original__tooltip', 'display:none;position:absolute;width:calc(-5em - 10px + 42.5vw);top:100%;right:5em;z-index:666;padding:20px 10px;background:#000;color:#fff;text-align:left;font-size:17px;line-height:1.66;box-shadow:0 10px 10px rgba(0,0,0,.3)');
	addStyle('.original__tooltip::before', 'content:"";position:absolute;left:calc(50% - 6px);top:-6px;width:0;height:0;border-left:6px solid transparent; border-right:6px solid transparent;border-bottom:6px solid black');
	addStyle('.help-copycat', 'margin:1em 0;padding:10px 3px;font-size:15px;background-color:#d9e1e8');

	if (nbTotal) {
		addStyle('#results', 'font-weight:bold');
		addStyle('.results__title', 'margin:10px 0px 5px;color:red;text-transform:uppercase');
		addStyle('.warning-title', 'display:inline-block!important;line-height:23px!important;margin:0 25px 0 5px!important;padding:2px!important;box-sizing:border-box!important;text-align:center!important;min-width:22px!important;min-height:23px!important');
		addStyle('.char-details', 'font-size:13px;font-weight:normal;margin:.2em 0');

		const legend = document.createElement('p');
		legend.textContent = 'Les avertissements en rouge sont avérés. Attention, ceux en magenta sont à vérifier mais peuvent compter des faux positifs car des exceptions sont possibles.';
		legend.style.fontWeight = 'normal';
		legend.style.fontStyle = 'italic';
		results.append(legend);
		resultsTitle.textContent = `éléments à vérifier : ${nbTotal}`;
		resultsTitle.classList.add('results__title');
		resultsPlace.append(results);
	}
}

translations.forEach(checkTranslation);
showResults();
