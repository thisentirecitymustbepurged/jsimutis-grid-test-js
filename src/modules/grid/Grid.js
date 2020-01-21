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
        const probability = cell.config.probability / 100;
        cell.value = !!round(probability ? (random() / 2 + 0.5 * probability) : 0);

        updateConnections(cell);
      }
    },
    probability: 50,
  };

  defaultSettings = {
    connectionColor: '#A3CFF2',
    connectionHoverColor: '#2196F3',
    isEditable: false,
    isCellIndexShown: false
  }

  state = {
    generatorSettings: cloneDeep(this.defaultGeneratorSettings),
    settings: cloneDeep(this.defaultSettings),
    hoveredConnections: null,
    lastClickedCell: null,
    grid: null,
    loading: false
  }

  generate = async () => {
    this.setState({ loading: true });

    const grid = await generate(this.state.generatorSettings);

    this.setState({ grid, loading: false });
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
