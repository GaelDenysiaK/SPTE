chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.action.disable();

	if (!(/https:\/\/translate\.wordpress\.org\//).test(tab.url)) { return; }
	chrome.action.enable();

	if (changeInfo.status) {
		chrome.action.setPopup({
			tabId,
			popup: '/pageAction/index.html',
		});
	}
});
