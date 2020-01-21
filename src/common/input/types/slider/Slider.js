import React from 'react';
import MUISlider from '@material-ui/core/Slider';
import './Slider.scss';

const marks = [
  0,
  100
];

export const Slider = props => {
  const { multiplier = 1, onChange, value } = props;

  return (
    <MUISlider
      {...props}
      onChange={(e, value) => onChange(e, value * multiplier)}
      value={value / multiplier}
      className="slider"
      marks={marks.map(value => ({ value, label: value * multiplier }))}
    />
  );
};
