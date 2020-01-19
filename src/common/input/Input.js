import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { Slider, Switch } from './types';
import './Input.scss';

const types = {
  Slider,
  Switch
};

export const Input = props => {
  const { type, label } = props;
  const Component = types[type];

  return (
    <div className="input">
      <InputLabel>{label}</InputLabel>
      <Component {...props} />
    </div>
  );
};
