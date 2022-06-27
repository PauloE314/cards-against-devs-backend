const { events } = require('.');
const { GamesRepository } = require('../repository/gamesRepository');
const { Player } = require('../entities/Player');
const { ready } = require('./ready');

async function joinGame({
  io, socket, data, eventsMananger,
}) {
  const { gameId } = data;

  const game = await GamesRepository.fetch(gameId);
  if (!game || game.isWaiting) {
    return;
  }

  const player = new Player(socket, socket.handshake.auth.name, gameId);
  socket.data.player = player;
  game.addPlayer(player);

  socket.join(gameId);
  io.to(gameId).emit(events.joinGame, { player });

  eventsMananger.sub(socket, events.ready, ready);
}

module.exports = { joinGame };
