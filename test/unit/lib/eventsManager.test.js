const { makeEventManager } = require('../../../src/lib/eventsManager');

describe('makeEventsManager', () => {
  let socket;
  const context = { foo: 'bar' };
  const event = 'test-event';

  beforeEach(() => {
    socket = { on: jest.fn(), off: jest.fn() };
  });

  describe('#sub', () => {
    it('calls socket#on with correct event and handler', () => {
      const eventManager = makeEventManager(context);
      eventManager.sub(socket, event, jest.fn());

      expect(socket.on).toHaveBeenCalledWith(event, expect.any(Function));
    });

    it('passes socket, context, eventEmitter and data when callback is called', () => {
      const handler = jest.fn();
      const eventManager = makeEventManager(context);
      eventManager.sub(socket, event, handler);

      const callback = socket.on.mock.calls[0][1];
      const data = 'anything';

      callback(data);

      expect(handler).toHaveBeenCalledWith({
        ...context,
        eventManager,
        socket,
        data,
      });
    });
  });

  describe('#unsub', () => {
    it('calls socket#off with correct event name for each event passed', () => {
      const eventManager = makeEventManager(context);
      eventManager.unsub(socket, event);
      expect(socket.off).toHaveBeenCalledWith(event);
    });
  });
});
