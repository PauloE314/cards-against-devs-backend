const { events } = require('./actions');
const { makeEventManager } = require('../lib/eventsManager');
const { createGame } = require('./interface/ws');

function ensureAuthName(socket, next) {
  if (!socket.handshake.auth.name) return next(new Error());
  socket.data.name = socket.handshake.auth.name;
  return next();
}

function setupGame(io) {
  io.use(ensureAuthName);
  io.on(events.connection, async socket => {
    const eventsManager = makeEventManager({ io });
    eventsManager.sub(socket, events.createGame, createGame);
  });
}

module.exports = { setupGame };
