// Styles.
const styleSheet = document.head.appendChild(document.createElement('style')).sheet;

// Check locations.
const onTranslateWordPressRoot = (/https:\/\/translate\.wordpress\.org\//).test(window.location.href);
const onTranslateFr = (/\/fr\//).test(window.location.href);

// Settings (localStorage don't have booleans).
let lsHideCaption = localStorage.getItem('spteHideCaption') === 'true';
let lsStickyHeader = localStorage.getItem('spteStickyHeader') === 'true';

// Main existing elements.
const gpContent = document.querySelector('.gp-content');
const bigTitle = document.querySelector('.gp-content .breadcrumb+h2');
const topPaging = document.querySelector('.gp-content .paging');
const translations = document.querySelectorAll('tr.preview:not(.sp-has-spte-error) .translation-text');
const bulkActions = document.querySelector('#bulk-actions-toolbar-top');
if (bulkActions) {
	document.body.classList.add('sp-pte-is-on-board');
}
const tableTranslations = document.querySelector('#translations');
const filterToolbar = document.querySelector('.filter-toolbar');
const isConnected = document.querySelector('body.logged-in') !== null;
const GDmayBeOnBoard = localStorage.getItem('gd_language') !== null;

// Main elements created.
const spHeader = createElement('DIV', { id: 'sp-main-header' });
const spPopup = createElement('DIV', { id: 'sp-the-popup', class: 'sp-the-popup--hidden' });
const spGdNoticesContainer = createElement('DIV', { id: 'sp-gd-notices-container' });
const spConsistency = createElement('DIV', { id: 'sp-consist-container' });
const spConsistencyLabel = createElement('LABEL', { for: 'sp-consist__text' }, 'Vérifier la cohérence d’une chaîne');
const spConsistencyInputText = createElement('INPUT', { type: 'text', id: 'sp-consist__text', name: 'spConsistencyInputText', value: '' });
const spConsistencyBtn = createElement('INPUT', { type: 'button', id: 'sp-consist__btn', name: 'spConsistencyBtn', value: 'Vérifier' });
spConsistency.append(spConsistencyLabel, spConsistencyInputText, spConsistencyBtn);
const spControls = createElement('DIV', { id: 'sp-controls' });
const spToTop = createElement('A', { id: 'sp-to-top', title: 'Remonter 🚀' });
const results = createElement('DIV', { id: 'sp-results', class: 'sp-results' });
const resultsData = createElement('DIV', { class: 'sp-results__data' });
const resultsCaption = createElement('DIV', { class: 'sp-results__captions' });
const resultsTitle = createElement('P');
results.append(resultsData, resultsCaption);
resultsData.append(resultsTitle);
const title = createElement('SPAN', {}, charTitle);
const caption = createElement('P', { class: 'sp-results__caption' });
const typographyLink = createElement('P', { class: 'sp-results__caption sp-results__caption--link' });
const glossaryLink = createElement('P', { class: 'sp-results__caption sp-results__caption--link' });
const hideCaption = createElement('A', { id: 'sp-results__toggle-caption', href: '#', title: 'Légende' });
const controlStickyHeader = createElement('A', { id: 'sp-results__toggle-header', class: 'sp-results__buttons', href: '#', title: 'En-tête fixe' }, '📌');
const linkGlossary = createElement('A', { id: 'sp-results__link-glossary', class: 'sp-results__buttons', href: 'https://translate.wordpress.org/locale/fr/default/glossary/', target: '_blank', title: 'Glossaire officiel' }, '📕');
const linkTypography = createElement('A', { id: 'sp-results__link-typo', class: 'sp-results__buttons', href: 'https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/', target: '_blank', title: 'Règles typographiques' }, '📕');
const linkConsistency = createElement('A', { id: 'sp-results__link-consist', class: 'sp-results__buttons', href: 'https://translate.wordpress.org/consistency/?search=&set=fr%2Fdefault&project=', target: '_blank', title: 'Cohérence des traductions' }, '📘');

if (!lsStickyHeader) {
	controlStickyHeader.classList.add('sp-toggle-header--off');
	spHeader.classList.add('sticky--off');
}
if (filterToolbar) {
	filterToolbar.append(linkGlossary);
	filterToolbar.append(linkTypography);
	filterToolbar.append(linkConsistency);
	filterToolbar.append(controlStickyHeader);
}
const spFilters = createElement('DIV', { class: 'sp-controls__filters' }, 'Afficher  ');
const showEverything = createElement('INPUT', { type: 'radio', id: 'sp-show-all-translations', name: 'showEverything', value: 'showEverything', checked: 'checked' });
spFilters.append(showEverything);
const showEverythingLabel = createElement('LABEL', { for: 'sp-show-all-translations' }, 'Tout');
spFilters.append(showEverythingLabel);
const showOnlyWarning = createElement('INPUT', { type: 'radio', id: 'sp-show-only-warnings', name: 'showOnlyWarning', value: 'showOnlyWarning' });
spFilters.append(showOnlyWarning);
const showOnlyWarningLabel = createElement('LABEL', { for: 'sp-show-only-warnings' }, 'Les avertissements');
spFilters.append(showOnlyWarningLabel);
const pteControls = createElement('DIV', { class: 'sp-controls__pte' });
const spSelectErrors = createElement('INPUT', { type: 'checkbox', id: 'sp-select-errors', name: 'spteSelectErrors', value: 'spteSelectErrors' });
const spSelectErrorsLabel = createElement('LABEL', { for: 'sp-select-errors' }, 'Cocher les avertissements en rouge');

if (bulkActions) {
	pteControls.append(spSelectErrors);
	pteControls.append(spSelectErrorsLabel);
	bulkActions.after(pteControls);
}

// French elements.
const frenchLocale = document.querySelector('#locales .english a[href="/locale/fr/"]');
const frenchStatsGlobal = document.querySelector('#stats-table tr a[href*="/locale/fr/"]');
const frenchStatsSpecific = document.querySelector('#translation-sets tr a[href*="/fr/"]');

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
	const brotherHighlighter = brother.querySelector('.sp-editor-highlighter') || null;
	if (brotherHighlighter) {
		brother.querySelector('.sp-editor-highlighter').parentNode.removeChild(brother.querySelector('.sp-editor-highlighter'));
	}
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
	const hasTranslation = preview.classList.contains('has-translations');

	const trad = preview.querySelector('.translation-text');
	const spWarning = trad.querySelector('span[class$="--warning"]');
	if (hasTranslation && spWarning) {
		preview.classList.add('sp-has-spte-warning');
	}
	if (hasTranslation && (trad.querySelector('.sp-word--warning') || trad.querySelector('.sp-quote--warning'))) {
		preview.classList.add('sp-has-spte-error');
	}
}

// Check and treat translations, highlight elements (with status rejected we just count down).
function checkTranslation(translation, oldStatus, newStatus) {
	const preview = translation.closest('tr.preview');

	addForeignToolTip(translation);

	// We don't need to process old rejected translations except the one we just rejected but only for counters.
	if (!preview || (preview.classList.contains('status-rejected') && newStatus !== 'rejected')) {
		return;
	}

	let text = translation.innerHTML;

	// For regex compatibility.
	text = text.replaceAll(/&nbsp;/gmi, ' ');

	for (const type in cases) {
		text = text.replace(cases[type].regex, (string) => {
			// GlotPress has 6 status : untranslated, current, fuzzy, waiting, old, rejected. Old and rejected musn't be counted.
			switch (newStatus) {
			case 'rejected':
				if (oldStatus !== 'old') {
					cases[type].counter--;
				}
				break;
			case 'fuzzy':
				if (oldStatus === 'rejected') {
					cases[type].counter++;
				}
				break;
			case 'current':
				if (oldStatus !== 'waiting') {
					cases[type].counter++;
				}
				break;
			case 'waiting':
				if (oldStatus !== 'current') {
					cases[type].counter++;
				}
				break;
			default:
				cases[type].counter++;
				break;
			}
			if (newStatus !== 'rejected') {
				return `<span title="${cases[type].cssTitle}" class="${cases[type].cssClass}">${string}</span>`;
			}
			return string;
		});
	}
	translation.innerHTML = text;
	addEditorHighlighter(preview);
	tagTRTranslations(preview);
}

// Display/Hide caption.
function toggleCaption(e) {
	lsHideCaption = lsHideCaption !== true;
	resultsCaption.classList.toggle('sp-results__captions--closed');
	e.target.textContent = (e.target.textContent === 'Masquer la légende') ? '' : 'Masquer la légende';
	localStorage.setItem('spteHideCaption', ((lsHideCaption === true) ? 'true' : 'false'));
	e.preventDefault();
}

// Activate/Deactivate sticky header.
function toggleStickyHeader(e) {
	lsStickyHeader = lsStickyHeader !== true;
	e.target.classList.toggle('sp-toggle-header--off');
	spHeader.classList.toggle('sticky--off');
	localStorage.setItem('spteStickyHeader', ((lsStickyHeader === true) ? 'true' : 'false'));
	e.preventDefault();
}

// Display stats results on header.
function displayResults() {
	let nbCharacter = 0;
	let nbTotal = 0;

	for (const item in cases) {
		if (!cases[item].counter) {
			continue;
		}

		addStyle(`.${cases[item].cssClass}`, `${cases[item].style}`);

		if (cases[item].title && cases[item].title !== charTitle) {
			let counter = document.querySelector(`.${cases[item].cssClass}.sp-warning-title`);
			if (counter) {
				counter.textContent = cases[item].counter;
			} else {
				const title = createElement('SPAN', {}, cases[item].title);
				counter = createElement('SPAN', { class: `${cases[item].cssClass} sp-warning-title` }, cases[item].counter);
				title.append(counter);
				resultsData.append(title);
			}
			nbTotal += cases[item].counter;
		} else if (cases[item].title === charTitle) {
			nbCharacter += cases[item].counter;
			nbTotal += cases[item].counter;
		}
	}

	let counter = document.querySelector(`.${charClass}.sp-warning-title`);
	if (counter) {
		counter.textContent = nbCharacter;
	} else if (nbCharacter) {
		counter = createElement('SPAN', { class: `${charClass} sp-warning-title` }, nbCharacter);
		title.append(counter);
		resultsData.append(title);
	}

	resultsTitle.textContent = `éléments à vérifier : ${nbTotal}`;

	if (nbTotal && !resultsTitle.classList.contains('sp-results__title')) {
		caption.innerHTML = 'Les avertissements en rouge sont à <strong class="sp-info" title="Quelques rares exceptions subsistent, par exemple lorsque le mot fait partie du nom de l’extension">très forte probabilité</strong>. Ceux en rose sont à <strong class="sp-info" title="Les exceptions sont fréquentes lorsque du code est intégré aux traductions (fonctions, paramètres…)">forte probabilité</strong> mais à vérifier car ils peuvent compter des faux positifs.';
		resultsTitle.classList.add('sp-results__title');
		glossaryLink.innerHTML = 'Consultez <a target="_blank" href="https://translate.wordpress.org/locale/fr/default/glossary/">le glossaire officiel</a> à respecter pour les mots.';
		typographyLink.innerHTML = 'Consultez <a target="_blank" href="https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/">les règles typographiques</a> à respecter pour les caractères.';
		if (lsHideCaption) {
			hideCaption.textContent = '';
			resultsCaption.classList.add('sp-results__captions--closed');
		} else {
			hideCaption.textContent = 'Masquer la légende';
		}
		hideCaption.onclick = toggleCaption;
		resultsCaption.append(hideCaption, caption, glossaryLink, typographyLink);
		filterToolbar.append(results);
	}
	const characters = document.querySelector('.sp-warning-title.sp-char--warning');
	if (nbCharacter === 0 && characters) {
		characters.parentNode.remove();
	}
	const quotes = document.querySelector('.sp-warning-title.sp-quote--warning');
	if (cases.quotes.counter === 0 && quotes) {
		quotes.parentNode.remove();
	}
}

// Manage controls.
function manageControls() {
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

	if (!spSelectErrors) {
		return;
	}

	spSelectErrors.addEventListener('change', () => {
		let nbSelectedRows = 0;
		if (spSelectErrors.checked) {
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
		tableTranslations.parentNode.insertBefore(gdCountNotice, tableTranslations);
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

// Observe mutations.
function observeMutations() {
	const observerMutations = new MutationObserver((mutations) => {
		let removedRowID;
		let addedRowID;
		let oldStatus;
		let newStatus;
		let translation;
		mutations.forEach((mutation) => {
			mutation.removedNodes.forEach((removedNode) => {
				if (!removedRowID && !oldStatus && removedNode.nodeName === 'TR' && removedNode.classList.contains('preview')) {
					removedRowID = removedNode.id;
					if (removedNode.classList.contains('untranslated')) {
						oldStatus = 'untranslated';
					} else {
						oldStatus = removedNode.classList.value.match('(?<=status-)(\\w*)(?= )')[0];
					}
				}
			});

			mutation.addedNodes.forEach((addedNode) => {
				if (addedNode.nodeType !== 1) {
					return;
				}
				// Rows for status changes.
				if (!addedRowID && !newStatus && addedNode.nodeName === 'TR' && addedNode.classList.contains('preview')) {
					addedRowID = addedNode.id;
					newStatus = addedNode.classList.value.match('(?<=status-)(\\w*)(?= )')[0];
				}

				// GlotDict Notices. Beware, if parent needs to change, to test if addedNode hasn't already been added to parent.
				if (GDmayBeOnBoard && addedNode.parentNode !== spGdNoticesContainer && addedNode.id.startsWith('gd-') && addedNode.classList.contains('notice')) {
					spGdNoticesContainer.appendChild(addedNode);
				}
			});
		});

		if (removedRowID && addedRowID && oldStatus && newStatus) {
			if (oldStatus === 'untranslated' && !addedRowID.toString().startsWith(removedRowID.replace('old', ''))) {
				return;
			}
			if (oldStatus !== 'untranslated' && !removedRowID.toString().startsWith(addedRowID)) {
				return;
			}
			translation = document.querySelector(`#${addedRowID} .translation-text`);
			checkTranslation(translation, oldStatus, newStatus);
			displayResults();
			manageControls();
		}
	});

	observerMutations.observe(gpContent, {
		subtree: true,
		childList: true,
	});
}

// Put all elements in a stickable header.
function reorderHeader() {
	spHeader.append(spToTop);
	spToTop.textContent = '↑';
	spHeader.append(filterToolbar);
	spHeader.append(spConsistency);
	controlStickyHeader.onclick = toggleStickyHeader;
	if (isConnected && bulkActions) {
		spHeader.append(bulkActions);
	}
	if (bulkActions) {
		spControls.append(pteControls);
	}
	spControls.append(spFilters);
	if (topPaging) {
		spControls.append(topPaging);
	}
	spHeader.append(spControls);
	spHeader.append(spGdNoticesContainer);
	bigTitle.after(spHeader);
	spHeader.before(spPopup);
}

function checkConsistency() {
	const inputValue = spConsistencyInputText.value;
	if (inputValue === '') {
		return;
	}
	spPopup.classList.remove('sp-the-popup--hidden');
	const URL = `https://translate.wordpress.org/consistency/?search=${inputValue}&set=fr%2Fdefault&`;
	fetch(URL).then((response) => response.text()).then((data) => {
		const table = data.replace(/(\r\n|\n|\r)/gm, '').match(/(?<=consistency-table">)(.*?)(?=<\/table>)/gmi);
		if (table && table[0]) {
			spPopup.innerHTML = `<table class="consistency">${table[0]}</table>}`;
		} else {
			spPopup.innerHTML = '<h1 style="text-align:center;margin:2em auto;">Aucun résultat</h1>';
		}
	});
}

function closePopup(e) {
	if (!spPopup.contains(e.target) && e.target !== spConsistencyBtn) {
		spPopup.classList.add('sp-the-popup--hidden');
	}
}

function scrollToTop() {
	document.querySelector('#wporg-header').scrollIntoView({
		block: 'start',
		behavior: 'smooth',
	});
}

function declareEvents() {
	document.addEventListener('click', (e) => {
		closePopup(e);
	});

	document.addEventListener('keyup', (e) => {
		switch (e.key) {
		case 'Escape':
			closePopup(e);
			break;

		default:
			break;
		}
	});

	spConsistencyInputText.addEventListener('keyup', (e) => {
		e.preventDefault();
		switch (e.key) {
		case 'Enter':
			checkConsistency();
			break;

		default:
			break;
		}
	});

	spConsistencyBtn.addEventListener('click', (e) => {
		e.preventDefault();
		checkConsistency();
	});

	spToTop.addEventListener('click', (e) => {
		e.preventDefault();
		scrollToTop();
	});
}

if (onTranslateFr && gpContent && tableTranslations) {
	preventGlotDictTags();
	translations.forEach(checkTranslation);
	displayResults();
	manageControls();
	reorderHeader();
	ifSourceHiddenTagTarget('.breadcrumb+h2', '#sp-main-header', 'sp-sticky');
	if (isConnected) {
		observeMutations();
	}
	declareEvents();
}
if (onTranslateWordPressRoot && frenchLocale) {
	frenchiesGoFirst();
}
frenchFlag();
