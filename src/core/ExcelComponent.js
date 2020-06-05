import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.observer = options.observer;
		this.name = options.name || '';
		this.unsubscribe = [];
		this.prepare();
	}
	$trigger(event, ...args) {
		this.observer.trigger(event, ...args);
	}
	$onSubscribe(event, ...args) {
		const unsub = this.observer.subscribe(event, ...args);
		this.unsubscribe.push(unsub);
	}
	toHTML() {
		return '';
	}
	prepare() {}
	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.unsubscribe.forEach((unsub) => unsub());
		this.removeDOMListeners();
	}
}