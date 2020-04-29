const server = require('./server');
const Game = require('./game');

const game = new Game(server.io);

server.io.on('connection', (socket) => {
  game.connect(socket);

  socket.on('disconnect', () => {
    game.disconnect(socket);
  });

  socket.on('name', (name) => {
    game.name(socket, name);
  });

  socket.on('move', (direction) => {
    game.move(socket, direction);
  });
});

game.start();
