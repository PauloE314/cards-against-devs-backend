const events = {
  connection: 'connection',
  disconnect: 'disconnect',

  createGame: 'create-game',
  joinGame: 'join-game',
  startGame: 'start-game',
  ready: 'ready',

  startRound: 'start-round',
  selectCard: 'select-card',
  chooseWinner: 'choose-winner',
  endRound: 'end-round',

  playerDisconnect: 'player-disconnect',
  gameInterrupted: 'game-interrupted',
};

module.exports = { events };
