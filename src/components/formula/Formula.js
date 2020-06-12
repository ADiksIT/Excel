import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/dom';
export class Formula extends ExcelComponent {
	static className = 'excel__formula';
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribers: ['currentText'],
			...options,
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="false"></div>
		`;
	}
	storeChanged({ currentText }) {
		this.$formula.text(currentText);
	}
	init() {
		super.init();
		this.$formula = this.$root.queryElement('#formula');
		this.$onSubscribe('table:select', ($cell) => {
			this.$formula.text($cell.data.value);
		});
	}

	onInput(event) {
		this.$trigger('formula:input', $(event.target).text());
	}
	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$trigger('formula:done');
		}
	}
}