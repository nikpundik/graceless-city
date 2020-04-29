function Settings() {
  this.bound = 10;
  this.startingTickets = 15;
  this.awayStep = 7;
};

Settings.prototype.update = function(players) {
  const step = Math.floor(Math.log10(players)*2 + players/100);
  this.bound = 4 + step;
  this.awayStep = this.bound < 9 ? (this.bound - 2) : 7;
};

module.exports = Settings;
