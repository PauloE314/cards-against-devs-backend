const actions = require('../actions');
const { events } = require('../events');

async function createGame({ socket, eventsManager }) {
  const { game } = await actions.createGame({
    playerId: socket.id,
    name: socket.data.name,
  });

  socket.data.gameId = game.id;
  socket.join(game.id);
  socket.emit(events.createGame, { game });
  eventsManager.unsub(socket, events.createGame);
}

async function disconnect({ socket, eventsManager }) {
  const { gameId } = socket.data;

  if (!gameId) return;

  const { player } = await actions.disconnect({
    playerId: socket.id,
    gameId,
    onGameInterrupted: () =>
      eventsManager.emitToRoom(gameId, events.gameInterrupted),
  });

  eventsManager.emitToRoom(gameId, events.playerDisconnect, player);
}

module.exports = { createGame, disconnect };
