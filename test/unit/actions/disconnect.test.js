const { disconnect } = require('../../../src/game/actions');
const {
  GamesRepository,
} = require('../../../src/game/repository/GamesRepository');

jest.mock('../../../src/game/repository/GamesRepository');

describe('disconnect', () => {
  const socketId = '123';
  let game;
  let player;

  beforeEach(() => {
    player = { id: socketId, name: 'some name' };
    game = {
      id: 'abc',
      removePlayer: jest.fn(),
      findPlayer: jest.fn(() => player),
      playerAmount: 10,
    };

    GamesRepository.fetch.mockResolvedValue(game);
  });

  it('removes the player and saves the game', async () => {
    await disconnect({ playerId: socketId, gameId: game.id });
    expect(game.removePlayer).toHaveBeenCalledWith(socketId);
    expect(GamesRepository.save).toHaveBeenCalledWith(game);
  });

  describe('when there is less than two players', () => {
    beforeEach(() => {
      game.playerAmount = 1;
    });

    it('deletes game', async () => {
      await disconnect({
        playerId: socketId,
        gameId: game.id,
        onGameInterrupted: jest.fn(),
      });
      expect(GamesRepository.remove).toHaveBeenCalledWith(game.id);
    });

    it('calls onGameInterrupted function', async () => {
      const onGameInterrupted = jest.fn();
      await disconnect({
        playerId: socketId,
        gameId: game.id,
        onGameInterrupted,
      });
      expect(onGameInterrupted).toHaveBeenCalledWith(game);
    });
  });
});
