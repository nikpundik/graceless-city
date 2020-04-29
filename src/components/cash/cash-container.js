import React from 'react';

import Cash from './cash';
import Icons from '../../utils/icons';
import MapUtils from '../../utils/map';

export default ({ map, cash }) => (
  <div>
    { cash.map(c =>
      <Cash
        key={`${c.position[0]}${c.position[1]}${c.value}`}
        position={MapUtils.mappedPosition(c.position)}
        icon={Icons.cash(map._zoom)}
      />
    ) }
  </div>
);
