import { capitalize } from '@core/utils';

export class DOMListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`no $root : ${$root}`);
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListeners() {
		this.listeners.forEach((listener) => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(`Method: "${method}" is not implement in component`);
			}
			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
		});
	}

	removeDOMListeners() {
		this.listeners.forEach((listener) => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}

// pure function for DOMListener
const getMethodName = (eventName) => {
	return 'on' + capitalize(eventName);
};