export const capitalize = (string) => {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start, end) => {
	if (start > end) {
		[end, start] = [start, end];
	}
	return new Array(end - start + 1)
			.fill('')
			.map((_, index) => start + index);
};

export const storage = (key, data = null) => {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}
	localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = (prevStateKey, stateKey) => {
	if (typeof prevStateKey === 'object' && stateKey === 'object') {
		return JSON.stringify(prevStateKey) === JSON.stringify(stateKey);
	}
	return prevStateKey === stateKey;
};

export const toCSSName = (str) => {
	return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (styles = {}) => {
		return Object.keys(styles)
			.map((key) => `${toCSSName(key)}: ${styles[key]}`)
			.join(';');
};

export const debaunce = (fn, wait) => {
	let timeout;
	return function(...args) {
		const later = () => {
			clearTimeout(timeout);
			// eslint-disable-next-line no-invalid-this
			fn.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};