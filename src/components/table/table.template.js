const CODES = {
	A: 65,
	Z: 90,
};

const toCell = (row) => {
	return (_, col) => {
		return `
			<div class="cell"
									contenteditable 
									data-col="${col}"
									data-type="cell"
									data-id="${row}:${col}">
			</div>`;
	};
};

const createCells = (countCols, row) => {
	return new Array(countCols)
		.fill('')
		.map(toCell(row))
		.join('');
};

const toColumn = (char, index) => {
	//	added class no-copy
	return `
		<div class="column unselectable" data-type="resized" data-col="${index}">
			${char}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
};

const createRow = (content, index = '') => {
	const resized = index
		? '<div class="row-resize" data-resize="row" ></div>'
		: '';
		//	added class no-copy
	return `
		<div class="row" data-type="resized">
			<div class="row-info unselectable"  >
				${index}
				${resized}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
};

const toChar = (_, index) => {
	return String.fromCharCode(CODES.A + index);
};

export function createTable(countRows = 20) {
	const countCols = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(countCols)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow(cols));

	for (let row = 0; row < countRows; row++) {
		rows.push(createRow(createCells(countCols, row), row + 1));
	}

	return rows.join('');
}