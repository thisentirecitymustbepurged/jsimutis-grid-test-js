import React, { useState } from 'react';

export const Cell = ({ cell }) => {
  const { value, x, y, config: { width, height }, offset: { x: left, y: top }, update: updateCell, adjacentTrue, setDOMRef } = cell;
  const { col: adjacentCol, row: adjacentRow } = adjacentTrue;
  const adjacent = [...adjacentCol, ...adjacentRow];
  const adjacentCount = Math.max(adjacent.length - 1, 0);
  const style = { width, height, left, top, background: value ? 'red' : '' };
  const [flag, update] = useState(false);
  cell.updateView = () => update(!flag);

  return <div className="cell" style={style} onClick={updateCell} ref={setDOMRef}>{`${adjacentCount}`}</div>;
};
