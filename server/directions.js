'use strict';

const UPLEFT = 0;
const LEFT = 1;
const DOWNLEFT = 2;
const UP = 3;
const DOWN = 4;
const UPRIGHT = 5;
const RIGHT = 6;
const DOWNRIGHT = 7;

module.exports = {
  UPLEFT,
  LEFT,
  DOWNLEFT,
  UP,
  DOWN,
  UPRIGHT,
  RIGHT,
  DOWNRIGHT,
  random() {
    return Math.floor(Math.random() * 8);
  },
  distance(from, to) {
    return Math.sqrt(Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2));
  },
  towards(from, to) {
    const diffX = to[0] - from[0];
    const diffY = to[1] - from[1];
    let results;

    if (diffX < 0 && diffY < 0) {
      results = DOWNLEFT;
    }

    if (diffX < 0 && diffY > 0) {
      results = UPLEFT;
    }

    if (diffX > 0 && diffY < 0) {
      results = DOWNRIGHT;
    }

    if (diffX > 0 && diffY > 0) {
      results = UPRIGHT;
    }

    if (diffX < 0) results = LEFT;
    if (diffX > 0) results = RIGHT;
    if (diffY < 0) results = DOWN;
    if (diffY > 0) results = UP;

    return results;
  },
};
