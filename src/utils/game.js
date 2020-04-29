export default {
  getPlayers(players, myId) {
    const sparse = {};
    let me;
    let thief;
    const detectives = [];

    for (let i=0; i<players.length; i++) {
      const player = players[i];
      
      if (!me && player.id === myId) {
        me = player;
      } else if (player.x) {
        thief = player;
      } else {
        const key = `${player.position[0]}${player.position[1]}`;
        if (!sparse[key]) {
          sparse[key] = true;
          detectives.push(player);
        }
      }
    }

    if (me.x) thief = null;

    return {
      me,
      thief,
      detectives,
    };
  },

  getTable(players, me) {
    const table = players
      .map(p => ({ name: p.name, cash: p.cash, id: p.id, me: false }))
      .sort((a, b) => b.cash - a.cash)
      .slice(0, 9);

    table.push({ name: me.name, cash: me.cash, id: me.id, me: true });

    return table;
  }

};
