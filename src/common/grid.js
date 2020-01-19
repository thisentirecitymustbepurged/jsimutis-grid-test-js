const generate = config => {
  const { x: { length: xLength }, y: { length: yLength }, cell: { width, height }, includeDiagonal } = config;
  const grid = {
    cols: [],
    rows: [],
    cellsByIndex: {},
    width: xLength * width,
    height: yLength * height
  };
  const { cols, rows, cellsByIndex } = grid;

  for (let y = 0; y < yLength; y += 1) {
    for (let x = 0; x < xLength; x += 1) {
      const offset = { x: x * width, y: y * height };
      const cell = { config, x, y, offset, width, height, value: false };

      if (cols[x]) cols[x][y] = cell;
      else cols[x] = [cell];

      if (rows[y]) rows[y][x] = cell;
      else rows[y] = [cell];

      cellsByIndex[`${x}${y}`] = cell;

      cell.col = cols[x];
      cell.row = rows[y];

      setTimeout(() => {
        cell.nextCells = [
          cell.col[y - 1],
          cell.col[y + 1],
          cell.row[x - 1],
          cell.row[x + 1],
          ...(includeDiagonal ? [
            cellsByIndex[`${x - 1}${y - 1}`],
            cellsByIndex[`${x + 1}${y - 1}`],
            cellsByIndex[`${x + 1}${y + 1}`],
            cellsByIndex[`${x - 1}${y + 1}`]
          ] : [])
        ];
      });
    }
  }

  return grid;
};

export const grid = { generate };
