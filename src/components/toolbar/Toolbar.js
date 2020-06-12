import { $ } from '@core/dom';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { defaultStyles } from '@/constans';
import { ExcelStateComponent } from '@core/ExcelStateComponent';

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar';
	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribers: ['currentStyles'],
			...options,
		});
	}
	prepare() {
		this.initState(defaultStyles);
	}
	storeChanged(changes) {
		this.setState(changes.currentStyles);
	}

	get template() {
		return createToolbar(this.state);
	}
	toHTML() {
		return this.template;
	}
	onClick(event) {
		const $target = $(event.target);
		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value);
			this.$trigger('toolbar:changeStyle', value);
		}
	}
}