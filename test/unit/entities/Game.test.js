const { Game } = require('../../../src/game/entities/Game');

describe('Game', () => {
  let game;
  let player;

  beforeEach(() => {
    game = new Game();
    player = {};
  });

  describe('#addPlayer', () => {
    it('adds player to players list', () => {
      game.addPlayer(player);
      expect(game.players.length).toBe(1);
    });
  });

  describe('#removePlayer', () => {
    it('removes player from players list', () => {
      game.removePlayer(player);
      expect(game.players.length).toBe(0);
    });
  });
});
