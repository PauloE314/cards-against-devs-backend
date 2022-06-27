const { events } = require('.');
const { GamesRepository } = require('../repository/GamesRepository');
const { Game } = require('../entities/Game');
const { PlayersRepository } = require('../repository/PlayersRepository');

async function createGame({ socket, player, eventsManager }) {
  const game = new Game([]);
  game.addPlayer(player);

  await GamesRepository.save(game);

  player.gameId = game.id;
  await PlayersRepository.save(player);

  socket.join(game.id);
  socket.emit(events.createGame, { game });

  eventsManager.unsub(socket, events.createGame);
}

module.exports = { createGame };
