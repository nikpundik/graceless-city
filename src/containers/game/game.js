import React, { Component } from 'react';
import ioClient from 'socket.io-client';

import BoardMap from '../board-map';
import UI from '../../components/ui';
import Timer from '../../utils/timer';
import GameUtils from '../../utils/game';
import MapUtils from '../../utils/map';
import config from '../../config'

const connection = process.env.NODE_ENV === 'development' ?
  'http://localhost:3001' : undefined;

class Game extends Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.socket = null;
    this.state = {
      socket: null,
      players: null,
      timer: config.time,
      end: null,
    };
    this.move = this.move.bind(this);
  }

  componentWillMount() {
    // this.geolocate();
    this.listenToMessages();
    this.startTimer();
  }

  geolocate() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (!error) {
          MapUtils.startingPosition = [
            position.coords.latitude,
            position.coords.longitude
          ];
        }
      });
    }
  }

  listenToMessages() {
    this.socket = ioClient(connection);
    this.socket.on('connect', () => {
      this.socket.emit('name', this.name);
      this.setState({ socket: this.socket });

      this.socket.on('turn', (data) => {
        this.timer.reset();
        const players = GameUtils.getPlayers(data.players, this.socket.id);
        this.setState({
          players,
          cash: data.cash,
          table: GameUtils.getTable(data.players, players.me),
          settings: data.settings,
          moved: false,
          end: null,
        });
      });

      this.socket.on('end', (data) => {
        this.setState({
          moved: false,
          end: data,
        });
      });
    });
    this.socket.on('disconnect', () => {
      this.setState({ socket: null });
    });
  }

  startTimer() {
    this.timer = new Timer(config.time);
    this.timer.start();
  }

  componentWillUnmount() {
    if (this.socket) this.socket.disconnect();
    this.timer.stop();
  }

  move(direction) {
    if (this.socket) {
      this.socket.emit('move', direction);
      this.setState({ moved: true });
    }
  }

  render() {
    return (
      <div>
        { this.state.players ? (
          <div>
            <UI
              me={this.state.players.me}
              table={this.state.table}
              end={this.state.end}
              moved={this.state.moved}
              timer={this.timer}
            />
            <BoardMap
              players={this.state.players}
              cash={this.state.cash}
              settings={this.state.settings}
              end={this.state.end}
              moved={this.state.moved}
              move={this.move}
            />
          </div>
        ) : (
          <img className="loader" src="/images/wave.gif" alt="loading" />
        ) }
      </div>
    );
  }
}

export default Game;
