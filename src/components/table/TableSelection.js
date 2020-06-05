export class TableSelection {
	static className = 'selected';
	constructor() {
		this.group = [];
		this.current = null;
	}

	select($elem) {
		this.clear();
		this.group.push($elem);
		this.current = $elem;
		$elem.focus().addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach(($element) => {
			$element.removeClass(TableSelection.className);
		});
		this.group = [];
	}

	selectGroup($elements = []) {
		this.clear();
		this.group = $elements;
		this.group.forEach(($elem) => $elem.addClass(TableSelection.className));
	}
}