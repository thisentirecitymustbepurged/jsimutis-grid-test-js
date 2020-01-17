import React from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const injectSameAdjacent = (array, key) => array.forEach((adjacentsByValue, cell, i) => {
  const cellPrev = array[i - 1];
  const valuePrev = cellPrev ? cellPrev.value : {};
  const { value } = cell;

  // if (!adjacentsByValue[value]) adjacentsByValue[value] = [];

  // const adjacents = adjacentsByValue[value];

  // if (valuePrev !== value) adjacents.push([]);

  // adjacents[adjacents.length - 1].push(cell);

  // return adjacentsByValue;
}, {});

const generate = config => {
  const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const cols = [];
  const rows = [];

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, value: !!round(random()) };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;
      cell.update = () => {
        cell.value = !cell.value;
        cell.updateView();
      };

      if (cols[x]) cols[x][y] = cell;
      else cols[x] = [cell];

      if (rows[y]) rows[y][x] = cell;
      else rows[y] = [cell];

      cell.col = cols[x];
      cell.row = rows[y];

      if (x === xLength) injectAdjacentSame(cell.col, 'col');
      if (y === yLength) injectAdjacentSame(cell.row, 'row');
  }


  return { rows, cols };
};

const matrix = generate({ xLength: 10, yLength: 5, width: 50, height: 50 });

window.matrix = matrix;
window.extractSameAdjacent = extractSameAdjacent;

export const Grid = () => <div className="grid">{matrix.rows.map(arr => arr.map(cell => cell.view))}</div>;
