const { createGame } = require('../../../src/game/events/createGame');
const { GamesRepository } = require('../../../src/game/repository/GamesRepository');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');
const { Player } = require('../../../src/game/entities/Player');
const { PlayersRepository } = require('../../../src/game/repository/PlayersRepository');

jest.mock('../../../src/game/repository/GamesRepository');
jest.mock('../../../src/game/repository/PlayersRepository');

describe('createGame', () => {
  let socket;
  let eventsManager;
  let context;
  let player;

  beforeEach(() => {
    socket = {
      id: '123', data: {}, join: jest.fn(), emit: jest.fn(),
    };
    player = new Player(socket.id, 'Some name');
    eventsManager = { sub: jest.fn(), unsub: jest.fn() };
    context = { socket, eventsManager, player };
  });

  it('saves a new game', async () => {
    await createGame(context);
    expect(GamesRepository.save).toHaveBeenCalledWith(expect.any(Game));
  });

  it("updates player's gameId and saves it", async () => {
    await createGame(context);

    const { id: gameId } = GamesRepository.save.mock.calls[0][0];
    expect(player.gameId).toBe(gameId);
    expect(PlayersRepository.save).toHaveBeenCalledWith(player);
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
