const http = require('http');
const { Server } = require('socket.io');
const { setupGame } = require('./game');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

function main() {
  const server = http.createServer();

  const io = new Server(server);

  setupGame(io);

  server.listen(process.env.PORT, () => console.log('Server is running'));
}

main();
