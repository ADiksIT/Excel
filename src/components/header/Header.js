import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {defaultTitle} from '@/constans';
import {debaunce} from '@core/utils';
export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options,
			listeners: ['input'],
		});
	}
	prepare() {
		this.onInput = debaunce(this.onInput, 500);
	}

	toHTML() {
		const title = this.store.getState().appTitle || defaultTitle;
		return `
			<div class="excel__logo">
				<h1>ExcelJS</h1>
			</div>
			<div class="excel__wrap">
				<input type="text" class="input" value="${title}"/>
				<div>
					<div class="button">
						<i class="material-icons">delete</i>
					</div>
					<div class="button">
						<i class="material-icons">exit_to_app</i>
					</div>
				</div>
			</div>
		`;
	}

	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}
}