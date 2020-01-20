import React from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
}, {
  type: 'Color',
  path: 'settings.connectionColor',
  label: 'Connection color'
}, {
  type: 'Color',
  path: 'settings.connectionHoverColor',
  label: 'Hover color'
}];

export class Controls extends React.Component {
  state = { expanded: false, height: 0 }

  expand = expanded => this.setState({ expanded })

  setHeight = ref => this.setState({ height: ref ? ref.offsetHeight : 0 })

  render() {
    const { height, expanded } = this.state;
    console.log('TCL: Controls -> render -> expanded', expanded);
    console.log('TCL: Controls -> render -> height', height);
    const { Grid } = this.props;
    const components = controls.map((el, key) => {
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
    });

    return (
      <>
        {expanded && <div className="controls__overlay" onClick={() => this.expand(false)} />}
        <div className={`controls${expanded ? ' expanded' : ''}`}>
          <div className="controls__title-bar" onClick={() => this.expand(!expanded)}>
            <div className="controls__expand">{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} Settings</div>
          </div>
          <div className="controls__content-wrapper">
            {expanded && (
              <div className="controls__content-height-provider" ref={this.setHeight}>
                {components}
              </div>
            )}
            <div className="controls__content" style={{ height }}>
              {components}
            </div>
          </div>
        </div>
      </>
    );
  }
}
