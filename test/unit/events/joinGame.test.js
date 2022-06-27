const { GamesRepository } = require('../../../src/game/repository/gamesRepository');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');
const { Player } = require('../../../src/game/entities/Player');

jest.mock('../../../src/game/repository/gamesRepository');
// passar gamesRepository no context? (outra PR)
// factory socket
describe('joinGame', () => {
  let socket;

  beforeEach(() => {
    socket = { data: {}, join: jest.fn(), emit: jest.fn() };
  });

  it('saves a new game', async () => {
    await createGame({ socket });
    expect(GamesRepository.save).toHaveBeenCalledWith(expect.any(Game));
  });

  it('adds socket to game player list', async () => {
    const spy = jest.spyOn(Game.prototype, 'addPlayer');
    await createGame({ socket });
    expect(spy).toHaveBeenCalledWith(expect.any(Player));
  });

  it('adds socket to game room', async () => {
    await createGame({ socket });
    expect(socket.join).toHaveBeenCalledWith(expect.any(String));
  });

  it('emits the game content', async () => {
    await createGame({ socket });
    expect(socket.emit).toHaveBeenCalledWith(events.createGame, {
      game: expect.any(Game),
    });
  });
});
