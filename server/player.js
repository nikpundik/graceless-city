const directions = require('./directions');
const positions = require('./utils/positions');
const nicknames = require('./nicknames');

const PI_90 = Math.PI * 0.5;
const PI_180 = Math.PI;
const PI_270 = Math.PI * 1.5;

const REVEAL_EVERY_TURN = 3;

function Player(settings) {
  this.settings = settings;
  this.id = null;
  this.name = '';
  this.position = [0, 0];
  this.knownPosition = [0, 0];
  this.tickets = this.settings.startingTickets;
  this.x = false;
  this.cash = 0;
  this.bot = false;
  this.turn = 0;
  this.xTurn = 0;
  this.real = true;
  this.moved = false;
  this.end = false;
}

Player.prototype.move = function move(direction) {
  if (this.moved) return;

  const step = 1;

  this.moved = true;

  switch (direction) {
    case directions.UPLEFT:
      this.position[0] -= step;
      this.position[1] += step;
      break;
    case directions.LEFT:
      this.position[0] -= step;
      break;
    case directions.DOWNLEFT:
      this.position[0] -= step;
      this.position[1] -= step;
      break;
    case directions.UP:
      this.position[1] += step;
      break;
    case directions.DOWN:
      this.position[1] -= step;
      break;
    case directions.UPRIGHT:
      this.position[0] += step;
      this.position[1] += step;
      break;
    case directions.RIGHT:
      this.position[0] += step;
      break;
    case directions.DOWNRIGHT:
      this.position[0] += step;
      this.position[1] -= step;
      break;
    default:
      break;
  }

  this.position = positions.constrainPosition(this.position, this.settings.bound);
};

Player.prototype.rob = function rob(cash) {
  if (
    (cash.position[0] === this.position[0] && cash.position[1] === this.position[1]) ||
    (this.bot && Math.random() < 0.04)
  ) {
    this.cash += cash.value;
    cash.robbed();
  }
};

Player.prototype.resetBot = function resetBot() {
  if (this.bot && this.turn > 100) {
    this.turn = 0;
    this.cash = 0;
    this.name = nicknames.random();
  } 
};

Player.prototype.doTurn = function doTurn() {
  this.moved = false;
  this.end = false;
  this.turn += 1;

  if (this.x) {
    this.xTurn += 1;
    if (this.xTurn === REVEAL_EVERY_TURN - 1) {
      this.xTurn = 0;
      this.knownPosition = [
        this.position[0],
        this.position[1],
      ];
      this.real = true;
    } else {
      this.real = false;
    }
  } else if (this.tickets === 1) {
    this.tickets = this.settings.startingTickets;
    this.end = true;
    this.resetBot();
  } else {
    this.tickets -= 1;
  }
};

Player.prototype.randomAwayFromPlayer = function randomAwayFromPlayer(player) {
  this.position = positions.randomAwayFrom(player.position, this.settings.awayStep, this.settings.bound);
};

Player.prototype.becomeDetective = function becomeDetective() {
  this.x = false;
  this.tickets = this.settings.startingTickets;
};

Player.prototype.becomeMisterX = function becomeMisterX() {
  this.x = true;
  this.xTurn = 0;
  this.knownPosition = [
    this.position[0],
    this.position[1],
  ];
};

module.exports = Player;
