// Escape data.
function escapeRegExp(data) {
	return data.replace(/[-[\]{}()*+?.,\\^$|#\s]/gm, '\\$&');
}

const fileExtensions = data.fileExtensions.join('|');

// Match bad words.
const rgxBadWords = new RegExp(`(?<=[\\s,.:;"']|^)${data.badWord.map(escapeRegExp).join('(?=[\\s,.:;"\']|$)|(?<=[\\s,.:;"\']|^)')}(?=[\\s,.:;"']|$)`, 'gmi');

// Match single quotes.
const rgxSingleQuotes = new RegExp('(?<!href\\=|href\\=\'[a-z0-9.]*?|%[a-z])\u0027(?!%)', 'gm');

// Match slash with spaces (before and after, breaking or not) and not preceded or not followed by another slash and not followed by a greater-than.
const rgxSlash = new RegExp(`(?<= | )\\${data.slash}(?!\\${data.slash}|\\&gt\\;|\\}{2}|\\]{2})|(?<!\\${data.slash})\\${data.slash}(?= | )`, 'gmi');

// Match typographic rules "space before": not preceded by space (breaking or non breaking) and not as first character OR not as first character and followed by space (breaking or non breaking)
// plus double opening hook case.
const rgxOpenHook = new RegExp(`(?<! |\\${data.openHook}|^)\\${data.openHook}(?!\\${data.openHook})|\\${data.openHook}(?=[ | ])`, 'gmi');

// Match opening parenthesis in different cases: typographic rules "space before" plus (s) (e) (es) (nt) (vent) (% () cases.
const rgxOpenParenthesis = new RegExp(`(?<![ ]|^)\\${data.openParenthesis}(?!\\%|\\)|s\\)|e\\)|es\\)|nt\\)|vent\\))|(?<!^)\\${data.openParenthesis}(?=[ | ])`, 'gmi');

// Match opening brace in different cases : typographic rules "space before" plus double opening brace case.
const rgxOpenBrace = new RegExp(`(?<! |\\${data.openBrace}|^)\\${data.openBrace}(?!\\${data.openBrace})|\\${data.openBrace}(?=[ | ])`, 'gmi');

// Match ellipsis in different cases : preceded by space (breaking or non breaking) OR followed by letter or number or ending space (breaking or non breaking).
const rgxEllipsis = new RegExp(`(?<=[ | ])\\${data.ellipsis}|\\${data.ellipsis}(?=[a-zÀ-ú0-9]| $| $)`, 'gmi');

// Match period in different cases: typographic rules "spaceAfter" plus URL plus version numbers plus .htaccess and .maintenance.
const rgxPeriod = new RegExp(`(?<= | )\\${data.period}(?!${fileExtensions})|(?<![a-zÀ-ú0-9\\${data.period}]*?)\\${data.period}(?=[a-zÀ-ú0-9])|\\${data.period}( $| $)`, 'gmi');

// Match comma in different cases: typographic rules "spaceAfter" plus decimals.
const rgxComma = new RegExp(`(?<=[ | ])\\${data.comma}|\\${data.comma}(?=[a-zÀ-ú]| $| $)`, 'gmi');

// Match closing hook in different cases: typographic rules "space after" plus double closing hook case.
const rgxCloseHook = new RegExp(`(?<=[ | ])\\${data.closeHook}|(?<!\\${data.closeHook})\\${data.closeHook}(?=[a-zÀ-ú0-9]| $| $)`, 'gmi');

// Match closing parenthesis in different cases: typographic rules "space after" plus (s) (e) (es) (nt) (vent) (%x) cases.
const rgxCloseParenthesis = new RegExp(`(?<= | |\\([a-d]|\\([f-r]|\\([t-z])\\${data.closeParenthesis}|\\${data.closeParenthesis}(?=[a-rt-zÀ-ú0-9]| )`, 'gmi');

// Match closing brace in different cases: typographic rules "space after" plus double closing brace case.
const rgxCloseBrace = new RegExp(`(?<=[ | ])\\${data.closeBrace}|(?<!\\${data.closeBrace})\\${data.closeBrace}(?=[a-zÀ-ú0-9]| | $| $)`, 'gmi');

// Match exclamation point not preceded by non breaking space and not as first character OR followed by breaking space and not as last character.
const rgxExclamationPoint = new RegExp(`(?<! |^)\\${data.exclamationPoint}|\\${data.exclamationPoint}(?! |$)`, 'gmi');

// Match plus sign not preceded by non breaking space and not as first character OR followed by breaking space and not as last character.
const rgxPlusSign = new RegExp(`(?<! |google|^)\\${data.plusSign}|\\${data.plusSign}(?! |$)`, 'gmi');

// Match question mark in different cases: typographic rules "non-breaking space before" plus URL.
const rgxQuestionMark = new RegExp(`(?<! |\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}|(?<!\\/|\\.php|\\/[a-z0-9\\-\\#\\.\\_]*?|^)\\${data.questionMark}(?! |$)`, 'gmi');

// Match colon in different cases: typographic rules "nbkSpaceBefore" plus URL case plus style="rule:value plus hh mm ss aaaa jj 9: 99: (time) :999 (font-size in stack) plus smiling text smileys.
const rgxColon = new RegExp(`(?<! |&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3}|\\-\\) |\\-\\) |\\-\\)$|\\) |\\) |\\)$)|(?<!&lt;.*?|hh|mm|aaaa|\\d{1}|\\d{2})${data.colon}(?! |\\/{2}|\\d{3}|\\-\\) |\\-\\) |\\-\\)$|\\) |\\) |\\)$|$)`, 'gmi');

// Match semicolon in different cases: typographic rules "nbkSpaceBefore" plus not preceded by every HTML code (hex, dec, mnemo) and by CSS rules.
const rgxSemiColon = new RegExp(`(?<! |:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}|(?<!:[a-z0-9.]*?|&[${data.semiColon}a-z0-9#]*?)${data.semiColon}(?! )`, 'gmi');

// Match closing french quote in different cases: typographic rules "nbkSpaceBefore" plus followed by colon or comma.
const rgxClosingFrQuote = new RegExp(`(?<! )${data.closingFrQuote}|${data.closingFrQuote}(?! |\\.|\\,| \\?| \\!| \\:| \\;|$)`, 'gmi');

// Match characters open french quote not preceded by breaking space OR followed by non breaking space.
const rgxOpenFrQuote = new RegExp(`(?<! |^)[${data.openFrQuote}]|[${data.openFrQuote}](?! |$)`, 'gmi');
