import React from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input } from 'common';
import controls from './controls.json';
import './Controls.scss';

export class Controls extends React.Component {
  state = { expanded: false, height: 0 }

  expand = expanded => this.setState({ expanded })

  setHeight = ref => this.setState({ height: ref ? ref.offsetHeight : 0 })

  render() {
    const { height, expanded } = this.state;
    const { Grid } = this.props;
    const { state: { loading } } = Grid;
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
            <div className="controls__expand">
              <ExpandMoreIcon />
              <span>Settings</span>
              {loading && <CircularProgress size={20} />}
            </div>
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
