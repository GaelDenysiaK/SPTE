const styleSheet = document.head.appendChild(document.createElement('style')).sheet;
const translations = document.querySelectorAll('tr.preview:not(.sp-has-spte-error) .translation-text');
const bulkActions = document.querySelector('#bulk-actions-toolbar-top');
const translateRoot = (/https:\/\/translate\.wordpress\.org\//).test(window.location.href);
const translateFr = (/\/fr\//).test(window.location.href);
const translateGP = document.querySelector('.gp-content');
const frenchLocale = document.querySelector('#locales .english a[href="/locale/fr/"]');
const frenchStatsGlobal = document.querySelector('#stats-table tr a[href*="/locale/fr/"]');
const frenchStatsSpecific = document.querySelector('#translation-sets tr a[href*="/fr/"]');
let lsHideCaption = localStorage.getItem('spteHideCaption') === 'true';

if (bulkActions) {
	document.body.classList.add('sp-pte-is-on-board');
}

// Prevent the GlotDict tags in preview by forcing its settings, because when GlotDict goes after SPTE, it doesn't expect to find any tags and it can crashes.
function preventGlotDictTags() {
	localStorage.setItem('gd_curly_apostrophe_warning', 'true');
	localStorage.setItem('gd_no_non_breaking_space', 'true');
}

// Displays the translated string without any markup.
function addForeignToolTip(translation) {
	const preview = translation.closest('tr');
	const translated = preview.querySelector('.translation-text');
	const hook = preview.querySelector('td.actions');
	hook.style.position = 'relative';
	const toolTip = createElement('SPAN', { class: 'sp-foreign-tooltip' });
	toolTip.innerHTML = translated.innerHTML;
	hook.append(toolTip);
}

// Clone Preview with highlights in editor panel.
function addEditorHighlighter(translation) {
	const preview = translation.closest('tr');
	const brother = preview.nextElementSibling;
	if (preview.classList.contains('has-translations')) {
		const help = createElement('DIV', { class: 'sp-editor-highlighter' });
		const trad = preview.querySelector('.translation-text');
		const hook = brother.querySelector('.source-details');
		const copycat = trad.cloneNode(true);
		help.append(copycat);
		if (hook) {
			hook.append(help);
		}
	}
}

// Add CSS classes to preview TR depending on warnings.
function tagTRTranslations(preview) {
	if (!preview.classList.contains('has-translations')) {
		return;
	}
	const trad = preview.querySelector('.translation-text');
	const spteWarning = trad.querySelector('span[class$="--warning"]');
	if (spteWarning) {
		preview.classList.add('sp-has-spte-warning');
	}
	if (trad.querySelector('.sp-word--warning') || trad.querySelector('.sp-quote--warning')) {
		preview.classList.add('sp-has-spte-error');
	}
}

// Check and treat translations, highlight elements (with status rejected we just count down).
function checkTranslation(translation, status) {
	const preview = translation.closest('tr.preview');

	// We don't need to process old rejected translations except the one we just rejected.
	if (!preview || (preview.classList.contains('status-rejected') && status !== 'rejected')) {
		return;
	}
	let text = translation.innerHTML;

	if (status !== 'rejected') {
		addForeignToolTip(translation);
	}

	// For regex compatibility.
	text = text.replaceAll(/&nbsp;/gmi, ' ');

	for (const type in cases) {
		text = text.replace(cases[type].regex, (string) => {
			if (status === 'rejected') {
				cases[type].counter--;
				return string;
			}
			cases[type].counter++;
			return `<span title="${cases[type].cssTitle}" class="${cases[type].cssClass}">${string}</span>`;
		});
	}
	translation.innerHTML = text;

	addEditorHighlighter(preview);
	tagTRTranslations(preview);
}

// Display/Hide caption.
function toggleCaption(e) {
	if (lsHideCaption) {
		e.target.closest('.sp-results__captions').classList.remove('sp-results__captions--closed');
		localStorage.setItem('spteHideCaption', 'false');
		lsHideCaption = false;
		e.target.textContent = 'Masquer la légende';
	} else {
		e.target.closest('.sp-results__captions').classList.add('sp-results__captions--closed');
		localStorage.setItem('spteHideCaption', 'true');
		lsHideCaption = true;
		e.target.textContent = 'Afficher la légende';
	}
	e.preventDefault();
}

// Display stats results on header.
function showResults() {
	const resultsPlace = document.querySelector('#upper-filters-toolbar');
	let results = document.querySelector('#upper-filters-toolbar #sp-results');
	if (results) {
		results.parentNode.removeChild(results);
	}
	results = createElement('DIV', { id: 'sp-results', class: 'sp-results' });
	const resultsData = createElement('DIV', { class: 'sp-results__data' });
	const resultsCaption = createElement('DIV', { class: 'sp-results__captions' });
	results.append(resultsData, resultsCaption);

	const resultsTitle = createElement('P');
	resultsData.append(resultsTitle);
	let nbCharacter = 0;
	let nbTotal = 0;

	for (const item in cases) {
		if (!cases[item].counter) {
			continue;
		}

		addStyle(`.${cases[item].cssClass}`, `${cases[item].style}`);

		if (cases[item].title && cases[item].title !== charTitle) {
			const title = createElement('SPAN', {}, cases[item].title);
			const counter = createElement('SPAN', { class: `${cases[item].cssClass} sp-warning-title` }, cases[item].counter);
			title.append(counter);
			resultsData.append(title);
			nbTotal += cases[item].counter;
		} else if (cases[item].title === charTitle) {
			nbCharacter += cases[item].counter;
			nbTotal += cases[item].counter;
		}
	}
	if (nbCharacter) {
		const title = createElement('SPAN', {}, charTitle);
		const counter = createElement('SPAN', { class: `${charClass} sp-warning-title` }, nbCharacter);
		title.append(counter);
		resultsData.append(title);
	}

	if (nbTotal) {
		const caption = createElement('P', { class: 'sp-results__caption' }, 'Les avertissements en rouge sont avérés. Ceux en rose sont à vérifier mais peuvent compter des faux positifs.');
		resultsTitle.textContent = `éléments à vérifier : ${nbTotal}`;
		resultsTitle.classList.add('sp-results__title');
		const typographyLink = createElement('P', { class: 'sp-results__caption sp-results__caption--link' });
		typographyLink.innerHTML = 'Consultez <a target="_blank" href="https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/">les règles typographiques</a> à respecter pour les caractères.';
		const glossaryLink = createElement('P', { class: 'sp-results__caption sp-results__caption--link' });
		glossaryLink.innerHTML = 'Consultez <a target="_blank" href="https://translate.wordpress.org/locale/fr/default/glossary/">le glossaire officiel</a> à respecter pour les mots.';
		const hideCaption = createElement('A', { id: 'sp-results__toggle-caption', class: 'sp-results__toggle-caption', href: '#' });
		if (lsHideCaption) {
			hideCaption.textContent = 'Afficher la légende';
			resultsCaption.classList.add('sp-results__captions--closed');
		} else {
			hideCaption.textContent = 'Masquer la légende';
		}
		hideCaption.onclick = toggleCaption;
		resultsCaption.append(hideCaption, caption, typographyLink, glossaryLink);

		const controls = createElement('DIV', { class: 'sp-results__controls' });
		const showEverything = createElement('INPUT', { type: 'radio', id: 'sp-show-all-translations', name: 'showEverything', value: 'showEverything', checked: 'checked' });
		controls.append(showEverything);
		const showEverythingLabel = createElement('LABEL', { for: 'sp-show-all-translations' }, 'Tout afficher');
		controls.append(showEverythingLabel);
		const showOnlyWarning = createElement('INPUT', { type: 'radio', id: 'sp-show-only-warnings', name: 'showOnlyWarning', value: 'showOnlyWarning' });
		controls.append(showOnlyWarning);
		const showOnlyWarningLabel = createElement('LABEL', { for: 'sp-show-only-warnings' }, 'N’afficher que les avertissements');
		controls.append(showOnlyWarningLabel);
		results.append(controls);

		resultsPlace.append(results);

		if (bulkActions) {
			const spteSelectErrors = createElement('INPUT', { type: 'checkbox', id: 'sp-select-errors', name: 'spteSelectErrors', value: 'spteSelectErrors' });
			bulkActions.append(spteSelectErrors);
			const spteSelectErrorsLabel = createElement('LABEL', { for: 'sp-select-errors' }, 'Cocher les avertissements en rouge');
			bulkActions.append(spteSelectErrorsLabel);
		}
	}
}

// Add display controls.
function manageControls() {
	const showOnlyWarning = document.querySelector('#sp-show-only-warnings');
	const showEverything = document.querySelector('#sp-show-all-translations');

	if (!showOnlyWarning || !showEverything) {
		return;
	}

	showOnlyWarning.addEventListener('click', () => {
		showOnlyWarning.checked = 'checked';
		showEverything.checked = '';
		document.querySelectorAll('tr.preview:not(.sp-has-spte-warning)').forEach((el) => {
			el.style.display = 'none';
			if (bulkActions) {
				// We uncheck hidden items to prevent bulk processing of non-visible items.
				el.firstElementChild.firstElementChild.checked = '';
			}
		});
	});
	showEverything.addEventListener('click', () => {
		showEverything.checked = 'checked';
		showOnlyWarning.checked = '';
		document.querySelectorAll('tr.preview:not(.sp-has-spte-warning)').forEach((el) => {
			el.style.display = 'table-row';
		});
	});

	const spteSelectErrors = document.querySelector('#sp-select-errors');

	if (!spteSelectErrors) {
		return;
	}

	spteSelectErrors.addEventListener('change', () => {
		let nbSelectedRows = 0;
		if (spteSelectErrors.checked) {
			document.querySelectorAll('tr.preview.sp-has-spte-error').forEach((el) => {
				el.firstElementChild.firstElementChild.checked = 'checked';
				nbSelectedRows++;
			});
		} else {
			document.querySelectorAll('tr.preview.sp-has-spte-error').forEach((el) => {
				el.firstElementChild.firstElementChild.checked = '';
			});
			nbSelectedRows = 0;
		}
		if (document.querySelector('#gd-checked-count')) {
			document.querySelector('#gd-checked-count').remove();
		}
		const gdCountNotice = createElement('DIV', { id: 'gd-checked-count', class: 'notice' }, `${nbSelectedRows} ligne(s) sélectionnée(s)`);
		const tableTranslations = document.querySelector('#translations');
		tableTranslations.parentNode.insertBefore(gdCountNotice, tableTranslations);
	});
}

function treatTranslationOnSave(resp) {
	let translation = null;
	if (resp.trStatus === 'rejected' || resp.trStatus === 'current' || resp.trStatus === 'fuzzy') {
		// A translation is rejected or approved.
		const actualID = resp.data.match('(?<=translation_id=)\\d+') ? resp.data.match('(?<=translation_id=)\\d+')[0] : 0;
		translation = document.querySelector(`[id$="-${actualID}"] .translation-text`);
	} else {
		// A new translation is saved or a translation is approved by an editor.
		const originalID = resp.data.match('(?<=original_id=)\\d+') ? resp.data.match('(?<=original_id=)\\d+')[0] : 0;
		translation = document.querySelector(`[id^="preview-${originalID}"] .translation-text`);
	}
	if (translation && (resp.gpNotice === 'Status set!' || 'Saved!')) {
		checkTranslation(translation, resp.trStatus);
	}
}

// Check and treat a translation on save.
function checkTranslationOnSave() {
	const interceptorScript = document.createElement('script');
	interceptorScript.src = chrome.runtime.getURL('interceptor.js');
	document.head.appendChild(interceptorScript);
	// Receive response from interceptor.js.
	document.addEventListener('translationSaved', (e) => {
		treatTranslationOnSave(e.detail);
		showResults();
	});
}

// Specific to translate.wordpress.org page, brings the FR locale up first to make it easier to access.
function frenchiesGoFirst() {
	const frenchLocaleDiv = frenchLocale.closest('div.locale');
	const firstLocaleDiv = document.querySelector('div.locale:first-child');
	if (firstLocaleDiv && frenchLocaleDiv) {
		firstLocaleDiv.before(frenchLocaleDiv);
	}
}

// Add french flag on french locale in different tables to better identify it.
function frenchFlag() {
	if (frenchLocale) {
		frenchLocale.classList.add('sp-frenchies');
	}
	if (frenchStatsSpecific) {
		frenchStatsSpecific.classList.add('sp-frenchies');
	}
	if (frenchStatsGlobal) {
		frenchStatsGlobal.classList.add('sp-frenchies');
	}
}

if (translateFr && translateGP) {
	preventGlotDictTags();
	translations.forEach(checkTranslation);
	showResults();
	manageControls();
	checkTranslationOnSave();
}
if (translateRoot && frenchLocale) {
	frenchiesGoFirst();
}
frenchFlag();
