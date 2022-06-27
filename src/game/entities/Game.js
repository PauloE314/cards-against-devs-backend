const { v4: uuidv4 } = require('uuid');

class Game {
  static states = {
    waiting: 'waiting',
  };

  constructor(questions = []) {
    this.id = uuidv4();
    this.round = 1;
    this.state = Game.waiting;
    this.players = [];
    this.questions = questions;
    this.seniorId = null;
  }

  get currentQuestion() {
    return this.questions[this.round - 1];
  }

  playerCount() {
    return this.players.length;
  }

  addPlayer(player) {
    this.players.push(player);
    player.gameId = player;
  }

  removePlayer(player) {
    this.players = this.players.filter(({ id }) => id !== player.id);
    player.gameId = null;
  }
}

module.exports = { Game };
