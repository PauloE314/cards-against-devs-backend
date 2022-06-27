class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.gameId = null;
  }

  inGame() {
    return !!this.gameId;
  }
}

module.exports = { Player };
