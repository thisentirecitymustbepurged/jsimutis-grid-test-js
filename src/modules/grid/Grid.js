import React, { Component } from 'react';
import memoize from 'memoize-one';
import { grid } from 'common';
import { Cell } from './cell';
import { Controls } from './controls';
import './Grid.scss';

const generate = memoize(grid.generate);
const defaultGeneratorSettings = { x: { length: 5 }, y: { length: 5 }, cell: { width: 50, height: 50 } };

export class Grid extends Component {
  state = {
    generatorSettings: defaultGeneratorSettings,
  }

  render() {
    const { generatorSettings } = this.state;
    const { rows, cols, height, width } = generate(generatorSettings);
    const matrix = cols || rows;

    return (
      <div className="grid">
        <Controls Grid={this} />
        <div className="grid__body" style={{ height, width }}>
          {matrix.map(cells => cells.map(c => <Cell Grid={this} cell={c} key={`${c.x}${c.y}`} />))}
        </div>
      </div>
    );
  }
}
