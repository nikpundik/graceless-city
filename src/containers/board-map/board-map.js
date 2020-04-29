import React, { Component } from 'react';

import { Map, TileLayer, ZoomControl, Polyline } from 'react-leaflet';

import Player from '../../components/player';
import Detectives from '../../components/detectives';
import Thief from '../../components/thief';
import Cash from '../../components/cash';
import MapUtils from '../../utils/map';

import '../../styles/leaflet.css';
import '../../styles/common.css';
import '../../styles/game.css';

class BoardMap extends Component {

  move(direction) {
    this.props.move(direction);
  }

  render() {
    const {
      players: { me, thief, detectives },
      cash,
      moved,
      end,
      settings
    } = this.props;

    return (
      <Map
        className="map"
        animate={true}
        zoomControl={false}
        dragging={true}
        center={MapUtils.mappedPosition(me.position)}
        maxBounds={MapUtils.getBounds(settings.bound)}
        zoom={14}
        minZoom={12}
        maxZoom={14}
      >
        <Polyline
          positions={MapUtils.getLimits(settings.bound)}
          color="#ed3031"
          opacity="0.8"
          dashArray="45, 10"
        />
        <ZoomControl position="bottomright" />
        <TileLayer
          ext="png"
          url={me.x ? MapUtils.skins.x.url : MapUtils.skins.d.url}
          attribution={me.x ? MapUtils.skins.x.attr : MapUtils.skins.d.attr}
        />
        <Detectives detectives={detectives} isMisterX={me.x} />
        { thief && <Thief thief={thief} /> }
        { me.x && <Cash cash={cash} /> }
        <Player
          player={me}
          bound={settings.bound}
          move={this.props.move}
          shouldDisplayControls={!end && !moved}
        />
      </Map>
    );
  }
}

export default BoardMap;
