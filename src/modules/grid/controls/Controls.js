import React from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import { Input } from 'common';
import './Controls.scss';

const controls = [{
  type: 'Switch',
  path: 'generatorSettings.includeDiagonal',
  label: 'Allow diagonal connections',
}, {
  type: 'Slider',
  path: 'generatorSettings.x.length',
  label: 'Horizontal length'
}, {
  type: 'Slider',
  path: 'generatorSettings.y.length',
  label: 'Vertical length'
}, {
  type: 'Slider',
  path: 'generatorSettings.cell.width',
  label: 'Cell width'
}, {
  type: 'Slider',
  path: 'generatorSettings.cell.height',
  label: 'Cell height'
}];

export const Controls = ({ Grid }) => (
  <div className="controls">
    {controls.map((el, key) => {
      const { type, component } = el;
      const path = el.path.split('.');
      const Component = type ? Input : component;
      const targetName = path.shift();
      const target = Grid.state[targetName];
      const props = {
        ...el,
        value: get(target, path),
        onChange: (e, value) => {
          Grid.setState({
            [targetName]: set({ ...target }, path, value)
          });
        },
        key
      };

      return <Component {...props} />;
    })}
  </div>
);
