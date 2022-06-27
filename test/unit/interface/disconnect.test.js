const actions = require('../../../src/game/actions');
const { disconnect } = require('../../../src/game/interface/ws');
const { Game } = require('../../../src/game/entities/Game');
const { events } = require('../../../src/game/events');

jest.mock('../../../src/game/actions/disconnect');

describe('disconnect', () => {
  const gameId = '123';
  let socket;
  let eventsManager;
  let context;
  let player;

  beforeEach(() => {
    socket = { id: 'abc', emit: jest.fn(), join: jest.fn(), data: { gameId } };
    eventsManager = { sub: jest.fn(), unsub: jest.fn(), emitToRoom: jest.fn() };
    context = { socket, eventsManager };

    player = { id: socket.id };
    actions.disconnect.mockResolvedValue({ game: new Game([]), player });
  });

  it('calls disconnect action', async () => {
    await disconnect(context);
    expect(actions.disconnect).toHaveBeenCalledWith({
      playerId: socket.id,
      gameId: socket.data.gameId,
      onGameInterrupted: expect.any(Function),
    });
  });

  it('emits player leaving event', async () => {
    await disconnect(context);
    expect(eventsManager.emitToRoom).toHaveBeenCalledWith(
      gameId,
      events.playerDisconnect,
      player
    );
  });

  describe('when game is interrupted', () => {
    beforeEach(() => {
      actions.disconnect.mockImplementation(async ({ onGameInterrupted }) => {
        onGameInterrupted();
        return {};
      });
    });

    it('sends game interrupted event', async () => {
      await disconnect(context);
      expect(eventsManager.emitToRoom).toHaveBeenCalledWith(
        gameId,
        events.gameInterrupted
      );
    });
  });
});
