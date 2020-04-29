import Leaflet from 'leaflet';

const sizes = {
  14: 72,
  13: 46,
  12: 32,
};

const name = (zoom, name) => Leaflet.divIcon({
  className: 'marker-name',
  html: name,
  iconSize: [100, 20],
  iconAnchor: [50, -10],
});

const thief = (zoom) => Leaflet.icon({
  iconUrl: '/images/rolls.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
});

const cash = (zoom) => Leaflet.icon({
  iconUrl: '/images/cash.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
});

const squares = (zoom) => Leaflet.icon({
  iconUrl: '/images/circle.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
});

const doubt = (zoom) => Leaflet.icon({
  iconUrl: '/images/mark.png',
  iconSize: [sizes[zoom]*0.5, sizes[zoom]*0.5],
  iconAnchor: [0, sizes[zoom]*0.25],
});

const detective =  (zoom) => Leaflet.icon({
  iconUrl: '/images/police.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
});

const detectives =  (zoom) => Leaflet.icon({
  iconUrl: '/images/police.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
});

const step = (zoom) => Leaflet.icon({
  iconUrl: '/images/police.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
  className: 'neighbour',
});

const stepX =  (zoom) => Leaflet.icon({
  iconUrl: '/images/rolls.png',
  iconSize: [sizes[zoom], sizes[zoom]],
  iconAnchor: [sizes[zoom]*0.5, sizes[zoom]*0.5],
  className: 'neighbour',
});

export default {
  name,
  thief,
  cash,
  squares,
  doubt,
  detective,
  detectives,
  step,
  stepX,
};
