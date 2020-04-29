import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import Config from '../../config';
import Icons from '../../utils/icons';
import MapUtils from '../../utils/map';

export default ({ player, move, shouldDisplayControls, map, bound }) => {
  const position = MapUtils.mappedPosition(player.position);
  return (
    <div>
      <Marker
        zIndexOffset={Config.offsets.player}
        icon={player.x ? Icons.thief(map._zoom) : Icons.detective(map._zoom)}
        position={position}
      >
        <Popup>
          <span className="pop-message">{player.x ? 'Get away from the Police!' : 'Catch the Thief!'}</span>
        </Popup>
      </Marker>
      { shouldDisplayControls && MapUtils.getNeighbourPositions(player.position, bound).map((neighbour, index) =>
        <Marker
          zIndexOffset={Config.offsets.player + 1}
          key={index}
          icon={player.x ? Icons.stepX(map._zoom) : Icons.step(map._zoom)}
          position={neighbour}
          onClick={e => move(index)}
        />
      )}
      <Marker
        zIndexOffset={Config.offsets.player + 2}
        clickable={false}
        icon={Icons.name(map._zoom, player.name)}
        position={position}
      />
    </div>
  );
};
