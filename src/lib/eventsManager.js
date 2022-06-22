const makeEventManager = (context) => ({
  sub(socket, event, handler) {
    socket.on(event, (data) => handler({
      ...context, data, socket, eventsManger: this,
    }));
  },
});

module.exports = { makeEventManager };
