import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {defaultTitle} from '@/constans';
import {debaunce} from '@core/utils';
import {ActiveRouts} from '@core/routs/ActiveRouts';
export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options,
			listeners: ['input', 'click'],
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
					<div class="button" data-type="delete">
						<i class="material-icons" data-type="delete">delete</i>
					</div>
					<div class="button" data-type="exit">
						<i class="material-icons" data-type="exit">exit_to_app</i>
					</div>
				</div>
			</div>
		`;
	}
	onClick(event) {
		const $target = $(event.target);
		if ($target.data.type === 'delete') {
			const decision = confirm('Delete this Table?');
			if (decision) {
				localStorage.removeItem('excel:' + ActiveRouts.param);
				ActiveRouts.navigate('');
			}
		} else if ($target.data.type === 'exit') {
			ActiveRouts.navigate('');
		}
	}
	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}
}