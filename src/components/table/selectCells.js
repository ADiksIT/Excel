export const selectedCells = (event, obj) => {
  const coordsStart = event.path[0].dataset.id;
  const matrix = [];
  const a = +(coordsStart.slice(0, 1));
  const b = +(coordsStart.slice(2));
  matrix.push([a, b]);
  console.log('a, b: ', matrix);
  document.onmouseup = (e) => {
    const coordsEnd = e.path[0].dataset.id;
    const c = +(coordsEnd.slice(0, 1));
    const d = +(coordsEnd.slice(2));
    matrix.push([c, d]);
    console.log('c, d: ', matrix);
    console.log(matrix);
    if (a > c) {
      console.log('a: ', a, 'c: ', c);
      matrix.reverse();
    }
    const $elements = [];
    for (let i = matrix[0][0]; i <= matrix[1][0]; i++) {
      for (let j = matrix[0][1]; j <= matrix[1][1]; j++) {
        const id = `${i}:${j}`;
        $elements.push(obj.$root.queryElement(`[data-id="${id}"]`));
      }
    }
    obj.selection.selectGroup($elements);
    document.onmouseup = null;
  };
};