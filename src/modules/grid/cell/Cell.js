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
  const { hoveredConnections, lastClickedCell } = Grid.state;
  const { value, offset, connections, width, height, setRef } = cell;
  const { x: left, y: top } = offset;
  const style = { width, height, left, top };
  const hoveredConnectionsClass = hoveredConnections && hoveredConnections.get(cell) ? ' hover' : '';
  const connectionsClass = connections && connections.get(cell) ? ' active' : '';
  const className = `cell${connectionsClass}${hoveredConnectionsClass}`;
  const setHoveredConnections = () => {
    Grid.setState({ hoveredConnections: connections });
  };
  const unsetHoveredConnections = () => {
    Grid.setState({ hoveredConnections: null });
  };
  const onClick = () => {
    cell.value = !value;
    updateConnections(cell);
    Grid.setState({
      lastClickedCell: cell,
      hoveredConnections: cell.value ? cell.connections : null
    });
  };

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={setHoveredConnections}
      onMouseLeave={unsetHoveredConnections}
      ref={setRef}
    >
      {lastClickedCell === cell && connections && connections.size}
    </div>
  );
};
