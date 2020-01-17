import React from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const crawlConnected = cell => {
  const { col, row } = cell;
  const connectedAdjacent = [...col, ...row].filter(adjacent => adjacent !== cell);
  const connectedUnique = new Map();

  const crawlConnected = cell => {
    const { col, row } = cell;
    const connectedAdjacent = [...col, ...row].filter(adjacent => adjacent !== cell);
  };


  connectedAdjacent.forEach(cell => iterateConnected(cell));
};

const generate = config => {
  const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const cols = [];
  const rows = [];

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, value: false, connected: new Map() };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;
      cell.setDOMRef = DOMRef => { cell.DOMRef = DOMRef; };
      cell.update = () => {
        cell.value = !cell.value;

        crawlConnected(cell);
      };

      if (cols[x]) cols[x][y] = cell;
      else cols[x] = [cell];

      if (rows[y]) rows[y][x] = cell;
      else rows[y] = [cell];

      cell.col = cols[x];
      cell.row = rows[y];

      // if (x === xLength - 1) updateConnectedAdjacently(cell.row);
      // if (y === yLength - 1) updateConnectedAdjacently(cell.col);
    }
  }

  return { rows, cols };
};

const matrix = generate({ xLength: 6, yLength: 6, width: 50, height: 50 });

window.matrix = matrix;

export const Grid = () => <div className="grid">{matrix.rows.map(arr => arr.map(cell => cell.view))}</div>;
