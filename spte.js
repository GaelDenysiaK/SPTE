const data = {
	badWord: [
		'email',
		'emails',
		'etes vous',
		'etc...',
		'ets',
		'fdp',
		'font-sise',
		'limace',
		'limaces',
		'melle',
		'n4est',
		'plugin',
		'plugins',
		'plug-in',
		'plug-ins',
		'popup',
		'popups',
		'post',
		'posts',
		'roter l’image',
		'roter l\'image',
		'responsif',
		'shortcode',
		'shortcodes',
		's4est',
		'spam',
		'step',
		'tag',
		'token',
		'underscore',
		'underscores',
		'video',
		'wysiwig',
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
	openFrQuote: [
		'«',
	],
	fileExtensions: [
		'avi',
		'bak',
		'bat',
		'bin',
		'bmp',
		'css',
		'csv',
		'doc',
		'docx',
		'eot',
		'exe',
		'gif',
		'htaccess',
		'html',
		'ico',
		'jpg',
		'jpeg',
		'js',
		'log',
		'maintenance',
		'mail',
		'mo',
		'mov',
		'mp3',
		'mp4',
		'mpeg',
		'pdf',
		'php',
		'po',
		'pot',
		'png',
		'ppt',
		'psd',
		'ods',
		'rar',
		'rtf',
		'svg',
		'sql',
		'tar',
		'gz',
		'tiff',
		'tif',
		'ttf',
		'txt',
		'vcf',
		'wav',
		'woff',
		'xls',
		'xlsx',
		'xml',
		'zip',
	],
};

const styleSheet = document.head.appendChild(document.createElement('style')).sheet;
const translations = document.querySelectorAll('.translation-text');
const fileExtensions = data.fileExtensions.join('|');

// Escape data.
function escapeRegExp(data) {
	return data.replace(/[-[\]{}()*+?.,\\^$|#\s]/gm, '\\$&');
}

// Match bad words.
const rgxBadWords = new RegExp(`(?<=[\\s,.:;"']|^)${data.badWord.map(escapeRegExp).join('(?=[\\s,.:;"\']|$)|(?<=[\\s,.:;"\']|^)')}(?=[\\s,.:;"']|$)`, 'gmi');

// Match single quotes.
const rgxSingleQuotes = new RegExp('(?<!href\\=|href\\=\'[a-z0-9.]*?|%[a-z])\u0027(?!%)', 'gm');

// Match slash with spaces (before and after, breaking or not) and not preceded or not followed by another slash and not followed by a greater-than.
const rgxSlash = new RegExp(`(?<= | )\\${data.slash}(?!\\${data.slash}|\\&gt\\;)|(?<!\\${data.slash})\\${data.slash}(?= | )`, 'gmi');

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

// Match characters "nbkSpaceBefore" not preceded by non breaking space and not as first character OR followed by breaking space and not as last character.
const theNbkSpaceBefore = `${data.nbkSpaceBefore.map(escapeRegExp).join('|')}`;
const rgxNbkSpaceBefore = new RegExp(`(?<! |^)[${theNbkSpaceBefore}]|[${theNbkSpaceBefore}](?! |$)`, 'gmi');

// Match question mark in different cases: typographic rules "non-breaking space before" plus URL
const rgxQuestionMark = new RegExp(`(?<! |\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}|(?<!\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}(?! |$)`, 'gmi');

// Match colon in different cases: typographic rules "nbkSpaceBefore" plus URL plus style= plus hh mm ss aaaa jj 9: 99: (time) :999 (font-size in stack).
const rgxColon = new RegExp(`(?<! |&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3})|(?<!&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3}|$)`, 'gmi');

// Match semicolon in different cases: typographic rules "nbkSpaceBefore" plus not preceded by every HTML code (hex, dec, mnemo) and by CSS rules.
const rgxSemiColon = new RegExp(`(?<! |:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}|(?<!:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}(?! )`, 'gmi');

// Match closing french quote in different cases: typographic rules "nbkSpaceBefore" plus followed by colon or comma.
const rgxClosingFrQuote = new RegExp(`(?<! )${data.closingFrQuote}|${data.closingFrQuote}(?! |\\.|\\,|$)`, 'gmi');

// Match characters open french quote not preceded by breaking space OR followed by non breaking space.
const rgxOpenFrQuote = new RegExp(`(?<! |^)[${data.openFrQuote}]|[${data.openFrQuote}](?! |$)`, 'gmi');

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
		cssTitle: 'Apostrophe droite au lieu d’une apostrophe courbe',
		cssClass: 'quote--warning',
		style: styleCharError,
		counter: 0,
		regex: rgxSingleQuotes,
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
	openFrQuote: {
		title: charTitle,
		cssTitle: nbkSpaceAfterTitle,
		cssClass: charClass,
		style: styleCharCheck,
		counter: 0,
		regex: rgxOpenFrQuote,
	},
	nbkSpaces: {
		title: '',
		cssTitle: 'Espace insécable',
		cssClass: 'nbkspaces--showing',
		style: 'display:inline-block;line-height:16px;background-color:white;border:2px solid white',
		counter: 0,
		regex: /\u00A0/gm,
	},
	Space: {
		title: '',
		cssTitle: 'Espace en début ou en fin de chaîne',
		cssClass: 'spaces--showing',
		style: 'display:inline-block;line-height:16px;background-color:deepskyblue;border:2px solid deepskyblue',
		counter: 0,
		regex: /^ | $/gm,
	},
};

function addTextOriginalToolTip(translation) {
	const origin = translation.closest('tr');
	const toolTip = document.createElement('span');
	const translated = origin.querySelector('.translation-text');
	const hook = origin.querySelector('td.actions');
	hook.style.position = 'relative';
	toolTip.innerHTML = translated.innerHTML;
	// Force GlotDict parameters for compatibility.
	localStorage.setItem('gd_curly_apostrophe_warning', true);
	localStorage.setItem('gd_localized_quote_warning', true);
	// Displays the translated string without any markup.
	toolTip.classList.add('original__tooltip');
	hook.append(toolTip);
}

function addHelpTranslationWrapper(translation, hasWarning) {
	const origin = translation.closest('tr');
	if (!hasWarning) {
		origin.classList.add('has-nope-warning');
	}
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
	let hasWarning = false;

	// Remove GlotDict tags on translation since we highlight non breaking spaces and for incompatibility.
	text = removeGlotDictTags(text);

	addTextOriginalToolTip(translation);

	for (const type in cases) {
		text = text.replace(cases[type].regex, (string) => {
			cases[type].counter++;
			if (!hasWarning && type !== 'nbkSpaces') {
				hasWarning = true;
			}
			return `<span title="${cases[type].cssTitle}" class="${cases[type].cssClass}">${string}</span>`;
		});
	}
	translation.innerHTML = text;

	addHelpTranslationWrapper(translation, hasWarning);
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
	addStyle('[style*="background-color:yellow"]', 'display:inline-block!important;line-height:16px!important;background-color:white!important;border:2px solid white!important');

	if (nbTotal) {
		addStyle('#results', 'font-weight:bold');
		addStyle('.results__title', 'margin:10px 0px 5px;color:red;text-transform:uppercase');
		addStyle('.results__links', 'display:inline;font-weight:normal;margin:.3em 1em .3em 0');
		addStyle('.warning-title', 'display:inline-block!important;line-height:23px!important;margin:0 25px 0 5px!important;padding:2px!important;box-sizing:border-box!important;text-align:center!important;min-width:22px!important;min-height:23px!important');
		addStyle('.char-details', 'font-size:13px;font-weight:normal;margin:.2em 0');
		addStyle('.warning-legend', 'font-weight:normal;margin:1em 0 0 0');
		addStyle('#showEverything,#showOnlyWarning', 'margin:1em 0 0 0');
		addStyle('#showEverything+label,#showOnlyWarning+label', 'margin:0 1.5em 0 .5em');

		const legend = document.createElement('p');
		legend.textContent = 'Les avertissements en rouge sont avérés. Ceux en magenta sont à vérifier mais peuvent compter des faux positifs.';
		legend.classList.add('warning-legend');
		results.append(legend);
		resultsTitle.textContent = `éléments à vérifier : ${nbTotal}`;
		resultsTitle.classList.add('results__title');

		const typographyLink = document.createElement('p');
		const glossaryLink = document.createElement('p');
		typographyLink.innerHTML = 'Consultez <a target="_blank" href="https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/">les règles typographiques</a> à respecter pour les caractères.';
		glossaryLink.innerHTML = 'Consultez <a target="_blank" href="https://fr.wordpress.org/team/handbook/guide-du-traducteur/le-glossaire-et-les-erreurs-de-traduction-les-plus-frequentes/">le glossaire officiel</a> à respecter pour les mots.';
		typographyLink.classList.add('results__links');
		glossaryLink.classList.add('results__links');
		results.append(typographyLink);
		results.append(glossaryLink);

		const controls = document.createElement('div');
		controls.id = 'controls';
		const showEverything = document.createElement('input');
		showEverything.type = 'radio';
		showEverything.id = 'showEverything';
		showEverything.name = 'showEverything';
		showEverything.value = 'showEverything';
		showEverything.checked = 'checked';
		controls.append(showEverything);
		const showEverythingLabel = document.createElement('label');
		showEverythingLabel.textContent = 'Tout afficher';
		showEverythingLabel.setAttribute('for', 'showEverything');
		controls.append(showEverythingLabel);
		const showOnlyWarning = document.createElement('input');
		showOnlyWarning.type = 'radio';
		showOnlyWarning.id = 'showOnlyWarning';
		showOnlyWarning.name = 'showOnlyWarning';
		showOnlyWarning.value = 'showOnlyWarning';
		controls.append(showOnlyWarning);
		const showOnlyWarningLabel = document.createElement('label');
		showOnlyWarningLabel.textContent = 'N’afficher que les avertissements';
		showOnlyWarningLabel.setAttribute('for', 'showOnlyWarning');
		controls.append(showOnlyWarningLabel);
		results.append(controls);

		resultsPlace.append(results);
	}
}

function showControls() {
	const showOnlyWarning = document.querySelector('#showOnlyWarning');
	const showEverything = document.querySelector('#showEverything');

	showOnlyWarning.addEventListener('click', () => {
		showOnlyWarning.checked = 'checked';
		showEverything.checked = '';
		document.querySelectorAll('.has-nope-warning').forEach((el) => {
			el.style.display = 'none';
		});
	});
	showEverything.addEventListener('click', () => {
		showEverything.checked = 'checked';
		showOnlyWarning.checked = '';
		document.querySelectorAll('.has-nope-warning').forEach((el) => {
			el.style.display = 'table-row';
		});
	});
}

translations.forEach(checkTranslation);
showResults();
showControls();
