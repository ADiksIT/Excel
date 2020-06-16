import { $ } from '@core/dom';
import { Observer } from '@core/Observer';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@/store/actions';
export class Excel {
	constructor(options) {
		this.components = options.components || [];
		this.observer = new Observer();
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	getRoot() {
		const $root = $.create('div', 'excel');
		const componentOptions = {
			observer: this.observer,
			store: this.store,
		};
		this.components = this.components.map((Component) => {
			const $elem = $.create('div', Component.className);
			const component = new Component($elem, componentOptions);
			// DEBUG
			// if (component.name) {
			// 	window['c' + component.name] = component;
			// }
			$elem.html(component.toHTML());
			$root.append($elem);
			return component;
		});
		return $root;
	}

	init() {
		if (process.env.NODE_ENV === 'production') {
			document.addEventListener('contextmenu', (e) => {
				e.preventDefault();
			});
		}
		this.store.dispatch(updateDate());
		this.subscriber.subscribeComponents(this.components);
		this.components.forEach((component) => component.init());
	}

	destroy() {
		this.subscriber.unsubscribeComponents();
		this.components.forEach((component) => component.destroy());
		document.removeEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
	}
}
