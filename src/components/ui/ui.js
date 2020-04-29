import React, { Component } from 'react';

import Table from '../table';

class UI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentWillMount() {
    this.props.timer.onTick((time) => this.setState({ time }));
  }

  renderTickets() {
    const { tickets } = this.props.me;
    const jsx = [];
    let counter = 0;
    for (var i = 0; i < tickets; i++) {
      counter = i;
      jsx.push(
        <img
          key={i}
          src="/images/ticket.png"
          alt="ticket"
          className="ticket-img"
        />
      );
    }
    jsx.push(
      <div
          key={`tick-${counter}`} className="tickets-counter">
        <img
          src="/images/ticket.png"
          alt="ticket"
          className="tickets-counter-img"
        />
        <span>x {counter}</span>
      </div>
    );
    return jsx;
  }

  renderEnd() {
    return this.props.end === 1 ?
      'The robber has been caught.' :
      'The robber has won!';
  }

  render() {
    const timerClassName = this.props.moved ? 'timer moved' : 'timer';
    return (
      <div className="ui">
        <header className="ui-header">
          <Table table={this.props.table} />
          <div className="tickets">
            { this.renderTickets() }
          </div>
        </header>
        <div className="text">
          { this.props.end ? (
            <div className="end">
              { this.renderEnd() } A new game is going to start soon..
            </div>
          ) : (
            <div className={timerClassName}>
              { this.state.time }
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default UI;
