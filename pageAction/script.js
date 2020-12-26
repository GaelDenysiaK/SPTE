const settingsForm = document.querySelector('#settings-form');

function saveSettings() {
	const blackToolTip = document.querySelector('#settings-blacktooltip');
	const locales = document.querySelector('#settings-locales');
	const frenchFlag = document.querySelector('#settings-frenchflag');
	const gpcontentBig = document.querySelector('#settings-gpcontent-big');
	const gpcontentMaxWitdh = document.querySelector('#settings-gpcontent-maxwidth');
	chrome.storage.sync.get('spteSettings', (data) => {
		if (chrome.runtime.error || !locales) {	return;	}
		let settings = {};
		if (data.spteSettings) {
			settings = data.spteSettings;
		} else {
			settings = {
				spteOtherSlugs: '',
				spteBlackToolTip: '',
				spteFrenchFlag: '',
				spteGpcontentBig: '',
				spteGpcontentMaxWitdh: '',
			};
		}
		settings.spteBlackToolTip = blackToolTip.checked ? 'true' : 'false';
		settings.spteOtherSlugs = locales.value;
		settings.spteFrenchFlag = frenchFlag.checked ? 'true' : 'false';
		settings.spteGpcontentBig = gpcontentBig.checked ? 'true' : 'false';
		settings.spteGpcontentMaxWitdh = gpcontentMaxWitdh.value;
		chrome.storage.sync.set({ spteSettings: settings }, () => {
			if (chrome.runtime.error) {	console.log('Impossible d’enregistrer les paramètres'); }
			chrome.tabs.reload({ bypassCache: true });
		});
	});
}

function restoreSettings() {
	chrome.storage.sync.get('spteSettings', (data) => {
		if (chrome.runtime.error) {	return;	}
		let initSettings = { spteBlackToolTip: 'true', spteFrenchFlag: 'true' };
		const blackToolTip = document.querySelector('#settings-blacktooltip');
		const locales = document.querySelector('#settings-locales');
		const frenchFlag = document.querySelector('#settings-frenchflag');
		const gpcontentBig = document.querySelector('#settings-gpcontent-big');
		const gpcontentMaxWitdh = document.querySelector('#settings-gpcontent-maxwidth');
		if (!data.spteSettings || !locales || !blackToolTip || !frenchFlag || !gpcontentBig || !gpcontentMaxWitdh) { return; }

		if (data.spteSettings.spteBlackToolTip) {
			blackToolTip.checked = (data.spteSettings.spteBlackToolTip === 'false') ? '' : 'checked';
		} else {
			blackToolTip.checked = 'checked';
			chrome.storage.sync.set({ spteSettings: initSettings }, () => {
				if (chrome.runtime.error) {	console.log('Impossible d’enregistrer les paramètres'); }
			});
		}

		if (data.spteSettings.spteOtherSlugs) {
			locales.value = data.spteSettings.spteOtherSlugs;
		}

		if (data.spteSettings.spteFrenchFlag) {
			frenchFlag.checked = (data.spteSettings.spteFrenchFlag === 'false') ? '' : 'checked';
		} else {
			frenchFlag.checked = 'checked';
			chrome.storage.sync.set({ spteSettings: initSettings }, () => {
				if (chrome.runtime.error) {	console.log('Impossible d’enregistrer les paramètres'); }
			});
		}

		if (data.spteSettings.spteGpcontentBig) {
			gpcontentBig.checked = (data.spteSettings.spteGpcontentBig === 'false') ? '' : 'checked';
		} else {
			gpcontentBig.checked = '';
		}

		if (data.spteSettings.spteGpcontentMaxWitdh) {
			gpcontentMaxWitdh.value = data.spteSettings.spteGpcontentMaxWitdh;
		}
	});
}

document.addEventListener('DOMContentLoaded', restoreSettings);

settingsForm.addEventListener('submit', (e) => {
	e.preventDefault();
	saveSettings();
});
