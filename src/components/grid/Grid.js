import React from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const extractSameAdjacent = array => array.reduce((adjacentsByValue, cell, i) => {
  const cellPrev = array[i - 1];
  const valuePrev = cellPrev ? cellPrev.value : {};
  const { value } = cell;

  if (!adjacentsByValue[value]) adjacentsByValue[value] = [];

  const adjacents = adjacentsByValue[value];

  if (valuePrev !== value) adjacents.push([]);

  adjacents[adjacents.length - 1].push(cell);

  return adjacentsByValue;
}, {});

const generate = config => {
  const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const matrixes = {
    xy: [],
    yx: []
  };

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, value: !!round(random()) };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;
      cell.update = () => {
        cell.value = !cell.value;
        cell.updateView();
      };

      if (matrixes.yx[y]) matrixes.yx[y][x] = cell;
      else matrixes.yx[y] = [cell];

      if (matrixes.xy[x]) matrixes.xy[x][y] = cell;
      else matrixes.xy[x] = [cell];

      cell.adjacent = { x: matrixes.xy[x], y: matrixes.yx[y] };
    }
  }

  return matrixes;
};

const matrixes = generate({ xLength: 10, yLength: 5, width: 50, height: 50 });

window.matrixes = matrixes;
window.extractSameAdjacent = extractSameAdjacent;

export const Grid = () => <div className="grid">{matrixes.yx.map(arr => arr.map(cell => cell.view))}</div>;
