const makeEventManager = context => ({
  sub(socket, event, handler) {
    socket.on(event, data =>
      handler({
        ...context,
        data,
        socket,
        eventManager: this,
      })
    );
  },
  unsub(socket, ...events) {
    events.forEach(event => socket.off(event));
  },
});

module.exports = { makeEventManager };
