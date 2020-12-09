// Reference the XMLHttpRequest original methods.
const spteXHR = XMLHttpRequest.prototype;
const { open } = spteXHR;
const { send } = spteXHR;

// Override XMLHttpRequest open.
spteXHR.open = function (method, url) {
	this._method = method;
	this._url = url;
	return open.apply(this, arguments);
};
// Override XMLHttpRequest send, and share data to content script.
spteXHR.send = function (postData) {
	this.addEventListener('load', function () {
		if (this._method === 'POST' && this._url.substring(0, window.location.pathname.length) === window.location.pathname) {
			const status = postData.match('(?<=status=).*(?=&)') ? postData.match('(?<=status=).*(?=&)')[0] : '';
			// Communicate data to content script.
			const response = {
				data: postData,
				gpNotice: $gp.notices.element[0].innerText,
				trStatus: status,
			};
			document.dispatchEvent(new CustomEvent('spTranslationSaved', { detail: response }));
		}
	});
	return send.apply(this, arguments);
};
