'use strict';

const PI_90 = Math.PI * 0.5;
const PI_180 = Math.PI;
const PI_270 = Math.PI * 1.5;

module.exports = {
  constrainPosition(position, bound) {
    if (position[0] > bound) {
      position[0] = bound;
    }

    if (position[1] > bound) {
      position[1] = bound;
    }

    if (position[0] < -bound) {
      position[0] = -bound;
    }

    if (position[1] < -bound) {
      position[1] = -bound;
    }
    return position;
  },
  randomAwayFrom(position, awayStep, bound) {
    const cx = position[0];
    const cy = position[1];

    const leftIn = cy - awayStep >= -bound;
    const upIn = cx + awayStep <= bound;
    const rightIn = cy + awayStep <= bound;
    const downIn = cx - awayStep >= -bound;

    const r = awayStep;
    const quarters = [];

    if (rightIn && upIn) quarters.push(0);
    if (upIn && leftIn) quarters.push(1);
    if (leftIn && downIn) quarters.push(2);
    if (downIn && rightIn) quarters.push(3);

    const index = Math.floor(Math.random() * quarters.length);
    const quarter = quarters[index];

    let a = 0.0;

    switch (quarter) {
      case 0:
        a = Math.random() * PI_90;
        break;
      case 1:
        a = (Math.random() * PI_90) + PI_90;
        break;
      case 2:
        a = (Math.random() * PI_90) + PI_180;
        break;
      case 3:
        a = (Math.random() * PI_90) + PI_270;
        break;
      default:
        break;
    }

    const lat = cx + (r * Math.sin(a));
    const lng = cy + (r * Math.cos(a));

    const newPosition = [
      Math.floor(lat),
      Math.floor(lng),
    ];

    return this.constrainPosition(newPosition, bound);
  },
  randomLocation(bound) {
    const lat = Math.floor(Math.random() * bound*2) - bound;
    const lng = Math.floor(Math.random() * bound*2) - bound;
    const newPosition = [
      lat,
      lng,
    ];
    return this.constrainPosition(newPosition, bound);
  }
};
