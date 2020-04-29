import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  getTimeByTimezone = (offset) => {
    return new Date(
      new Date().getTime() + (-offset * 60) * 1000
    ).toUTCString().replace( / GMT$/, "" );
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: this.getTimeByTimezone(this.props.offset)
    });
  }
  render() {
    return (
      <p className="App-clock">
        {this.state.time}
      </p>
    );
  }
}

export default Clock;