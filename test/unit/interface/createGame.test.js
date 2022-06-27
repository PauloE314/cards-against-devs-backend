const actions = require('../../../src/game/actions');
const { createGame } = require('../../../src/game/interface/ws');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');
const { socketFactory, eventsManagerFactory } = require('../../factories');

jest.mock('../../../src/game/actions/createGame');

actions.createGame.mockResolvedValue({ game: new Game([]) });

describe('createGame', () => {
  let socket;
  let eventsManager;
  let context;

  beforeEach(() => {
    socket = socketFactory({ data: { name: 'Hello ' } });
    eventsManager = eventsManagerFactory();
    context = { socket, eventsManager };
  });

  it('calls createGame action', async () => {
    await createGame(context);
    expect(actions.createGame).toHaveBeenCalledWith({
      playerId: socket.id,
      name: socket.data.name,
    });
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
