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
  const { hoveredConnections } = Grid.state;
  const { value, offset, connections, width, height } = cell;
  const { x: left, y: top } = offset;
  const style = { width, height, left, top };
  const className = `cell${hoveredConnections && hoveredConnections.get(cell) ? ' hover' : ''}${connections && connections.get(cell) ? ' active' : ''}`;
  const setHoveredConnections = (event, latestCell = cell) => {
    Grid.setState({ hoveredConnections: latestCell.connections });
  };
  const unsetHoveredConnections = () => {
    Grid.setState({ hoveredConnections: null });
  };
  const onClick = () => {
    cell.value = !value;
    updateConnections(cell);
    cell.value ? setHoveredConnections(null, cell) : unsetHoveredConnections();
    Grid.forceUpdate();
  };

  return (
    <div className={className} style={style} onClick={onClick} onMouseEnter={setHoveredConnections} onMouseLeave={unsetHoveredConnections}>
      {connections ? connections.size : 0}
    </div>
  );
};
