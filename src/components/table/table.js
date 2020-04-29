import React from 'react';

const className = (me) => me ? 'table-player-me' : 'table-player';

export default ({ table }) => {
  return (
    <div className="table">
      { table.map(player =>
        <div
          key={`${player.id}${player.me}`}
          className={className(player.me)}
        >
          <span className="table-entry">
            {player.name} <span className="table-point">{player.cash}</span>
          </span>
        </div>
      ) }
    </div>
  );
};
