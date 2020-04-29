import React from 'react';
import { Marker } from 'react-leaflet';

import Config from '../../config';

export default ({ position, icon }) => (
  <Marker
    zIndexOffset={Config.offsets.powerups}
    icon={icon}
    position={position}
  />
);
