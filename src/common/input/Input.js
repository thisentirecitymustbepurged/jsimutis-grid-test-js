import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
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

  timeout = undefined;

  render() {
    const { type, label, onChange } = this.props;
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

    return (
      <div className="input">
        <InputLabel>{label}{`${isValueLabelAllowed ? `: ${value}` : ''}`}</InputLabel>
        <Component {...props} />
      </div>
    );
  }
}
