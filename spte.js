const currentUrl = window.location.href;
const styleSheet = document.head.appendChild(document.createElement('style')).sheet;
const translations = document.querySelectorAll('.translation-text');
const bulkActions = document.querySelector('#bulk-actions-toolbar-top');
if (bulkActions) {
	document.body.classList.add('spte-is-on-board');
}

// Prevent the GlotDict tags in preview by forcing its settings, because when GlotDict goes after SPTE, it doesn't expect to find any tags and it crashes its regex.
function preventGlotDictTags() {
	localStorage.setItem('gd_curly_apostrophe_warning', 'true');
	localStorage.setItem('gd_no_non_breaking_space', 'true');
}

// Displays the translated string without any markup.
function addTextOriginalToolTip(translation) {
	const origin = translation.closest('tr');
	const toolTip = document.createElement('span');
	const translated = origin.querySelector('.translation-text');
	const hook = origin.querySelector('td.actions');
	hook.style.position = 'relative';
	toolTip.innerHTML = translated.innerHTML;
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
		const spteWarning = trad.querySelector('span[class$="--warning"]');
		if (spteWarning) {
			origin.classList.add('has-spte-warning');
			if (spteWarning.classList.contains('word--warning') || spteWarning.classList.contains('quote--warning')) {
				origin.classList.add('has-spte-error');
			}
		}
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

	addTextOriginalToolTip(translation);

	preventGlotDictTags();

	// For regex compatibility.
	text = text.replaceAll(/&nbsp;/gmi, ' ');

	for (const type in cases) {
		text = text.replace(cases[type].regex, (string) => {
			cases[type].counter++;
			return `<span title="${cases[type].cssTitle}" class="${cases[type].cssClass}">${string}</span>`;
		});
	}
	translation.innerHTML = text;

	addHelpTranslationWrapper(translation);
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
	addStyle('.original__tooltip', 'display:none;position:absolute;width:calc(-5em - 10px + 42.5vw);top:100%;right:5em;z-index:666;padding:20px 13px 20px 7px;background:#000;color:#fff;text-align:left;font-size:17px;line-height:1.66;box-shadow:0 10px 10px rgba(0,0,0,.3)');
	addStyle('.spte-is-on-board .original__tooltip', 'width:calc(-5em - 22px + 42.5vw)');
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
		addStyle('#showEverything,#showOnlyWarning', 'margin:1em 0 0 .6em');
		addStyle('#showEverything+label,#showOnlyWarning+label', 'margin:0 1.5em 0 .5em');
		addStyle('#spteSelectErrors', 'margin:1em .58em');
		addStyle('#spteSelectErrors+label', 'margin:0 1.5em 0 0;font-weight:bold');

		const legend = document.createElement('p');
		legend.textContent = 'Les avertissements en rouge sont avérés. Ceux en rose sont à vérifier mais peuvent compter des faux positifs.';
		legend.classList.add('warning-legend');
		results.append(legend);
		resultsTitle.textContent = `éléments à vérifier : ${nbTotal}`;
		resultsTitle.classList.add('results__title');

		const typographyLink = document.createElement('p');
		const glossaryLink = document.createElement('p');
		typographyLink.innerHTML = 'Consultez <a target="_blank" href="https://fr.wordpress.org/team/handbook/guide-du-traducteur/les-regles-typographiques-utilisees-pour-la-traduction-de-wp-en-francais/">les règles typographiques</a> à respecter pour les caractères.';
		glossaryLink.innerHTML = 'Consultez <a target="_blank" href="https://translate.wordpress.org/locale/fr/default/glossary/">le glossaire officiel</a> à respecter pour les mots.';
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

		if (bulkActions) {
			const spteSelectErrors = document.createElement('input');
			spteSelectErrors.type = 'checkbox';
			spteSelectErrors.id = 'spteSelectErrors';
			spteSelectErrors.name = 'spteSelectErrors';
			spteSelectErrors.value = 'spteSelectErrors';
			spteSelectErrors.checked = '';
			const spteSelectErrorsLabel = document.createElement('label');
			spteSelectErrorsLabel.textContent = 'Cocher les avertissements en rouge';
			spteSelectErrorsLabel.setAttribute('for', 'spteSelectErrors');
			bulkActions.append(spteSelectErrors);
			bulkActions.append(spteSelectErrorsLabel);
		}
	}
}

function manageControls() {
	const showOnlyWarning = document.querySelector('#showOnlyWarning');
	const showEverything = document.querySelector('#showEverything');

	if (!showOnlyWarning || !showEverything) { return; }

	showOnlyWarning.addEventListener('click', () => {
		showOnlyWarning.checked = 'checked';
		showEverything.checked = '';
		document.querySelectorAll('tr.preview:not(.has-spte-warning)').forEach((el) => {
			el.style.display = 'none';
			if (bulkActions) {
				// We uncheck hidden elements to prevent bulk processing from non-visible elements.
				el.firstElementChild.firstElementChild.checked = '';
			}
		});
	});
	showEverything.addEventListener('click', () => {
		showEverything.checked = 'checked';
		showOnlyWarning.checked = '';
		document.querySelectorAll('tr.preview:not(.has-spte-warning)').forEach((el) => {
			el.style.display = 'table-row';
		});
	});
	const spteSelectErrors = document.querySelector('#spteSelectErrors');
	if (!spteSelectErrors) { return; }
	spteSelectErrors.addEventListener('change', () => {
		let nbSelectedRows = 0;
		if (spteSelectErrors.checked) {
			document.querySelectorAll('tr.preview.has-spte-error').forEach((el) => {
				el.firstElementChild.firstElementChild.checked = 'checked';
				nbSelectedRows++;
			});
		} else {
			document.querySelectorAll('tr.preview.has-spte-error').forEach((el) => {
				el.firstElementChild.firstElementChild.checked = '';
			});
			nbSelectedRows = 0;
		}
		if (document.querySelector('#gd-checked-count')) {
			document.querySelector('#gd-checked-count').remove();
		}
		const gdCountNotice = document.createElement('div');
		gdCountNotice.id = 'gd-checked-count';
		gdCountNotice.textContent = `${nbSelectedRows} ligne(s) sélectionnée(s)`;
		gdCountNotice.classList.add('notice');
		const tableTranslations = document.querySelector('#translations');
		tableTranslations.parentNode.insertBefore(gdCountNotice, tableTranslations);
	});
}

function frenchiesGoFirst() {
	const frenchLocaleLnk = document.querySelector('#locales .native a[href="/locale/fr/"]');
	if (!frenchLocaleLnk) { return; }

	const frenchLocale = frenchLocaleLnk.closest('div.locale');
	if (!frenchLocale) { return; }

	addStyle('.frenchies', 'position:relative');
	addStyle('.frenchies:before', 'content:"";position:absolute;width:23px;height:15px;top:23px;left:132px;background:linear-gradient( 90deg, #002395 33.33333%, #fff 33.33333%, #fff 66.66667%, #ed2939 66.66667% )');
	frenchLocale.classList.add('frenchies');
	const firstLocale = document.querySelector('div.locale:first-child');
	firstLocale.before(frenchLocale);
}

if ((/\/fr\//).test(currentUrl)) {
	translations.forEach(checkTranslation);
	showResults();
	manageControls();
}

if ((/https:\/\/translate\.wordpress\.org\//).test(currentUrl)) {
	frenchiesGoFirst();
}
