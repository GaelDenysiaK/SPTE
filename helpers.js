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

// If sourceElement invisible, add classElement to targetElement.
function ifSourceHiddenTagTarget(sourceElement, targetElement, classElement) {
	const target = document.querySelector(targetElement);
	if (!target) { return; }
	const observer = new IntersectionObserver(((entries) => {
		if (entries[0].isIntersecting === true) {
			target.classList.remove(classElement);
		} else {
			target.classList.add(classElement);
		}
	}), { threshold: [1], rootMargin: '80px' });
	observer.observe(document.querySelector(sourceElement));
}
