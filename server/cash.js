const positions = require('./utils/positions');

const MOVE_EVERY_TURNS = 5;

function Cash(settings) {
  this.settings = settings;
  this.position = [0, 0];
  this.value = 1;
  this.turn = 0;
  this.randomPosition();
  console.log(this.position);
}

Cash.prototype.doTurn = function doTurn() {
  this.turn++;
  if (this.turn > MOVE_EVERY_TURNS) {
    this.randomPosition();
    this.turn = 0;
  }
};

Cash.prototype.robbed = function robbed() {
  this.turn = MOVE_EVERY_TURNS;
};

// TODO usare randomaway eridatata da base per player e cash
Cash.prototype.randomPosition = function randomPosition() {
  this.position = positions.randomLocation(this.settings.bound);
};

module.exports = Cash;
