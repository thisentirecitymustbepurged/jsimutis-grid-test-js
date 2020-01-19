import React from 'react';
import { Cell } from '../cell';
import './Body.scss';

export const Body = ({ Grid }) => {
  const { rows, cols, height, width } = Grid.state.grid;
  const matrix = cols || rows;

  return (
    <div className="grid-body">
      <div style={{ height, width }}>
        {matrix.map(cells => cells.map(c => <Cell Grid={Grid} cell={c} key={`${c.x}${c.y}`} />))}
      </div>
    </div>
  );
};
