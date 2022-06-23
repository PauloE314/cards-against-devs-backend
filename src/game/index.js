const { events } = require('./events');
const { makeEventManager } = require('../lib/eventsManager');
const { createGame } = require('./events/createGame');

function setupGame(io) {
  const eventsManager = makeEventManager({ io });

  io.on(events.connection, (socket) => {
    eventsManager.sub(socket, events.createGame, createGame);
  });
}

module.exports = { setupGame };
