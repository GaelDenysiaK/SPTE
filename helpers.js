function addStyle(selector, rules) {
	styleSheet.insertRule(`${selector}{${rules}}`, styleSheet.cssRules.length);
}

function createElement(tagName = 'DIV', attributes = {}, textContent = '') {
	const element = document.createElement(tagName);
	for (const attribute in attributes) {
		if (attributes.hasOwnProperty(attribute)) {
			element.setAttribute(attribute, attributes[attribute]);
		}
	}
	element.textContent = textContent;
	return element;
}
