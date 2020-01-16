import React from 'react';
import { Cell } from './Cell';
import './Grid.scss';

const generate = config => {
  const { random, round } = Math;
  const { xLength, yLength, width, height } = config;
  const matrixes = {
    xy: [],
    yx: []
  };

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const cell = { config, x, y, offset: { x: x * width, y: y * height }, value: round(random()) };
      cell.view = <Cell cell={cell} key={`${x}${y}`} />;

      if (matrixes.yx[y]) matrixes.yx[y][x] = cell;
      else matrixes.yx[y] = [cell];

      if (matrixes.xy[x]) matrixes.xy[x][y] = cell;
      else matrixes.xy[x] = [cell];

      cell.adjacent = { x: matrixes.xy[x], y: matrixes.yx[y] };
    }
  }

  return matrixes;
};

const matrixes = generate({ xLength: 5, yLength: 5, width: 50, height: 50 });

window.matrixes = matrixes;

export const Grid = () => <div className="grid">{matrixes.yx.map(arr => arr.map(cell => cell.view))}</div>;
