import { $ } from '@core/dom';
import { TableSelection } from './TableSelection';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { initResize } from '@/components/table/risezer';
import { matrix, nextCell } from '@/components/table/selectCells';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  prepare() {
    super.prepare();
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(10);
  }

  init() {
    super.init();
    this.selectCell(this.$root.queryElement(`[data-id="0:0"]`));

    this.$onSubscribe('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$onSubscribe('formula:done', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      initResize(event, this.$root);
    }	else if (event.target.dataset.type === 'cell') {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.queryElement(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
  onKeydown(event) {
    const keys = ['Tab', 'Enter', 'ArrowLeft',
      'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.queryElement(nextCell(event.key, id));
      this.selectCell($next);
    }
  }
  onInput(event) {
    this.$trigger('table:input', $(event.target));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$trigger('table:select', $cell);
  }
}
