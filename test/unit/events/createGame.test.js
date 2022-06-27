const { createGame } = require('../../../src/game/events/createGame');
const { GamesRepository } = require('../../../src/game/repository/GamesRepository');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');
const { Player } = require('../../../src/game/entities/Player');

jest.mock('../../../src/game/repository/gamesRepository');

describe('createGame', () => {
  let socket;
  let eventsManager;
  let context;

  beforeEach(() => {
    socket = { data: {}, join: jest.fn(), emit: jest.fn() };
    eventsManager = { sub: jest.fn(), unsub: jest.fn() };
    context = { socket, eventsManager };
  });

  it('saves a new game', async () => {
    await createGame(context);
    expect(GamesRepository.save).toHaveBeenCalledWith(expect.any(Game));
  });

  it('adds socket to game player list', async () => {
    const spy = jest.spyOn(Game.prototype, 'addPlayer');
    await createGame(context);
    expect(spy).toHaveBeenCalledWith(expect.any(Player));
  });

  it('adds socket to game room', async () => {
    await createGame(context);
    expect(socket.join).toHaveBeenCalledWith(expect.any(String));
  });

  it('emits the game content', async () => {
    await createGame(context);
    expect(socket.emit).toHaveBeenCalledWith(events.createGame, {
      game: expect.any(Game),
    });
  });

  it('removes create-game event listener', async () => {
    await createGame(context);
    expect(eventsManager.unsub).toHaveBeenCalledWith(socket, events.createGame);
  });
});
