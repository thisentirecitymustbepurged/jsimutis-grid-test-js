import React, { useState } from 'react';

export const Cell = ({ cell }) => {
  const { value, config, offset, update: updateCell, uniqueConnected, setDOMRef } = cell;
  const { width, height } = config;
  const { x: left, y: top } = offset;
  const style = { width, height, left, top, background: value ? 'red' : '' };
  const [flag, update] = useState(false);
  cell.updateView = () => update(!flag);

  return (
    <div className="cell" style={style} onClick={updateCell} ref={setDOMRef}>
      {uniqueConnected ? uniqueConnected.size : 0}
    </div>
  );
};
