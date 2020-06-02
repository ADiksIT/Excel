// utils al9 jQuery
class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	css(styles = {}) {
		Object.keys(styles).forEach((key) => {
			this.$el.style[key] = styles[key];
		});
	}
	on(type, callback) {
		this.$el.addEventListener(type, callback);
	}

	off(type, callback) {
		this.$el.removeEventListener(type, callback);
	}
	queryAll(selector) {
		return this.$el.querySelectorAll(selector);
	}
	append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this;
	}

	get data() {
		return this.$el.dataset;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tag, className = '') => {
	const elem = document.createElement(tag);
	if (className) {
		elem.classList.add(className);
	}
	return $(elem);
};