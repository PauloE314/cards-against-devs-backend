class Player {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.isReady = false;
    this.isSenior = false;
    this.gameId = '';
    this.answers = [];

    socket.data.player = this;
  }

  inGame() {
    return !!this.gameId;
  }

  toJSON() {
    return { ...this, socket: undefined };
  }
}

module.exports = { Player };
