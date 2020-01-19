import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Color.scss';

export class Color extends React.Component {
  setRef = ref => { this.ref = ref; }

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="color">
        <TextField value={value} color="primary" onClick={() => this.ref.click()} />
        <input type="color" value={value} onChange={e => onChange(e, e.target.value)} ref={this.setRef} />
      </div>
    );
  }
}
