import React from 'react';
import { Cell } from '../cell';
import './Body.scss';

export class Body extends React.Component {
  state = {
    visible: null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resolveVisible);
    this.resolveVisible();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resolveVisible);
  }

  resolveVisible = () => {
    const { ceil, floor, max } = Math;
    const { cell: { height: cellHeight, width: cellWidth } } = this.props.Grid.state.grid.config;
    const { offsetTop, offsetLeft } = this.bodyRef || {};
    const { scrollLeft, scrollTop } = document.documentElement;
    const { innerHeight: viewHeight, innerWidth: viewWidth } = window;
    const x1 = max(floor((scrollLeft - offsetLeft) / cellWidth) - 1, 0);
    const x2 = x1 + ceil(viewWidth / cellWidth) + 1;
    const y1 = max(floor((scrollTop - offsetTop) / cellHeight) - 1, 0);
    const y2 = y1 + ceil(viewHeight / cellWidth) + 1;

    clearTimeout(this.timeout);
    this && setTimeout(this.setState.bind(this, { visible: { x1, x2, y1, y2 } }), 10);
  }


  setRef = bodyRef => this.bodyRef = bodyRef

  render() {
    const { Grid } = this.props;
    const { cols, height, width } = Grid.state.grid;
    const { visible } = this.state;
    const { x1, x2, y1, y2 } = visible || {};
    const matrix = visible ? cols.slice(x1, x2).map(cells => cells.slice(y1, y2)) : [];

    return (
      <div className="grid-body" style={{ height, width }} ref={this.setRef}>
        {visible && matrix.map(cells => cells.map(c => <Cell Grid={Grid} cell={c} key={`${c.x}${c.y}`} />))}
      </div>
    );
  }
}
