import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { Slider, Switch, Color } from './types';
import './Input.scss';

const types = {
  Slider: {
    input: Slider,
    isValueLabelAllowed: true
  },
  Switch: {
    input: Switch,
    throttle: false
  },
  Color: {
    input: Color,
    throttle: false
  },
};

export class Input extends React.Component {
  state = {
    value: this.props.value
  }

  render() {
    const { type, label, onChange, tooltip, suffix } = this.props;
    const { isValueLabelAllowed, input: Component, throttle = true } = types[type];
    const props = throttle ? {
      ...this.props,
      onChange: (e, value) => {
        this.setState({ value });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => onChange(e, value), 200);
      },
      value: this.state.value
    } : this.props;
    const { value } = props;
    const content = (
      <div className="input" onClick={e => { e.stopPropagation(); }}>
        <InputLabel>{label}{`${isValueLabelAllowed ? `: ${value}` : ''}`}{suffix}</InputLabel>
        <Component {...props} />
      </div>
    );

    return tooltip ? <Tooltip title={<div className="input__tooltip">{tooltip}</div>} placement="top">{content}</Tooltip> : content;
  }
}
