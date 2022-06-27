const { GamesRepository } = require('../repository/GamesRepository');

async function disconnect({ gameId, playerId, onGameInterrupted }) {
  const game = await GamesRepository.fetch(gameId);
  const player = game.findPlayer(playerId);

  game.removePlayer(playerId);
  await GamesRepository.save(game);

  if (game.playerAmount < 2) {
    await GamesRepository.remove(game.id);
    onGameInterrupted(game);
  }

  return { game, player };
}

module.exports = { disconnect };
