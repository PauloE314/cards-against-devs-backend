class PlayersRepository {
  static players = {};

  static async save(player) {
    this.players[player.id] = player;
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
