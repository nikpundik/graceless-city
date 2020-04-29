const express = require('express');
const HTTP = require('http');
const socketIO = require('socket.io');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.REACT_APP_HOST || '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(express.static(__dirname + '/../build'));

const http = HTTP.Server(app);
const io = socketIO(http);

const port = process.env.PORT || '3001';

http.listen(port, () => {
  console.log('listening on ', port);
});

module.exports = {
  app,
  http,
  io,
};
