const { events } = require('./events');
const { makeEventManager } = require('../lib/eventsManager');
const { createGame } = require('./events/createGame');
const { Player } = require('./entities/Player');
const { PlayersRepository } = require('./repository/PlayersRepository');

function ensureAuthName(socket, next) {
  if (!socket.handshake.auth.name) return next(new Error());
  socket.data.name = socket.handshake.auth.name;
  return next();
}

function setupGame(io) {
  io.use(ensureAuthName);
  io.on(events.connection, async (socket) => {
    const player = new Player(socket, socket.data.name);
    await PlayersRepository.save(player);
    socket.join(player.id);

    const eventsManager = makeEventManager({ io, player });
    eventsManager.sub(socket, events.createGame, createGame);
  });
}

module.exports = { setupGame };
