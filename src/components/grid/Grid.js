import React from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const updateAdjacentTrue = array => array.forEach((cell, i) => {
  const { value } = cell;
  const cellPrev = array[i - 1];
  const valuePrev = cellPrev ? cellPrev.value : {};

  if (value === true) {
    cell.adjacentTrue[array.type] = [cell];
  }

  if (value === true && valuePrev === true) {
    cell.adjacentTrue[array.type] = cellPrev.adjacentTrue[array.type];
    cellPrev.adjacentTrue[array.type].push(cell);
  }
});

const updateArray = cell => {
  updateAdjacentTrue(cell.row);
  updateAdjacentTrue(cell.col);

  cell.row.forEach(cell => cell.updateView());
  cell.col.forEach(cell => cell.updateView());
};

const generate = config => {
  const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const cols = [];
  const rows = [];

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, value: false, adjacentTrue: { col: [], row: [] } };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;
      cell.setDOMRef = DOMRef => { cell.DOMRef = DOMRef; };
      cell.update = () => {
        cell.value = !cell.value;

        updateArray(cell);
      };

      if (cols[x]) cols[x][y] = cell;
      else cols[x] = [cell];

      if (rows[y]) rows[y][x] = cell;
      else rows[y] = [cell];

      cell.col = cols[x];
      cell.row = rows[y];
      cols[x].type = 'col';
      rows[y].type = 'row';

      // if (x === xLength - 1) updateAdjacentTrue(cell.row);
      // if (y === yLength - 1) updateAdjacentTrue(cell.col);
    }
  }

  return { rows, cols };
};

const matrix = generate({ xLength: 5, yLength: 5, width: 50, height: 50 });

window.matrix = matrix;
window.updateAdjacentTrue = updateAdjacentTrue;

export const Grid = () => <div className="grid">{matrix.rows.map(arr => arr.map(cell => cell.view))}</div>;
