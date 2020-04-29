import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import Config from '../../config';
import Icons from '../../utils/icons';
import MapUtils from '../../utils/map';

export default ({ thief, map }) => {
  const position = MapUtils.mappedPosition(thief.knownPosition);
  return (
    <div>
      <Marker
        zIndexOffset={Config.offsets.thief}
        icon={Icons.thief(map._zoom)}
        position={position}>
        <Popup>
          <span className="pop-message">{thief.real ? 'The thief is now HERE!' : 'This is the thief\'s last known position'}</span>
        </Popup>
      </Marker>
      { !thief.real &&
        <Marker
          zIndexOffset={Config.offsets.thief + 1}
          icon={Icons.doubt((map._zoom))}
          position={position}>
        </Marker>
      }
      <Marker
        zIndexOffset={Config.offsets.thief + 2}
        icon={Icons.name(map._zoom, thief.name)}
        position={position}
      />
    </div>
  );
};
