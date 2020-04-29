import React from 'react';
import { Marker } from 'react-leaflet';

import Config from '../../config';
import Icons from '../../utils/icons';
import MapUtils from '../../utils/map';

export default ({ detectives, map, isMisterX }) => (
  <div>
  { detectives.map(detective =>
    <div key={`mitch-${detective.id}`}>
      { isMisterX &&
        <Marker
          zIndexOffset={Config.offsets.detectives}
          icon={Icons.squares((map._zoom))}
          position={MapUtils.mappedPosition(detective.position)}>
        </Marker>
      }
      <Marker
        zIndexOffset={Config.offsets.detectives + 1}
        icon={Icons.detectives(map._zoom)}
        position={MapUtils.mappedPosition(detective.position)}
      />
      <Marker
        zIndexOffset={Config.offsets.detectives + 2}
        icon={Icons.name(map._zoom, detective.name)}
        position={MapUtils.mappedPosition(detective.position)}
      />
    </div>
  )}
  </div>
);
