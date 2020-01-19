import React from 'react';
import './Cell.scss';

const updateConnections = (cell, connections = new Map()) => {
  delete cell.connections;
  const { nextCells, value } = cell;

  if (value === true) {
    cell.connections = connections;
    connections.set(cell, true);
  }

  nextCells.forEach(nextCell => {
    if (!nextCell || connections.get(nextCell)) return;

    const { value: nextValue } = nextCell;

    if (nextValue === true) {
      value === true ? updateConnections(nextCell, connections) : updateConnections(nextCell);
    }
  });
};

export const Cell = ({ cell, Grid }) => {
  const { value, offset, connections, width, height } = cell;
  const { x: left, y: top } = offset;
  const style = { width, height, left, top, background: value ? 'red' : '' };
  const onClick = () => {
    cell.value = !value;
    updateConnections(cell);
    Grid.forceUpdate();
  };

  return (
    <div className="cell" style={style} onClick={onClick}>
      {connections ? connections.size : 0}
    </div>
  );
};
