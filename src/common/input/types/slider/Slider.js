import React from 'react';
import MUISlider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import './Slider.scss';

const marks = [
  0,
  100
];

const ValueLabelComponent = multiplier => (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value * multiplier}>
      {children}
    </Tooltip>
  );
};

export const Slider = props => {
  const { multiplier = 1, onChange, value } = props;

  return (
    <MUISlider
      {...props}
      onChange={(e, value) => onChange(e, value * multiplier)}
      value={value / multiplier}
      // ValueLabelComponent={ValueLabelComponent(multiplier)}
      className="slider"
      marks={marks.map(value => ({ value, label: value * multiplier }))}
    />
  );
};
