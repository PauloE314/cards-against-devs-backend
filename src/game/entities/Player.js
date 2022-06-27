class Player {
  constructor(socket, name = '', gameId = '') {
    this.id = socket.id;
    this.socket = socket;
    this.isReady = false;
    this.isSenior = false;
    this.gameId = gameId;
    this.answers = [];
    this.name = name;
  }

  inGame() {
    return !!this.gameId;
  }

  toJSON() {
    return { ...this, socket: undefined };
  }
}

module.exports = { Player };
