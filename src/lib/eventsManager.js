const makeEventManager = (context) => ({
  sub(socket, event, handler) {
    socket.on(event, (data) => handler({
      ...context, data, socket, eventManager: this,
    }));
  },
});

module.exports = { makeEventManager };
