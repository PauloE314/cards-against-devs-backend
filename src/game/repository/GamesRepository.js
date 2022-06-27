class GamesRepository {
  static games = {};

  static async save(game) {
    this.games[game.id] = game;
  }

  static async fetch(id) {
    return this.games[id];
  }

  static async remove(id) {
    delete this.games[id];
  }
}

module.exports = {
  GamesRepository,
};
