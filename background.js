chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (!(/https:\/\/translate\.wordpress\.org\//).test(tab.url)) { return; }
	if (changeInfo.status) {
		chrome.pageAction.show(tabId);
		chrome.pageAction.setPopup({
			tabId,
			popup: '/pageAction/index.html',
		});
	}
});
