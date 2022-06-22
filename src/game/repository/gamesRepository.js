const games = {};

async function save(game) {
  games[game.id] = game;
}

async function fetch(id) {
  return games[id];
}

async function remove(id) {
  delete games[id];
}

module.exports = {
  save,
  fetch,
  remove,
};
