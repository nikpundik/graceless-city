export default {
  startingPosition: [51.5, -0.1],
  steps: [0.004, 0.008],
  skins: {
    x: {
      url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}',
      attr: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    },
    d: {
      url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
      attr: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }
  },
  mappedPosition(discretePosition) {
    return [
      this.startingPosition[0] + this.steps[0]*discretePosition[0],
      this.startingPosition[1] + this.steps[1]*discretePosition[1],
    ];
  },
  cashPosition() {
    return [
      this.startingPosition[0] + this.steps[0]* Math.floor((Math.random() * 5) - 5),
      this.startingPosition[1] + this.steps[1]* Math.floor((Math.random() * 5) - 5),
    ];
  },
  getBounds(bound) {
    const largerBound = bound + 1;
    return [
      [this.startingPosition[0] - largerBound*this.steps[0], this.startingPosition[1] - largerBound*this.steps[1]],
      [this.startingPosition[0] + largerBound*this.steps[0], this.startingPosition[1] + largerBound*this.steps[1]],
    ];
  },
  getLimits(bound) {
    return [[
      [this.startingPosition[0] - bound*this.steps[0], this.startingPosition[1] + bound*this.steps[1]],
      [this.startingPosition[0] + bound*this.steps[0], this.startingPosition[1] + bound*this.steps[1]],
    ], [
      [this.startingPosition[0] + bound*this.steps[0], this.startingPosition[1] + bound*this.steps[1]],
      [this.startingPosition[0] + bound*this.steps[0], this.startingPosition[1] - bound*this.steps[1]]
    ], [
      [this.startingPosition[0] + bound*this.steps[0], this.startingPosition[1] - bound*this.steps[1]],
      [this.startingPosition[0] - bound*this.steps[0], this.startingPosition[1] - bound*this.steps[1]]
    ], [
      [this.startingPosition[0] - bound*this.steps[0], this.startingPosition[1] - bound*this.steps[1]],
      [this.startingPosition[0] - bound*this.steps[0], this.startingPosition[1] + bound*this.steps[1]]
    ]];
  },

  getNeighbourPositions(discretePosition, bound) {
    const leftOk = discretePosition[0] > -bound;
    const rightOk = discretePosition[0] < bound;
    const downOk = discretePosition[1] > -bound;
    const upOk = discretePosition[1] < bound;
    const position = this.mappedPosition(discretePosition);

    const neighbours = [];

    if (leftOk && upOk) {
      neighbours[0] = [position[0] - this.steps[0], position[1] + this.steps[1]];
    }

    if (leftOk) {
      neighbours[1] = [position[0] - this.steps[0], position[1]];
    }

    if (leftOk && downOk) {
      neighbours[2] = [position[0] - this.steps[0], position[1] - this.steps[1]];
    }

    if (upOk) {
      neighbours[3] = [position[0], position[1] + this.steps[1]];
    }

    if (downOk) {
      neighbours[4] = [position[0], position[1] - this.steps[1]];
    }

    if (rightOk && upOk) {
      neighbours[5] = [position[0] + this.steps[0], position[1] + this.steps[1]];
    }

    if (rightOk) {
      neighbours[6] = [position[0] + this.steps[0], position[1]];
    }

    if (rightOk && downOk) {
      neighbours[7] = [position[0] + this.steps[0], position[1] - this.steps[1]];
    }

    return neighbours;
  },
};
