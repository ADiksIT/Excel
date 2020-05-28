const CODES = {
	A: 65,
	Z: 90,
};
const toCell = () => '<div class="cell" contenteditable ></div>';

const createCells = (countCols) => {
	const cells = new Array(countCols)
		.fill('')
		.map(toCell)
		.join('');
	return cells;
};

const toColumn = (char) => {
	return `
		<div class="column">
			${char}
			<div class="col-resize"></div>
		</div>
	`;
};

const createRow = (content, index = '') => {
	const resizer = index ? '<div class="row-resize"></div>' : '';
	return `
		<div class="row">
			<div class="row-info">
				${index}
				${resizer}
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

	for (let i = 0; i < countRows; i++) {
		rows.push(createRow(createCells(countCols), i + 1));
	}

	return rows.join('');
}