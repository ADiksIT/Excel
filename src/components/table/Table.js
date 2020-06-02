import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { initResize } from '@/components/table/risezer';
import { TableSelection } from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
	}
	toHTML() {
		return createTable(10);
	}

	init() {
		super.init();
		this.selection = new TableSelection();
		const $cell = this.$root.queryElement(`[data-id="${0}:${0}"]`);
		this.selection.select($cell);
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			initResize(event, this.$root);
		}	else if (event.target.dataset.type === 'cell') {
			if (event.shiftKey) {
				const coordStart = event.path[0].dataset.id;
				console.log(coordStart);
				// document.onmousemove = (e) => {
				// };
				document.onmouseup = (e) => {
					const coordEnd = e.path[0].dataset.id;
					console.log(typeof coordEnd);
					const a = +(coordEnd.slice(0, 1));
					console.log(+(coordEnd.slice(0, 1)));
					console.log(typeof a);
				};
			}
			this.selection.select($(event.target));
		}
	}
}