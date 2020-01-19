import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export class Loader extends React.Component {
  state = { loading: true }

  componentDidMount() { this.load(); }

  load = async () => {
    await this.props.async();

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { children } = this.props;


    return loading ? <CircularProgress /> : children;
  }
}
