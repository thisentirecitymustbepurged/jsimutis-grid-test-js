import React from 'react';
import MUISwitch from '@material-ui/core/Switch';
import './Switch.scss';

export const Switch = ({ value, onChange, color }) => (
  <MUISwitch {...{ onChange, checked: value, color, value: '' }} className="switch" />
);
