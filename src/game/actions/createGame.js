const { GamesRepository } = require('../repository/GamesRepository');
const { Game } = require('../entities/Game');
const { Player } = require('../entities/Player');

async function createGame({ playerId, name }) {
  const player = new Player(playerId, name);
  const game = new Game([]);
  game.addPlayer(player);

  await GamesRepository.save(game);
  return { game };
}

module.exports = { createGame };
