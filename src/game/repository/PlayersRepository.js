class PlayersRepository {
  static players = {};

  static async save(game) {
    this.players[game.id] = game;
  }

  static async fetch(id) {
    return this.players[id];
  }

  static async remove(id) {
    delete this.players[id];
  }
}

module.exports = {
  PlayersRepository,
};
