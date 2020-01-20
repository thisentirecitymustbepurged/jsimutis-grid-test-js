import React, { Component } from 'react';
import memoize from 'memoize-one';
import cloneDeep from 'lodash/cloneDeep';
import { grid, Loader } from 'common';
import { updateConnections } from './cell';
import { Body } from './body';
import { Controls } from './controls';
import './Grid.scss';

const { round, random } = Math;
const generate = memoize(grid.generate);

export class Grid extends Component {
  defaultGeneratorSettings = {
    includeDiagonal: false,
    x: { length: 5 },
    y: { length: 5 },
    cell: {
      width: 100,
      height: 100,
      callback(cell) {
        cell.value = !!round(random());

        updateConnections(cell);
      }
    },
  };

  defaultSettings = {
    connectionColor: '#A3CFF2',
    connectionHoverColor: '#2196F3',
    isEditable: false
  }

  state = {
    generatorSettings: cloneDeep(this.defaultGeneratorSettings),
    settings: cloneDeep(this.defaultSettings),
    hoveredConnections: null,
    lastClickedCell: null,
    grid: null,
  }

  generate = async () => {
    const grid = await generate(this.state.generatorSettings);

    this.setState({ grid });
  }

  render() {
    const { generatorSettings } = this.state;

    return (
      <div className="grid">
        <Controls Grid={this} />
        <Loader async={this.generate} key={JSON.stringify(generatorSettings)}>
          <Body Grid={this} />
        </Loader>
      </div>
    );
  }
}
