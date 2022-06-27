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
  emitToRoom(roomId, event, data) {
    context.io.to(roomId).emit(event, data);
  },
});

module.exports = { makeEventManager };
