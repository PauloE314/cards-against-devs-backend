const actions = require('../../../src/game/actions');
const { createGame } = require('../../../src/game/interface/ws');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');

jest.mock('../../../src/game/actions/createGame');

actions.createGame.mockReturnValue(new Game([]));

describe('createGame', () => {
  let socket;
  let eventsManager;
  let context;

  beforeEach(() => {
    socket = { emit: jest.fn(), join: jest.fn(), data: { name: 'Hello' } };
    eventsManager = { sub: jest.fn(), unsub: jest.fn() };
    context = { socket, eventsManager };
  });

  it('calls createGame action', async () => {
    await createGame(context);
    expect(actions.createGame).toHaveBeenCalledWith(socket.id, socket.data.name);
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
