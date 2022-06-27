const { v4: uuidv4 } = require('uuid');

function eventsManagerFactory(params = {}) {
  return {
    sub: jest.fn(),
    unsub: jest.fn(),
    emitToRoom: jest.fn(),
    ...params,
  };
}

function socketFactory(params = {}) {
  return {
    id: uuidv4(),
    emit: jest.fn(),
    join: jest.fn(),
    data: {},
    ...params,
  };
}

module.exports = { eventsManagerFactory, socketFactory };
