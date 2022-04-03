chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (!(/https:\/\/translate\.wordpress\.org\//).test(tab.url)) { return; }
	if (changeInfo.status) {
		chrome.action.show(tabId);
		chrome.action.setPopup({
			tabId,
			popup: '/pageAction/index.html',
		});
	}
});
