const { events } = require('.');
const GamesRepository = require('../repository/gamesRepository');
const { Game } = require('../entities/Game');
const { Player } = require('../entities/Player');

async function createGame({ socket }) {
  const player = new Player(socket);

  const game = new Game([]);
  game.addPlayer(player);

  await GamesRepository.save(game);

  socket.join(game.id);
  socket.emit(events.createGame, { game });
}

module.exports = { createGame };
