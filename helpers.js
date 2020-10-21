// Add styles.
function addStyle(selector, rules) {
	styleSheet.insertRule(`${selector}{${rules}}`, styleSheet.cssRules.length);
}
