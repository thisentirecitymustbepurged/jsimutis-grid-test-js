import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { Slider, Switch } from './types';
import './Input.scss';

const types = {
  Slider: {
    input: Slider,
    isValueLabelAllowed: true
  },
  Switch: {
    input: Switch,
  },
};

export const Input = props => {
  const { type, label, value } = props;
  const { isValueLabelAllowed, input: Component } = types[type];

  return (
    <div className="input">
      <InputLabel>{label}{`${isValueLabelAllowed ? `: ${value}` : ''}`}</InputLabel>
      <Component {...props} />
    </div>
  );
};
