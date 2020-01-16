import React, { useState } from 'react';

export const Cell = ({ cell }) => {
  const { value, config: { width, height }, offset: { x: left, y: top }, update: updateCell } = cell;
  const style = { width, height, left, top };
  const [flag, update] = useState(false);
  cell.updateView = () => update(!flag);

  return <div className="cell" style={style} onClick={updateCell}>{`${value}`}</div>;
};
