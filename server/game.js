'use strict';

const uuid = require('node-uuid');
const directions = require('./directions');
const nicknames = require('./nicknames');
const Player = require('./player');
const Cash = require('./cash');
const Settings = require('./settings');

const numberOfBots = 5;
const numberOfCash = 2;

function Game(io) {
  this.io = io;
  this.players = [];
  this.bots = [];
  this.cash = [];
  this.misterX = null;
  this.startingPosition = () => [0, 0];

  this.awayStep = 7;
  this.timer = 5000;

  this.settings = new Settings();

  this.createBots();
  this.createCash();
}

Game.prototype.connect = function connect(socket) {
  if (this.misterX) {
    const player = this.addPlayer(socket.id);
    this.randomAwayFromMisterX(player);
  } else {
    this.misterX = this.addPlayer(socket.id, true);
  }
  console.log('connected players ', this.players.length);
  this.settings.update(this.players.length);
};

Game.prototype.connectBot = function connectBot() {
  let returnedVar;
  if (this.misterX) {
    const player = this.addPlayer(uuid.v1(), false, true);
    this.randomAwayFromMisterX(player);
    returnedVar = player;
  } else {
    this.misterX = this.addPlayer(uuid.v1(), true, true);
    returnedVar = this.misterX;
  }
  this.settings.update(this.players.length);
  return returnedVar;
};

Game.prototype.disconnect = function disconnect(socket) {
  const player = this.players.find(x => x.id === socket.id);
  const index = this.players.findIndex(x => x.id === socket.id);
  this.players.splice(index, 1);
  if (player.x) this.misterX = null;
  this.settings.update(this.players.length);
  console.log('connected players ', this.players.length);
};

Game.prototype.createBots = function createBots() {
  for (let i = 0; i < numberOfBots; i += 1) {
    const connectedBot = this.connectBot();
    this.bots.push(connectedBot);
  }
};

Game.prototype.createCash = function createCash() {
  for (let i = 0; i < numberOfCash; i += 1) {
    const c = new Cash(this.settings);
    this.cash.push(c);
  }
};

Game.prototype.move = function move(socket, direction) {
  const player = this.players.find(p => p.id === socket.id);
  if (player) player.move(direction);
};

Game.prototype.name = function name(socket, passedName) {
  const player = this.players.find(p => p.id === socket.id);
  if (player) {
    if (passedName && passedName !== '') player.name = passedName.substring(0, 15);
    else player.name = nicknames.random();
  }
};

Game.prototype.moveBots = function moveBots() {
  this.bots.forEach((bot) => {
    let direction;
    if (bot.x || !this.misterX) {
      direction = directions.random();
    } else {
      const distance = directions.distance(bot.position, this.misterX.knownPosition);
      const random = Math.random();
      if (distance < 1.5 && random < 0.7 || random > 0.9) {
        direction = directions.random();
      } else {
        direction = directions.towards(bot.position, this.misterX.knownPosition);
      }
    }
      
    bot.move(direction);
  });
};

Game.prototype.start = function start() {
  this.interval = setInterval(() => {
    this.update();
  }, this.timer);
};

Game.prototype.update = function update() {
  this.moveBots();
  const winner = this.getWinner();

  if (!this.misterX && this.players.length > 0) {
    this.end(this.players[0]);
  } else if (winner) {
    this.end(winner);
  } else {
    this.turn();
  }
};

Game.prototype.end = function end(newMisterX) {
  if (this.misterX) {
    this.misterX.becomeDetective();
  }

  newMisterX.becomeMisterX();

  this.misterX = newMisterX;

  this.players.forEach((player) => {
    if (!player.x) {
      player.becomeDetective();
      this.randomAwayFromMisterX(player);
    }
  });

  this.io.emit('end', 1);
};

Game.prototype.turn = function turn() {
  this.cash.forEach((c) => {
    this.misterX.rob(c);
    c.doTurn();
  });

  this.players.forEach((player) => {
    player.doTurn();
    if (player.end) this.randomAwayFromMisterX(player);
  });

  this.io.emit('turn', {
    players: this.players,
    cash: this.cash,
    settings: this.settings,
  });
};

Game.prototype.addPlayer = function addPlayer(id, isMisterX, isBot) {
  const player = new Player(this.settings);
  player.id = id;
  player.position = this.startingPosition();
  player.knownPosition = this.startingPosition();
  player.x = isMisterX || false;
  player.bot = isBot || false;
  player.tickets = this.settings.startingTickets;
  if (isBot) player.name = nicknames.random();

  this.players.push(player);

  return player;
};

Game.prototype.getMisterX = function getMisterX() {
  return this.players.find(p => p.x);
};

Game.prototype.getWinner = function getWinner() {
  if (!this.misterX) return undefined;
  return this.players.find(p =>
    !p.x &&
    p.position[0] === this.misterX.position[0] &&
    p.position[1] === this.misterX.position[1]);
};

Game.prototype.randomAwayFromMisterX = function randomAwayFromMisterX(player) {
  if (!this.misterX) player.position = this.startingPosition();
  else player.randomAwayFromPlayer(this.misterX);
};

module.exports = Game;
