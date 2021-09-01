// Escape data.
function escapeRegExp(data) {
	return data.replace(/[-[\]{}()*+?.,\\^$|#\s]/gm, '\\$&');
}

const fileExtensions = data.fileExtensions.join('|');

// Match bad words. https://github.com/webaxones/spte/wiki/rgxBadWords
const rgxBadWords = new RegExp(`(?<=[\\s,:;"']|^)(?<!«\\s)${data.badWord.map(escapeRegExp).join('(?=[\\s,.:;"\']|$)|(?<=[\\s,:;"\']|^)(?<!«\\s)')}(?=[\\s,.:;"']|$)`, 'gmi');

// Match single quotes. https://github.com/webaxones/spte/wiki/rgxSingleQuotes
const rgxSingleQuotes = new RegExp('(?<!href\\=|href\\=\'[a-z0-9.]*?)\u0027', 'gm');

// Match slash. https://github.com/webaxones/spte/wiki/rgxSlash
const rgxSlash = new RegExp(`(?<= |\u00a0)\\${data.slash}(?!\\${data.slash}|\\&gt\\;|\\}{2}|\\]{2})|(?<!\\${data.slash})\\${data.slash}(?= |\u00a0)`, 'gmi');

// Match opening hook. https://github.com/webaxones/spte/wiki/rgxOpenHook
const rgxOpenHook = new RegExp(`(?<! |\\${data.openHook}|^)\\${data.openHook}(?!\\${data.openHook})|\\${data.openHook}(?=[ |\u00a0])`, 'gmi');

// Match opening parenthesis. https://github.com/webaxones/spte/wiki/rgxOpenParenthesis
const rgxOpenParenthesis = new RegExp(`(?<![ ]|^)\\${data.openParenthesis}(?!\\%|\\)|s\\)|e\\)|es\\)|nt\\)|vent\\))|(?<!^)\\${data.openParenthesis}(?=[ |\u00a0])`, 'gmi');

// Match opening brace. https://github.com/webaxones/spte/wiki/rgxOpenBrace
const rgxOpenBrace = new RegExp(`(?<! |\\${data.openBrace}|^)\\${data.openBrace}(?!\\${data.openBrace})|\\${data.openBrace}(?=[ |\u00a0])`, 'gmi');

// Match ellipsis. https://github.com/webaxones/spte/wiki/rgxEllipsis
const rgxEllipsis = new RegExp(`(?<=[ |\u00a0])\\${data.ellipsis}|\\${data.ellipsis}(?=[a-zÀ-ú0-9]| $|\u00a0$)`, 'gmi');

// Match period. https://github.com/webaxones/spte/wiki/rgxPeriod
const rgxPeriod = new RegExp(`(?<= |\u00a0)\\${data.period}(?!${fileExtensions})|(?<![a-zÀ-ú0-9\\${data.period}]*?)\\${data.period}(?=[a-zÀ-ú0-9])|\\${data.period}( $|\u00a0$)`, 'gmi');

// Match comma. https://github.com/webaxones/spte/wiki/rgxComma
const rgxComma = new RegExp(`(?<=[ |\u00a0])\\${data.comma}|\\${data.comma}(?=[a-zÀ-ú]| $|\u00a0$)`, 'gmi');

// Match closing hook. https://github.com/webaxones/spte/wiki/rgxCloseHook
const rgxCloseHook = new RegExp(`(?<=[ |\u00a0])\\${data.closeHook}|(?<!\\${data.closeHook})\\${data.closeHook}(?=[a-zÀ-ú0-9]| $|\u00a0$)`, 'gmi');

// Match closing parenthesis. https://github.com/webaxones/spte/wiki/rgxCloseParenthesis
const rgxCloseParenthesis = new RegExp(`(?<= |\u00a0|\\([a-d]|\\([f-r]|\\([t-z])\\${data.closeParenthesis}|\\${data.closeParenthesis}(?=[a-rt-zÀ-ú0-9]\u00a0$|\u00a0[a-zÀ-ú]{2,})`, 'gmi');

// Match closing brace. https://github.com/webaxones/spte/wiki/rgxCloseBrace
const rgxCloseBrace = new RegExp(`(?<=[ |\u00a0])\\${data.closeBrace}|(?<!\\${data.closeBrace})\\${data.closeBrace}(?=[a-zÀ-ú0-9]|\u00a0| $|\u00a0$)`, 'gmi');

// Match exclamation point. https://github.com/webaxones/spte/wiki/rgxExclamationPoint
const rgxExclamationPoint = new RegExp(`(?<!\u00a0|^)\\${data.exclamationPoint}|\\${data.exclamationPoint}(?! |$)`, 'gmi');

// Match plus sign. https://github.com/webaxones/spte/wiki/rgxPlusSign
const rgxPlusSign = new RegExp(`(?<!\u00a0|google|^)\\${data.plusSign}|\\${data.plusSign}(?! |$)`, 'gmi');

// Match question mark. https://github.com/webaxones/spte/wiki/rgxQuestionMark
const rgxQuestionMark = new RegExp(`(?<!\u00a0|\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}|(?<!\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}(?! |$)`, 'gmi');

// Match colon. https://github.com/webaxones/spte/wiki/rgxColon
const rgxColon = new RegExp(`(?<!\u00a0|https|http| \\d{2}|\u00a0\\d{2}| hh|\u00a0hh| mm|\u00a0mm| aaaa|\u00a0aaaa)${data.colon}(?= )|(?<=\u00a0)${data.colon}(?! |$)|(?<!\u00a0|https|http| \\d{2}|\u00a0\\d{2}| hh|\u00a0hh| mm|\u00a0mm| aaaa|\u00a0aaaa)${data.colon}(?! )`, 'gmi');

// Match semicolon. https://github.com/webaxones/spte/wiki/rgxSemiColon
const rgxSemiColon = new RegExp(`(?<!\u00a0|:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}|(?<!:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}(?! )`, 'gmi');

// Match closing french quote. https://github.com/webaxones/spte/wiki/rgxClosingFrQuote
const rgxClosingFrQuote = new RegExp(`(?<!\u00a0)${data.closingFrQuote}|${data.closingFrQuote}(?! |\\.|\\,|\u00a0\\?|\u00a0\\!|\u00a0\\:|\u00a0\\;|$)`, 'gmi');

// Match opening french quote. https://github.com/webaxones/spte/wiki/rgxOpenFrQuote
const rgxOpenFrQuote = new RegExp(`(?<! |^)${data.openFrQuote}|${data.openFrQuote}(?!\u00a0|$)`, 'gmi');
