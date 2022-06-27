const { v4: uuidv4 } = require('uuid');

class Player {
  constructor(socketId, name) {
    this.id = uuidv4();
    this.socketId = socketId;
    this.name = name;
    this.gameId = null;
  }

  inGame() {
    return !!this.gameId;
  }
}

module.exports = { Player };
