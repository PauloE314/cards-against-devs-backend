const { Game } = require('../../../src/game/entities/Game');

describe('Game', () => {
  let game;
  let player;

  beforeEach(() => {
    game = new Game();
    player = {};
  });

  describe('#addPlayer', () => {
    it('adds player to players list and saves gameId in player', () => {
      game.addPlayer(player);

      expect(game.players.length).toBe(1);
      expect(player.gameId).toBe(game.id);
    });
  });

  describe('#removePlayer', () => {
    it('removes player from players list and removes gameId from player', () => {
      game.removePlayer(player);

      expect(game.players.length).toBe(0);
      expect(player.gameId).toBeUndefined();
    });
  });
});
