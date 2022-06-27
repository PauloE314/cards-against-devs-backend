const actions = require('../actions');
const { events } = require('../events');

async function createGame({ socket, eventsManager }) {
  const game = await actions.createGame(socket.id, socket.data.name);

  socket.join(game.id);
  socket.emit(events.createGame, { game });
  eventsManager.unsub(socket, events.createGame);
}

module.exports = { createGame };
