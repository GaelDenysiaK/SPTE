chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	let onGoodUrl = false;
	chrome.storage.sync.get('spteSettings', (data) => {
		if (chrome.runtime.error) { return; }
		if ((/https:\/\/translate\.wordpress\.org\//).test(tab.url)) {
			onGoodUrl = true;
		} else {
			if (!data.spteSettings || !data.spteSettings.spteOtherUrls) { return; }
			const otherUrls = data.spteSettings.spteOtherUrls.replace(/;\s*$/, '');
			if (otherUrls.includes(';')) {
				otherUrls.split(';').forEach((otherUrl) => {
					if (onGoodUrl) { return; }
					onGoodUrl = (new RegExp(`/${otherUrl}/`, 'gi')).test(tab.url);
				});
			} else {
				onGoodUrl = (new RegExp(`/${otherUrls}/`, 'gi')).test(tab.url);
			}
		}

		if (!onGoodUrl) { return; }
		if (changeInfo.status) {
			chrome.pageAction.show(tabId);
			chrome.pageAction.setPopup({
				tabId,
				popup: '/pageAction/index.html',
			});
		}
	});
});
