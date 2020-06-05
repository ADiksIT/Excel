import {range} from '@core/utils';

export const matrix = ($target, $current) => {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};

export const nextCell = (key, {row, col}) => {
  const MIN = 0;
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN ? MIN : row - 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN ? MIN : col - 1;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
  }
  return `[data-id="${row}:${col}"]`;
};