const { makeEventManager } = require('../../../src/lib/eventsManager');

describe('makeEventsManager', () => {
  const socket = { on: jest.fn() };
  const context = { foo: 'bar' };
  const event = 'test-event';

  describe('#stub', () => {
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
});
