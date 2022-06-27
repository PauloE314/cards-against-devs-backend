const { createGame } = require('../../../src/game/actions');
const { GamesRepository } = require('../../../src/game/repository/GamesRepository');
const { Game } = require('../../../src/game/entities/Game');
const { Player } = require('../../../src/game/entities/Player');

jest.mock('../../../src/game/repository/GamesRepository');
jest.mock('../../../src/game/repository/PlayersRepository');

describe('createGame', () => {
  const socketId = '123';
  const name = 'Some random name';

  it('saves a new game', async () => {
    await createGame(socketId, name);
    expect(GamesRepository.save).toHaveBeenCalledWith(expect.any(Game));
  });

  it('adds player to game player list', async () => {
    const spy = jest.spyOn(Game.prototype, 'addPlayer');
    await createGame(socketId, name);
    expect(spy).toHaveBeenCalledWith(expect.any(Player));
  });
});
