import React from 'react';
import MUISlider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import './Slider.scss';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '100',
  },
];

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export const Slider = props => (
  <MUISlider {...props} ValueLabelComponent={ValueLabelComponent} className="slider" marks={marks} />
);
