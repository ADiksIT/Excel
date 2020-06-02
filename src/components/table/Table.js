import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { initResize } from '@/components/table/risezer';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			listeners: ['mousedown', 'mouseup', 'mousemove'],
		});
	}
	toHTML() {
		return createTable(10);
	}
	onMousedown(event) {
		if (event.target.dataset.resize) {
			initResize(event, this.$root);
		}
	}

	onMousemove(event) {

	}

	onMouseup(event) {

	}
}