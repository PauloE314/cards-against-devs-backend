const { v4: uuidv4 } = require('uuid');

class Game {
  static states = {
    waiting: 'waiting',
    running: 'running',
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

  isSenior(playerId) {
    return this.seniorId === playerId;
  }

  isRunning() {
    return this.state === Game.states.running;
  }

  findPlayer(id) {
    return this.players.find(player => player.id === id);
  }

  get playerAmount() {
    return this.players.length;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(id) {
    this.players = this.players.filter(player => player.id !== id);
  }
}

module.exports = { Game };
