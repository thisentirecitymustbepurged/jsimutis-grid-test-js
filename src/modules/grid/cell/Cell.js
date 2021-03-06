import React from 'react';
import './Cell.scss';

export const updateConnections = (cell, connections = new Map()) => {
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
  const { hoveredConnections, lastClickedCell, settings: { connectionColor, connectionHoverColor, isEditable, isCellIndexShown } } = Grid.state;
  const { value, offset, connections, width, height, setRef } = cell;
  const { x: left, y: top } = offset;
  const activeClass = connections && connections.get(cell) ? ' active' : '';
  const hoverClass = hoveredConnections && hoveredConnections.get(cell) ? ' hover' : '';
  const className = `cell${activeClass}${hoverClass}`;
  const style = {
    width,
    height,
    left,
    top,
    background: activeClass ? hoverClass ? connectionHoverColor : connectionColor : '',
    borderColor: hoverClass && connectionHoverColor,
    fontSize: (width + height) / 3
  };
  const setHoveredConnections = () => {
    Grid.setState({ hoveredConnections: connections });
  };
  const unsetHoveredConnections = () => {
    Grid.setState({ hoveredConnections: null });
  };
  const onClick = () => {
    if (isEditable) {
      cell.value = !value;
      updateConnections(cell);
    }
    Grid.setState({
      ...(isEditable ? { lastClickedCell: cell } : cell.value && { lastClickedCell: cell }),
      ...(isEditable && { hoveredConnections: cell.value ? cell.connections : null })
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
      {lastClickedCell === cell && connections && <div>{connections.size}</div>}
      {isCellIndexShown && <div style={{ fontSize: 12 }}>x{cell.x}y{cell.y}</div>}
    </div>
  );
};
