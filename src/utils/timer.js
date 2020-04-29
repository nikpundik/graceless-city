function Timer(seconds) {
  this.seconds = seconds;
  this.timer = seconds;
}

Timer.prototype.start = function start() {
  this.interval = setInterval(() => {
    if (this.timer > 0) this.timer -= 1;
    if (this.callback) this.callback(this.timer);
  }, 1000);
};

Timer.prototype.stop = function stop() {
  clearInterval(this.interval);
};

Timer.prototype.reset = function reset() {
  this.timer = this.seconds;
};

Timer.prototype.onTick = function onTick(callback) {
  this.callback = callback;
};

export default Timer;
