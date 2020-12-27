const settingsForm = document.querySelector('#settings-form');

function saveSettings() {
	const blackToolTip = document.querySelector('#settings-blacktooltip');
	const betterReadability = document.querySelector('#settings-betterreadability');
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
				spteBlackToolTip: '',
				spteBetterReadability: '',
				spteOtherSlugs: '',
				spteFrenchFlag: '',
				spteGpcontentBig: '',
				spteGpcontentMaxWitdh: '',
			};
		}
		settings.spteBlackToolTip = blackToolTip.checked ? 'true' : 'false';
		settings.spteBetterReadability = betterReadability.checked ? 'true' : 'false';
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
		const blackToolTip = document.querySelector('#settings-blacktooltip');
		const betterReadability = document.querySelector('#settings-betterreadability');
		const locales = document.querySelector('#settings-locales');
		const frenchFlag = document.querySelector('#settings-frenchflag');
		const gpcontentBig = document.querySelector('#settings-gpcontent-big');
		const gpcontentMaxWitdh = document.querySelector('#settings-gpcontent-maxwidth');
		let initSettings = { spteBlackToolTip: 'true', spteFrenchFlag: 'true' };
		if (data.spteSettings === undefined) {
			blackToolTip.checked = 'checked';
			frenchFlag.checked = 'checked';
			chrome.storage.sync.set({ spteSettings: initSettings }, () => {
				if (chrome.runtime.error) {	console.log('Impossible d’initialiser les paramètres'); }
			});
		}
		if (!data.spteSettings || !blackToolTip || !betterReadability || !locales || !frenchFlag || !gpcontentBig || !gpcontentMaxWitdh) { return; }

		if (data.spteSettings.spteBlackToolTip) {
			blackToolTip.checked = (data.spteSettings.spteBlackToolTip === 'false') ? '' : 'checked';
		}

		if (data.spteSettings.spteBetterReadability) {
			betterReadability.checked = (data.spteSettings.spteBetterReadability === 'false') ? '' : 'checked';
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
