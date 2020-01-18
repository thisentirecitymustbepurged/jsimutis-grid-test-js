import React, { useState } from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const updateConnected = (cell, uniqueConnected = new Map()) => {
  delete cell.uniqueConnected;

  const { nextCells, value } = cell;

  if (value === true) {
    cell.uniqueConnected = uniqueConnected;

    uniqueConnected.set(cell, true);
  }

  nextCells.forEach(nextCell => {
    if (!nextCell || uniqueConnected.get(nextCell)) return;


    const { value: nextValue } = nextCell;

    if (nextValue === true) {
      value === true ? updateConnected(nextCell, uniqueConnected) : updateConnected(nextCell);
    }
  });
};

const generate = config => {
  // const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const cols = [];
  const rows = [];

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, value: false };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;
      cell.setDOMRef = DOMRef => { cell.DOMRef = DOMRef; };
      cell.update = () => {
        cell.value = !cell.value;

        updateConnected(cell);

        window.update();
      };

      if (cols[x]) cols[x][y] = cell;
      else cols[x] = [cell];

      if (rows[y]) rows[y][x] = cell;
      else rows[y] = [cell];

      cell.col = cols[x];
      cell.row = rows[y];

      setTimeout(() => {
        cell.nextCells = [
          cell.col[y - 1],
          cell.col[y + 1],
          cell.row[x - 1],
          cell.row[x + 1]
        ];
      });
    }
  }

  return { rows, cols };
};

const matrix = generate({ xLength: 6, yLength: 6, width: 50, height: 50 });

window.matrix = matrix;

export const Grid = () => {
  const [flag, update] = useState(false);

  window.update = () => update(!flag);

  console.log('render');

  return <div className="grid" key={flag}>{matrix.rows.map(arr => arr.map(cell => cell.view))}</div>;
};
