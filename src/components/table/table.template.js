const CODES = {
	A: 65,
	Z: 90,
};
const toCell = (_, index) => {
	return `<div class="cell" 
			contenteditable data-id="${index}">
			</div>
		`;
};

const createCells = (countCols) => {
	return new Array(countCols)
		.fill('')
		.map(toCell)
		.join('');
};

const toColumn = (char, index) => {
	//	added class no-copy
	return `
		<div class="column unselectable" data-type="resized" data-id="${index}">
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

	for (let i = 0; i < countRows; i++) {
		rows.push(createRow(createCells(countCols), i + 1));
	}

	return rows.join('');
}