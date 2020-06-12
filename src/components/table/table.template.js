import { defaultStyles } from '@/constans';
import { toInlineStyles } from '@core/utils';
import { parse } from '@core/parse';

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const CODES = {
	A: 65,
	Z: 90,
};

const toCell = (row, state) => {
	return (_, col) => {
		const id = `${row}:${col}`;
		const data = state.dataState[id];
		const styles = toInlineStyles({
			...defaultStyles,
			...state.stylesState[id],
		});
		return `
			<div class="cell"
				contenteditable 
				data-col="${col}"
				data-type="cell"
				data-id="${id}"
				data-value="${data || ''}"
				style="${styles}; width: ${getWidth(state.colState, col)}"
			>
			${parse(data) || ''} 
			</div>`;
	};
};

const createCells = (countCols, row, state) => {
	return new Array(countCols)
		.fill('')
		.map(toCell(row, state))
		.join('');
};

const toColumn = ({char, index, width}) => {
	return `
		<div class="column unselectable" 
					data-type="resized" 
					data-col="${index}"
					style="width: ${width}"
		>
			${char}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
};

const createRow = (content, index = '', state) => {
	const resized = index
		? '<div class="row-resize" data-resize="row" ></div>'
		: '';
	return `
		<div 
				style="height: ${getHeight(state, index)}"
				class="row" 
				data-type="resized" 
				data-row="${index}"
			>
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

const getWidth = (state, index) => {
	return (state[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state, index) => {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
};

const widthFromState = (state) => {
	return function(char, index) {
		return {
			char, index, width: getWidth(state, index),
		};
	};
};

export function createTable(countRows = 20, state = {}) {
	const countCols = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(countCols)
		.fill('')
		.map(toChar)
		.map(widthFromState(state.colState))
		.map(toColumn)
		.join('');

	rows.push(createRow(cols, '', {}));

	for (let row = 0; row < countRows; row++) {
		rows.push(createRow(createCells(countCols, row, state)
												, row + 1, state.rowState));
	}

	return rows.join('');
}