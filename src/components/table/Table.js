import { $ } from '@core/dom';
import * as actions from '@/store/actions';
import {defaultStyles} from '@/constans';
import { TableSelection } from './TableSelection';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { initResize } from '@/components/table/risezer';
import { matrix, nextCell } from '@/components/table/selectCells';
import { parse } from '@core/parse';

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
    return createTable(10, this.store.getState());
  }

  init() {
    super.init();
    this.selectCell(this.$root.queryElement(`[data-id="0:0"]`));

    this.$onSubscribe('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$onSubscribe('formula:done', () => {
      this.selection.current.focus();
    });

    this.$onSubscribe('toolbar:changeStyle', (value) => {
      this.selection.changeStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  async resizeTable(event) {
    try {
      const data = await initResize(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error('Resize Error', e);
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeTable(event);
    }	else if (event.target.dataset.type === 'cell') {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.queryElement(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
    this.updateTextInStore($(event.target).text());
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$trigger('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeCurrentStyles(styles));
  }
}
