import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { initResize } from '@/components/table/risezer';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import { selectedCells } from '@/components/table/selectCells';

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
      const $target = $(event.target);
      if (event.shiftKey) {
        // const target = $target.id(true);
        // const current = this.selection.current.id(true);
        // const cols = range(current.col, target.col);
        selectedCells(event, this);
      }
      this.selection.select($target);
    }
  }
}
//
// const range = (start, end) => {
//   return new Array(end - start + 1)
//       .fill('')
//       .map((_, index) => start + index);
// };