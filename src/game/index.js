const { events } = require('./events');
const { makeEventManager } = require('../lib/eventsManager');
const { createGame } = require('./events/createGame');
const { joinGame } = require('./events/joinGame');

function setupGame(io) {
  const eventsManager = makeEventManager({ io });
  io.use((socket, next) => {
    if (socket.handshake.auth.name) {
      return next();
    }
    return next(new Error());
  });
  io.on(events.connection, (socket) => {
    eventsManager.sub(socket, events.createGame, createGame);
    eventsManager.sub(socket, events.joinGame, joinGame);
  });
}

module.exports = { setupGame };
